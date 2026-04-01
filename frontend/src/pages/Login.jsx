import { useState } from "react";
import API from "../api";
import AuthModal from "../components/AuthModal";
import Alert from "../components/Alert";

export default function Login({ switchToRegister }) {
  const [form, setForm] = useState({ email: "", password: "" });
   const [popup, setPopup] = useState(null);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await API.post("/auth/login", form);

      localStorage.setItem("token", res.data.token);

      //  Success popup
      setPopup({ type: "success", message: "Login Successful 🚀" });

setTimeout(() => {
  if (res.data.user.role === "admin") {
    window.location.href = "/admin";
  } else {
    window.location.href = "/dashboard";
  }
}, 1500);

    } catch (err) {
      setPopup({
        type: "error",
        message: err.response?.data?.msg || "Login failed"
      });
    }
  };

  return (
    
    <div className="w-full bg-gray-300 p-4 rounded-2xl flex justify-center">
    
      <form onSubmit={handleLogin} className="space-y-2 w-full max-w-xs mx-auto">

      <h2 className="text-2xl font-bold text-center text-black">Welcome Back</h2>

      <input
        type="email"
        placeholder="Email"
        className="border p-3 w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400 text-gray-600 transition-all duration-300"
        onChange={(e)=>setForm({...form,email:e.target.value})}
      />

      <input
        type="password"
        placeholder="Password"
        className="border p-3 w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400 text-gray-600 transition-all duration-300"
        onChange={(e)=>setForm({...form,password:e.target.value})}
      />

      <button className="w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transition">
        Login
      </button>

      <p className="text-sm text-center text-black">
        No account?{" "}
        <span 
          onClick={switchToRegister}
          className="text-blue-600 cursor-pointer"
        >
          Register
        </span>
      </p>

    </form>
    {popup && (
  <Alert
    message={popup.message}
    type={popup.type}
    onClose={() => setPopup(null)}
  />
)}
    </div>
  );
}