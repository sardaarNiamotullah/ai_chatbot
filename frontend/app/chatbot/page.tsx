"use client";

import { useEffect, useState, useRef, useCallback } from "react";
import { useRouter } from "next/navigation";
import { fetchUser } from "@/lib/auth";
import Image from "next/image";

// Types
type User = {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  username: string;
  photo: string;
};

type Message = {
  id: string;
  text: string;
  sender: "user" | "bot";
  timestamp: Date;
};

type ChatbotConfig = {
  title: string;
  subtitle: string;
  welcomeMessage: (name: string) => string;
  inputPlaceholder: string;
  errorMessage: string;
  contactInfo: string;
};

// Configuration for the chatbot
const chatbotConfig: ChatbotConfig = {
  title: "Global Wander",
  subtitle: "Your AI powered Chat Assistant",
  welcomeMessage: (name: string) =>
    `Hi ${name}!\n Welcome to Global Wander - Your Trusted Travel Companion for 15+ Years!\nI'm here to help you plan your perfect getaway. How can i assist you today?`,
  inputPlaceholder: "Ask about flights, hotels, vacation packages, cruises...",
  errorMessage:
    "Sorry, I couldn't process your request. Please try again.\n\nNeed immediate assistance?\n• Phone: +1-800-TRAVEL-NOW\n• Email: bookings@globalwanderrrrrrrr.com\n• Emergency: +1-800-555-HELP",
  contactInfo:
    "🌍 Global Wanderlust\n📞 +1-800-TRAVEL-NOW\n✉️ bookings@globalwanderlust.com\n📍 456 Explorer's Way, Downtown\n⏰ Mon-Fri: 9AM-7PM | Sat: 10AM-4PM",
};

// Component to format bot messages with line breaks and structure
const FormattedMessage = ({ text }: { text: string }) => {
  const formatText = (text: string) => {
    const paragraphs = text.split("\n\n");

    return paragraphs.map((paragraph, pIndex) => {
      const lines = paragraph.split("\n");

      return (
        <div key={pIndex} className={pIndex > 0 ? "mt-3" : ""}>
          {lines.map((line, lIndex) => {
            // Handle bullet points
            if (line.trim().startsWith("•") || line.trim().startsWith("-")) {
              return (
                <div key={lIndex} className="ml-2 my-1">
                  <span className="text-blue-600 mr-2">•</span>
                  <span>{line.replace(/^[•\-]\s*/, "")}</span>
                </div>
              );
            }

            // Handle section headers
            if (line.trim().endsWith(":") && line.trim().length < 50) {
              return (
                <div
                  key={lIndex}
                  className="font-semibold text-gray-900 mt-2 mb-1"
                >
                  {line}
                </div>
              );
            }

            return line.trim() ? (
              <div key={lIndex} className={lIndex > 0 ? "mt-1" : ""}>
                {line}
              </div>
            ) : null;
          })}
        </div>
      );
    });
  };

  return <div className="text-sm leading-relaxed">{formatText(text)}</div>;
};

// Loading spinner component
const LoadingSpinner = () => (
  <div className="flex items-center space-x-2">
    <div className="flex space-x-1">
      {[0, 0.1, 0.2].map((delay) => (
        <div
          key={delay}
          className="w-2 h-2 rounded-full bg-blue-500 animate-bounce"
          style={{ animationDelay: `${delay}s` }}
        />
      ))}
    </div>
  </div>
);

// Message bubble component
const MessageBubble = ({ message }: { message: Message }) => {
  const isUser = message.sender === "user";

  return (
    <div
      className={`max-w-xs md:max-w-md lg:max-w-2xl rounded-2xl px-4 py-3 shadow-sm ${
        isUser
          ? "bg-blue-600 text-white"
          : "bg-white text-gray-800 border border-gray-200"
      }`}
    >
      {message.sender === "bot" ? (
        <FormattedMessage text={message.text} />
      ) : (
        <p className="text-sm leading-relaxed">{message.text}</p>
      )}
      <p
        className={`text-xs mt-2 text-right ${
          isUser ? "text-blue-100" : "text-gray-500"
        }`}
      >
        {message.timestamp.toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        })}
      </p>
    </div>
  );
};

