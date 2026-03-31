import { useEffect, useState } from "react";
import API from "../api";

export default function AdminDashboard() {
  const [stats, setStats] = useState({});

  useEffect(() => {
    API.get("/admin/stats").then(res => setStats(res.data));
  }, []);

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4 mt-20">Admin Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card title="Total Users" value={stats.totalUsers} />
        <Card title="Active Users" value={stats.activeUsers} />
        <Card title="Total Draws" value={stats.totalDraws} />
        <Card title="Total Winners" value={stats.totalWinners} />
        <Card title="Total Pool ₹" value={stats.totalPool} />
      </div>
    </div>
  );
}

function Card({ title, value }) {
  return (
    <div className="bg-white shadow rounded-xl p-4 mb-2 hover:shadow-lg transition-all duration-300">
      <h2 className="text-gray-500">{title}</h2>
      <p className="text-xl font-bold">{value || 0}</p>
    </div>
  );
}