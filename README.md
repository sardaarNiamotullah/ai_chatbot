# AI ChatBot — Custom AI Chat Representative 💬

Welcome to **ChatApp**, a full-stack real-time messaging platform built with ❤️ using **Next.js**, **Express**, **Prisma**, **PostgreSQL**, and **WebSockets** powered by **Socket.IO**!

Welcome to **AI_ChatBot**, a full-stack AI-powered chatbot platform built with ❤️ using **Next.js**, **Express.js**, **Prisma**, **PostgreSQL**, and **Ollama-Llama3.2**!

> Your friendly, custom-trained AI chat representative, ready to assist customers with company-specific knowledge, 24/7.

## ✨ Features

- **֎ AI-Powered Conversations:** Powered by Ollama-Llama3.2, pre-trained with imaginary company data for tailored responses.
- **🔒 Secure authentication** Supports Google OAuth2.0 and Passport.js for secure user access.
- **🎨 Modern UI** Built with Next.js and TypeScript for a sleek, responsive interface.
- **💾 Persistent storage** with PostgreSQL and Prisma ORM.
- **🌐 Type-safe** End-to-end TypeScript for reliable, maintainable code.
- **📱 Responsive design** Works seamlessly on desktop and mobile devices.

## ֎ AI Chatbot Capabilities

This chatbot is designed to act as a **virtual customer service representative** for an imaginary company. 

It leverages **Ollama-Llama3.2**, pre-trained with company-specific data, to provide accurate and context-aware responses to user gönderilen mesajlar. Whether it's answering FAQs, guiding users through services, or handling customer inquiries, this bot is ready to shine! 🌟

## 🔐 Authentication

* 🌐 **Google OAuth2.0:** Secure login via Google accounts using Passport.js.
* 🔒 S**ession Management:** Secure user sessions with Express.js and Passport.js.

## 📸 UI Highlights

* 💬 **Interactive Chat Interface:** Engage with the AI chatbot in real-time.
* 👤 **User Profile:** View and manage user settings via a clean navbar.
* 🔍 **Responsive Layout:** Seamless experience across devices.
* ⋮ **Easy Logout:** Smooth dropdown menu for user actions.

## 🏗️ Tech Stack

### ֎ AI
- **Ollama-Llama3.2:** Custom-trained LLM for intelligent chatbot responses.

### 🔧 Backend
- **Express.js:** Fast, minimalist web framework for Node.js.
- **Prisma:** Next-generation ORM for TypeScript and Node.js.
- **PostgreSQL:** Reliable open-source relational database.
- **Passport.js:** Authentication middleware with Google OAuth2.0 support.
- **TypeScript:** Strongly typed programming for safer code.
- **Ollama-Llama3.2:** Custom-trained LLM for intelligent chatbot responses.

### 🖼️ Frontend
- **Next.js:** React framework with server-side rendering and static site generation.
- **TypeScript:** Type-safe JavaScript for robust frontend development.
- **Tailwind CSS:** Utility-first CSS framework for rapid, responsive styling.
- **Axios:** Promise-based HTTP client for API interactions.

## 🚀 Getting Started

### Prerequisites

- Node.js (v18 or later)
- PostgreSQL (v13 or later)
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/sardaarNiamotullah/ai_chatbot.git
   cd ai_chatbot
   ```

2. **Backend Setup**
   ```bash
   cd backend
   npm install
   
   # Configure environment variables
   cp .env.example .env
   # Edit .env with your PostgreSQL connection string and oogle OAuth credentials, and Ollama settings
   
   # Run database migrations
   npx prisma migrate dev
   
   # Start the development server
   npm run dev
   ```
   

3. **Frontend Setup**
   ```bash
   cd ../frontend
   npm install
   
   # Configure environment variables
   cp .env.example .env
   # Edit .env with your backend API URL
   
   # Start the development server
   npm run dev
   ```

3. **Ollama Setup**
   ```bash
   # Download and Install ollama to your machine.
   # Then run bellow command in your terminal
   ollama run llama3.2
   ```

4. **Open your browser** and navigate to `http://localhost:3000`

## 🔧 Environment Variables

### Backend (.env)
```
DATABASE_URL="postgresql://user:password@localhost:5432/aichatbot"
GOOGLE_CLIENT_ID="your-google-client-id"
GOOGLE_CLIENT_SECRET="your-google-client-secret"
OLLAMA_API_URL="http://localhost:11434"  # Adjust to your Ollama endpoint
SESSION_SECRET="your-session-secret"
PORT=8000
```

### Frontend (.env)
```
NEXT_PUBLIC_API_URL="http://localhost:8000"
```

## 📚 API Documentation

### Authentication Endpoints
- `GET /auth/google` - Google OAuth authentication
- `GET /auth/google/callback` - Google OAuth callback

### Chat Endpoints
- `POST /api/chat` - Send a user message to the chatbot.

## 📂 Project Structure

```
ai_chatbot/
├── backend/
└── frontend/
```

## 🤝 Contributing

Got an idea to make it even better? Fork it, code it, and create a PR — contributions are **always welcome**!

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request


## 🖋️ Author

**Sardaar Niamotullah**

## Acknowledgments

- [Ollama](https://ollama.com/)
- [llama 3.2](https://ollama.com/library/llama3.2)
- [Express.js](https://expressjs.com/)
- [PostgreSQL](https://www.postgresql.org/)
- [Passport](https://www.passportjs.org/)
- [Next.js](https://nextjs.org/)
- [Prisma](https://www.prisma.io/)
- [Tailwind CSS](https://tailwindcss.com/)