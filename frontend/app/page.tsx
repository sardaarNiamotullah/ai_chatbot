'use client';

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { fetchUser } from "@/lib/auth";

export default function Home() {
  const [error, setError] = useState<string | null>(null);
  const [isCreateAccountLoading, setIsCreateAccountLoading] = useState(false);
  const [isLoginLoading, setIsLoginLoading] = useState(false);
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    // Only check auth status if coming from OAuth redirect
    const fromAuth = searchParams.get('fromAuth');
    
    if (fromAuth === 'true') {
      fetchUser().then((data) => {
        if (data) {
          router.push("/chatbot");
        } else {
          setError("Login failed. Please try again.");
        }
        setIsCheckingAuth(false);
      });
    } else {
      setIsCheckingAuth(false);
    }

    const errorParam = searchParams.get("error");
    if (errorParam) {
      setError("Login failed. Please try again.");
      setIsCheckingAuth(false);
    }
  }, [searchParams, router]);

  const handleCreateAccount = () => {
    setIsCreateAccountLoading(true);
    window.location.href = "http://localhost:8000/auth/google?fromAuth=true";
  };

  const handleLogin = () => {
    setIsLoginLoading(true);
    window.location.href = "http://localhost:8000/auth/google?fromAuth=true";
  };

  if (isCheckingAuth) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex flex-col items-center justify-center px-4 py-12">
      <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-8 space-y-6">
        {/* Logo/Header */}
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold text-gray-800">
            Welcome to AI Chatbot
          </h1>
          <p className="text-gray-600">Sign in to start your conversation</p>
        </div>

        {/* Error Message */}
        {error && (
          <div className="bg-red-50 text-red-600 p-3 rounded-lg text-sm">
            {error}
          </div>
        )}

        {/* Auth Buttons */}
        <div className="space-y-4">
          <button
            onClick={handleCreateAccount}
            disabled={isCreateAccountLoading}
            className={`w-full flex items-center justify-center gap-2 py-3 px-4 rounded-lg bg-green-600 text-white hover:bg-green-700 transition-colors ${
              isCreateAccountLoading ? "opacity-70 cursor-not-allowed" : ""
            }`}
          >
            {isCreateAccountLoading ? (
              <>
                <svg
                  className="animate-spin h-5 w-5 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                <span>Processing...</span>
              </>
            ) : (
              <>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  className="w-5 h-5"
                >
                  <path
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    fill="white"
                  />
                  <path
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    fill="white"
                  />
                  <path
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                    fill="white"
                  />
                  <path
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                    fill="white"
                  />
                </svg>
                <span>Create Account with Google</span>
              </>
            )}
          </button>

          <p className="text-center text-gray-600 text-sm">
            Already have an account?
          </p>

          <button
            onClick={handleLogin}
            disabled={isLoginLoading}
            className={`w-full flex items-center justify-center gap-2 py-3 px-4 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition-colors ${
              isLoginLoading ? "opacity-70 cursor-not-allowed" : ""
            }`}
          >
            {isLoginLoading ? (
              <>
                <svg
                  className="animate-spin h-5 w-5 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                <span>Processing...</span>
              </>
            ) : (
              <>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  className="w-5 h-5"
                >
                  <path
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    fill="white"
                  />
                  <path
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    fill="white"
                  />
                  <path
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                    fill="white"
                  />
                  <path
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                    fill="white"
                  />
                </svg>
                <span>Log In with Google</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}