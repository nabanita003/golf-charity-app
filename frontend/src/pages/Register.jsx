import { useState } from "react";
import API from "../api";
import Alert from "../components/Alert";


export default function Register({switchToLogin}) {
  const [form, setForm] = useState({
    name: "", email: "", password: ""
  });
   const [popup, setPopup] = useState(null);

const submit = async (e) => {
  e.preventDefault();
  try {
    const res = await API.post("/auth/register", form);

    // Save token
    localStorage.setItem("token", res.data.token);
    setPopup({ type: "success", message: "Registration Successful 🎉" });

    // Redirect to dashboard
    setTimeout(() => {
        window.location.href = "/dashboard";
      }, 1500);

  } catch (err) {
      setPopup({
        type: "error",
        message: err.response?.data?.msg || "Registration failed"
      });
    }
};

  return (
<div className="w-full bg-gray-300 p-4 rounded-2xl">
      <form className="space-y-4 w-full max-w-md bg-white p-6 rounded-xl shadow-lg transform transition-all duration-300">

      <h2 className="text-2xl font-bold text-center text-black">Create Account!</h2>

      <input
        placeholder="Name"
        className="border p-2 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-green-400 text-gray-600 transition-all duration-300"
        onChange={e=>setForm({...form,name:e.target.value})}
      />

      <input
        placeholder="Email"
        className="border p-2 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-green-400 text-gray-600 transition-all duration-300"
        onChange={e=>setForm({...form,email:e.target.value})}
      />

      <input
        type="password"
        placeholder="Password"
        className="border p-2 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-green-400 text-gray-600 transition-all duration-300"
        onChange={e=>setForm({...form,password:e.target.value})}
      />

      <button
        onClick={submit}
        className="bg-green-600 text-white w-full p-3 rounded-lg hover:bg-green-700 transition-all duration-300"
      >
        Register
      </button>

      <p className="text-sm text-center text-black">
        Already have an account?{" "}
        <span 
          onClick={switchToLogin}
          className="text-blue-600 cursor-pointer"
        >
          Login
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