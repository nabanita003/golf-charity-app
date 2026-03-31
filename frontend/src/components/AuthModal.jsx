import { useState } from "react";
import Login from "../pages/Login";
import Register from "../pages/Register";

export default function AuthModal({ isOpen, onClose, type }) {
  const [mode, setMode] = useState(type);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">

      {/* Overlay */}
      <div 
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
        onClick={onClose}
      ></div>

      {/* Modal */}
      <div className="relative bg-white/90 backdrop-blur-lg rounded-2xl shadow-2xl w-[90%] max-w-md p-6 animate-fadeIn">

        {/* Close */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-black text-xl"
        >
          ✕
        </button>

        {/* Dynamic */}
        {mode === "login" ? (
          <Login switchToRegister={() => setMode("register")} />
        ) : (
          <Register switchToLogin={() => setMode("login")} />
        )}

      </div>
    </div>
  );
}