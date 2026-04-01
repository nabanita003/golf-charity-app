// import { useEffect, useState } from "react";
// import API from "../api";

// export default function AdminDashboard() {
//   const [stats, setStats] = useState({});

//   useEffect(() => {
//     API.get("/admin/stats").then(res => setStats(res.data));
//   }, []);

//   return (
//     <div>
//       <h1 className="text-2xl font-bold mb-4 mt-20">Admin Dashboard</h1>

//       <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//         <Card title="Total Users" value={stats.totalUsers} />
//         <Card title="Active Users" value={stats.activeUsers} />
//         <Card title="Total Draws" value={stats.totalDraws} />
//         <Card title="Total Winners" value={stats.totalWinners} />
//         <Card title="Total Pool ₹" value={stats.totalPool} />
//       </div>
//     </div>
//   );
// }

// function Card({ title, value }) {
//   return (
//     <div className="bg-white shadow rounded-xl p-4 mb-2 hover:shadow-lg transition-all duration-300">
//       <h2 className="text-gray-500">{title}</h2>
//       <p className="text-xl font-bold">{value || 0}</p>
//     </div>
//   );
// }


import { useEffect, useState } from "react";
import API from "../api";

export default function AdminDashboard() {
  const [stats, setStats] = useState({});

  useEffect(() => {
    API.get("/admin/stats").then(res => setStats(res.data));
  }, []);

  const cards = [
    { title: "Total Users", value: stats.totalUsers },
    { title: "Active Users", value: stats.activeUsers },
    { title: "Total Draws", value: stats.totalDraws },
    { title: "Total Winners", value: stats.totalWinners },
    { title: "Total Pool ₹", value: stats.totalPool },
  ];

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Admin Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {cards.map((c, i) => (
          <div key={i} className="bg-white shadow rounded-xl p-4 hover:shadow-lg transition-all duration-300">
            <h2 className="text-gray-500">{c.title}</h2>
            <p className="text-xl font-bold">{c.value || 0}</p>
          </div>
        ))}
      </div>
    </div>
  );
}