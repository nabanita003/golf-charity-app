import { useEffect, useState } from "react";
import API from "../api";
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, Legend
} from "recharts";

export default function AdminReports() {
  const [report, setReport] = useState(null);

  // 🔥 Fetch function
  const fetchReport = async () => {
    try {
      const res = await API.get("/admin/reports");
      setReport(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  // ✅ FIXED useEffect (no warning)
  useEffect(() => {
    let isMounted = true;

    const getData = async () => {
      try {
        const res = await API.get("/admin/reports");
        if (isMounted) setReport(res.data);
      } catch (err) {
        console.error(err);
      }
    };

    // Initial fetch
    getData();

    // Real-time update every 5 sec
    const interval = setInterval(getData, 5000);

    return () => {
      isMounted = false;
      clearInterval(interval);
    };
  }, []);

  if (!report) {
    return (
      <div className="p-6 mt-20 text-center text-gray-500">
        Loading dashboard...
      </div>
    );
  }

  // 📊 Chart Data
  const userData = [
    { name: "Total Users", value: report.totalUsers },
    { name: "Active Users", value: report.activeUsers },
  ];

  const drawData = [
    { name: "Draws", value: report.totalDraws },
    { name: "Winners", value: report.totalWinners },
  ];

  const COLORS = ["#3b82f6", "#10b981"];

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      
      {/* Title */}
      <h1 className="text-3xl font-bold mb-8 mt-16 text-gray-800">
        Reports & Analytics
      </h1>

      {/* 🔢 Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">

        <div className="bg-white rounded-2xl shadow-md p-6 hover:shadow-xl transition">
          <p className="text-gray-500">Total Users</p>
          <h2 className="text-3xl font-bold text-blue-600">
            {report.totalUsers}
          </h2>
          <p className="text-sm text-gray-400">
            Active: {report.activeUsers}
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-md p-6 hover:shadow-xl transition">
          <p className="text-gray-500">Draws</p>
          <h2 className="text-3xl font-bold text-green-600">
            {report.totalDraws}
          </h2>
          <p className="text-sm text-gray-400">
            Winners: {report.totalWinners}
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-md p-6 hover:shadow-xl transition">
          <p className="text-gray-500">Prize Pool Distributed</p>
          <h2 className="text-3xl font-bold text-purple-600">
            ₹{report.totalPool?.toLocaleString()}
          </h2>
        </div>

      </div>

      {/* 📊 Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

        {/* Bar Chart */}
        <div className="bg-white p-6 rounded-2xl shadow-md hover:shadow-xl transition">
          <h2 className="font-semibold mb-4 text-gray-700">
            Users Overview
          </h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={userData}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="value" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Pie Chart */}
        <div className="bg-white p-6 rounded-2xl shadow-md hover:shadow-xl transition">
          <h2 className="font-semibold mb-4 text-gray-700">
            Draws vs Winners
          </h2>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={drawData}
                dataKey="value"
                nameKey="name"
                outerRadius={100}
                label
              >
                {drawData.map((entry, index) => (
                  <Cell key={index} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Legend />
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

      </div>
    </div>
  );
}