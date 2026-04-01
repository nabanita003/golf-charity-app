import { useState } from "react";
import Login from "../pages/Login";
import Register from "../pages/Register";


export default function AuthModal({ isOpen, onClose, type }) {
  const [mode, setMode] = useState(type);

  if (!isOpen) return null;

  return (
<div className="fixed inset-0 z-50 flex items-start sm:items-center justify-center bg-black/40 px-4 pt-10 sm:pt-0 overflow-y-auto">

      {/* Overlay */}
      <div 
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
        onClick={onClose}
      ></div>

      {/* Modal */}
<div className="fixed  bg-transparent/95  mb-15 sm:mb-255 lg:mb-50 rounded-xl shadow-xl w-full max-w-xs  animate-fadeIn max-h-[85vh] overflow-y-auto sm:overflow-hidden">

        {/* Close */}
        <button
          onClick={onClose}
          className="absolute top-5 right-7 text-gray-900 hover:text-black text-xl"
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