export default function Chatbot() {
  const [user, setUser] = useState<User | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputMessage, setInputMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setShowMenu(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Initialize user and welcome message
  useEffect(() => {
    const initializeChat = async () => {
      const userData = await fetchUser();
      if (!userData) {
        router.push("/");
      } else {
        setUser(userData);
        setMessages([
          {
            id: "1",
            text: chatbotConfig.welcomeMessage(userData.firstName),
            sender: "bot",
            timestamp: new Date(),
          },
        ]);
      }
    };
    initializeChat();
  }, [router]);

  // Scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleSendMessage = useCallback(async () => {
    if (!inputMessage.trim()) return;

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputMessage,
      sender: "user",
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, userMessage]);
    setInputMessage("");
    setIsLoading(true);

    try {
      const response = await fetch("http://localhost:8000/api/chat", {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: inputMessage }),
      });

      if (!response.ok) throw new Error("Failed to get response");

      const data = await response.json();
      const botMessage: Message = {
        id: Date.now().toString(),
        text: data.response,
        sender: "bot",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      console.error("Chat error:", error);
      const errorMessage: Message = {
        id: Date.now().toString(),
        text: chatbotConfig.errorMessage,
        sender: "bot",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  }, [inputMessage]);

  const handleLogout = async () => {
    try {
      const response = await fetch("http://localhost:8000/auth/logout", {
        method: "POST",
        credentials: "include",
      });

      if (response.ok) {
        router.push("/");
      } else {
        console.error("Logout failed");
        router.push("/");
      }
    } catch (error) {
      console.error("Logout error:", error);
      router.push("/");
    }
  };

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading Global Wanderlust...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-gray-50 flex flex-col">
      <header className="bg-white shadow-sm border-b-2 border-blue-100">
        <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <div className="flex items-center space-x-3">
            <div className="text-2xl">🌍</div>
            <div>
              <h1 className="text-xl font-bold text-gray-900">
                {chatbotConfig.title}
              </h1>
              <p className="text-xs text-gray-600">{chatbotConfig.subtitle}</p>
            </div>
          </div>

          <div className="flex items-center space-x-4 relative">
            <Image
              src={
                user.photo ||
                `https://ui-avatars.com/api/?name=${user.firstName}+${user.lastName}&background=2563eb&color=fff`
              }
              alt="User profile"
              width={32}
              height={32}
              className="rounded-full ring-2 ring-blue-200"
              priority
            />
            <span className="text-sm font-medium text-gray-700">
              {user.firstName} {user.lastName}
            </span>
            <button
              onClick={() => setShowMenu(!showMenu)}
              className="text-gray-500 hover:text-gray-700 focus:outline-none"
              aria-label="User menu"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
              </svg>
            </button>

            {showMenu && (
              <div
                ref={menuRef}
                className="absolute right-0 top-full mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10 border border-gray-200"
              >
                <button
                  onClick={handleLogout}
                  className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  Log Out
                </button>
              </div>
            )}
          </div>
        </div>
      </header>

      <main className="flex-1 flex flex-col max-w-4xl mx-auto w-full py-6 px-4 overflow-hidden">
        <div className="flex-1 overflow-y-auto mb-4 space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${
                message.sender === "user" ? "justify-end" : "justify-start"
              }`}
            >
              <MessageBubble message={message} />
            </div>
          ))}

          {isLoading && (
            <div className="flex justify-start">
              <div className="bg-white text-gray-800 rounded-2xl px-4 py-3 border border-gray-200 shadow-sm">
                <LoadingSpinner />
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        <div className="mt-auto">
          <div className="flex items-center space-x-2">
            <input
              type="text"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder={chatbotConfig.inputPlaceholder}
              className="flex-1 border border-gray-300 text-black rounded-full px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              disabled={isLoading}
            />
            <button
              onClick={handleSendMessage}
              disabled={isLoading || !inputMessage.trim()}
              className="bg-blue-600 text-white rounded-full p-3 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              aria-label="Send message"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M14 5l7 7m0 0l-7 7m7-7H3"
                />
              </svg>
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
