import { NavLink } from "react-router-dom";
import { useState } from "react";

export default function AdminNavbar() {
  const [open, setOpen] = useState(false);

  const logout = () => {
    localStorage.removeItem("token");
    window.location.href = "/";
  };

  const navStyle = ({ isActive }) =>
    isActive
      ? "text-green-400 border-b-2 border-green-400 transition-all duration-300"
      : "hover:text-green-400 transition-all duration-300";

  return (
    <nav className="bg-gray-900/90 backdrop-blur-lg text-white fixed w-full z-50 shadow-md">
      <div className="flex justify-between items-center px-6 py-3">
        <h1 className="text-xl font-bold text-green-400 tracking-widest">
          ⛳ Golf Charity Admin
        </h1>

        {/* Desktop menu */}
        <div className="hidden md:flex gap-6 text-lg font-medium items-center">
          <NavLink to="/admin" className={navStyle}>Dashboard</NavLink>
          <NavLink to="/admin/users" className={navStyle}>Users</NavLink>
          <NavLink to="/admin/draw" className={navStyle}>Draw Management</NavLink>
          <NavLink to="/admin/winners" className={navStyle}>Winners</NavLink>
          <NavLink to="/admin/charity" className={navStyle}>Charity</NavLink>
          <NavLink to="/admin/reports" className={navStyle}>Reports</NavLink>

          <button 
            onClick={logout}
            className="bg-red-500 px-4 py-1 rounded-full hover:bg-red-600 transition-all duration-300"
          >
            Logout
          </button>
        </div>

        {/* Mobile toggle */}
        <button onClick={() => setOpen(!open)} className="md:hidden text-2xl">
          ☰
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden flex flex-col gap-2 px-6 pb-3 bg-gray-800 animate-slide-down">
          <NavLink to="/admin" className={navStyle} onClick={() => setOpen(false)}>Dashboard</NavLink>
          <NavLink to="/admin/users" className={navStyle} onClick={() => setOpen(false)}>Users</NavLink>
          <NavLink to="/admin/draw" className={navStyle} onClick={() => setOpen(false)}>Draw Management</NavLink>
          <NavLink to="/admin/winners" className={navStyle} onClick={() => setOpen(false)}>Winners</NavLink>
          <NavLink to="/admin/charity" className={navStyle} onClick={() => setOpen(false)}>Charity</NavLink>
          <NavLink to="/admin/reports" className={navStyle} onClick={() => setOpen(false)}>Reports</NavLink>

          <button 
            onClick={logout} 
            className="bg-red-500 px-3 py-1 rounded hover:bg-red-600 transition-all duration-300"
          >
            Logout
          </button>
        </div>
      )}
    </nav>
  );
}