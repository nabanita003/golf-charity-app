import { NavLink } from "react-router-dom";
import { useState } from "react";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  const logout = () => {
    localStorage.removeItem("token");
    window.location.href = "/";
  };

  // Active class function
  const navStyle = ({ isActive }) =>
    isActive
      ? "text-green-400 border-b-2 border-green-400 pb-1 transition-all duration-300"
      : "hover:text-green-400 transition-all duration-300";

  return (
    <nav className="bg-gray-900/80 backdrop-blur-lg text-white fixed w-full z-50 shadow-lg">
      <div className="flex justify-between items-center px-6 py-4">
        <h1 className="text-xl font-bold text-green-400 tracking-wid">
          ⛳ Golf Charity
        </h1>

        {/* Desktop Menu */}
      
            <div className="hidden md:flex gap-8 text-lg font-medium items-center">

      <NavLink to="/dashboard" className={navStyle}>Dashboard</NavLink>
      <NavLink to="/subscribe" className={navStyle}>Subscribe</NavLink>
      <NavLink to="/check" className={navStyle}>Results</NavLink>
      <NavLink to="/charity" className={navStyle}>Charity</NavLink>
      <NavLink to="/history" className={navStyle}>History</NavLink>

      <button 
        onClick={logout}
        className="bg-red-500 px-4 py-2 rounded-full btn"
      >
        Logout
      </button>
    </div>

        {/* Mobile toggle */}
        <button onClick={() => setOpen(!open)} className="md:hidden text-2xl">
          ☰
        </button>
      </div>

      {/* Mobile Menu */}
      {open && (
        <div className="md:hidden flex flex-col gap-2 px-6 pb-4 bg-gray-800">
          <NavLink to="/dashboard" className={navStyle}>Dashboard</NavLink>
          <NavLink to="/subscribe" className={navStyle}>Subscribe</NavLink>
          <NavLink to="/check" className={navStyle}>Check Result</NavLink>
          <NavLink to="/charity" className={navStyle}>Charity</NavLink>
          <NavLink to="/history" className={navStyle}>History</NavLink>
          <NavLink to="/proof" className={navStyle}>Upload Proof</NavLink>

          <button onClick={logout} className="bg-red-500 px-3 py-1 rounded hover:bg-red-600 transition-all duration-300">
            Logout
          </button>
        </div>
      )}
    </nav>
  );
}