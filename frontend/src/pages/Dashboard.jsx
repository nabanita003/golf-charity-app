// import { useEffect, useState } from "react";
// import API from "../api";
// import AddScore from "./AddScore";
// export default function Dashboard() {
//   const [data, setData] = useState({});

//   useEffect(() => {
//     API.get("/dashboard").then(res => setData(res.data));
//   }, []);
// // 🔒 Block non-subscribers
// if (data.user && data.user.subscription?.status !== "active") {
//   return (
//     <div className="p-6 text-center mt-20">
//       <h2 className="text-xl font-bold text-red-500">
//         Subscribe to access features
//       </h2>
//     </div>
//   );
// }
//   return (
//     <div className="p-6 bg-gray-100 min-h-screen">
      
//       {/* Header */}
//       <div className="mb-6">
//         <h1 className="text-3xl font-bold text-gray-800 mt-10">Dashboard</h1>
//         <p className="text-gray-500">Welcome back 👋</p>
//       </div>

//       {/* Cards */}
// <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

//   <Card 
//     title="Status" 
//     value={data.user?.subscription?.status} 
//     color="bg-blue-500"
//   />

//   <Card 
//     title="Plan" 
//     value={data.user?.subscription?.plan} 
//     color="bg-purple-500"
//   />

//   <Card 
//     title="Earnings ₹" 
//     value={data.totalEarnings} 
//     color="bg-green-500"
//   />

//   <Card 
//     title="Renewal Date" 
//     value={
//       data.user?.subscription?.renewalDate
//         ? new Date(data.user.subscription.renewalDate).toLocaleDateString()
//         : "-"
//     } 
//     color="bg-yellow-500"
//   />

//   <Card 
//     title="Charity %" 
//     value={
//       data.user?.charity?.percentage
//         ? data.user.charity.percentage + "%"
//         : "Not Selected"
//     } 
//     color="bg-pink-500"
//   />
//   <Card 
//   title="Draws Participated" 
//   value={data.totalDraws} 
//   color="bg-indigo-500" 
// />

// </div>

//       {/* Scores */}
//       <div className="mt-8 bg-white p-5 rounded-xl shadow">
//         <h2 className="font-semibold text-lg mb-3 text-gray-700">
//           Your Numbers
//         </h2>

//         {data.scores?.length ? (
//           <div className="flex flex-wrap gap-3">
//             {data.scores.map((s, i) => (
//               <span
//                 key={i}
//                 className="bg-blue-100 text-blue-700 px-4 py-2 rounded-full font-medium shadow-sm hover:scale-105 transition"
//               >
//                 {s.value}
//               </span>
//             ))}
//           </div>
//         ) : (
//           <p className="text-gray-400">No numbers added yet</p>
//         )}
//       </div>

//       {/* Winnings */}
//       <div className="mt-8 bg-white p-5 rounded-xl shadow">
//         <h2 className="font-semibold text-lg mb-3 text-gray-700">
//           Winnings
//         </h2>

//         {data.winnings?.length ? (
//           <div className="space-y-3">
//             {data.winnings.map((w, i) => (
//               <div
//                 key={i}
//                 className="flex justify-between items-center border p-3 rounded-lg hover:shadow-md transition"
//               >
//                 <div>
//                   <p className="font-medium text-gray-700">
//                     Match Count: {w.matchCount}
//                   </p>
//                 </div>

//                 <span
//                   className={`px-3 py-1 text-sm rounded-full font-medium ${
//                     w.status === "won"
//                       ? "bg-green-100 text-green-600"
//                       : "bg-yellow-100 text-yellow-600"
//                   }`}
//                 >
//                   {w.status}
//                 </span>
//               </div>
//             ))}
//           </div>
//         ) : (
//           <p className="text-gray-400">No winnings yet</p>
//         )}
//       </div>
//     </div>
//   );
// }

// function Card({ title, value, color }) {
//   return (
//     <div className="bg-white p-5 rounded-xl shadow hover:shadow-lg transition">
//       <div className="flex items-center justify-between">
//         <p className="text-gray-500">{title}</p>
//         <div className={`w-3 h-3 rounded-full ${color}`}></div>
//       </div>

//       <h2 className="text-2xl font-bold mt-2 text-gray-800">
//         {value || "-"}
//       </h2>
//     </div>
//   );
// }


import { useEffect, useState } from "react";
import API from "../api";
import AddScore from "./AddScore";

export default function Dashboard() {
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true);

  const fetchDashboard = async () => {
    try {
      const res = await API.get("/dashboard");
      setData(res.data);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboard();
  }, []);

  if (loading) {
      return (
    <div className="p-6 animate-pulse">
      <div className="h-6 bg-gray-300 w-1/3 mb-4 rounded"></div>
      <div className="grid grid-cols-3 gap-4">
        <div className="h-20 bg-gray-300 rounded"></div>
        <div className="h-20 bg-gray-300 rounded"></div>
        <div className="h-20 bg-gray-300 rounded"></div>
      </div>
    </div>
  );
  }

  return (
    <div className="p-6 bg-gray-100 min-h-screen">

      {/* HEADER */}
      <div className="mb-6 mt-10">
        <h1 className="text-3xl font-bold text-gray-800">Dashboard</h1>
        <p className="text-gray-500">Welcome back 👋</p>
      </div>

      {/* CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

        <Card 
          title="Status" 
          value={data.user?.subscription?.status} 
          color="bg-blue-500"
        />

        <Card 
          title="Plan" 
          value={data.user?.subscription?.plan} 
          color="bg-purple-500"
        />

        <Card 
          title="Earnings ₹" 
          value={data.totalEarnings} 
          color="bg-green-500"
        />

        <Card 
          title="Renewal Date" 
          value={
            data.user?.subscription?.renewalDate
              ? new Date(data.user.subscription.renewalDate).toLocaleDateString()
              : "-"
          } 
          color="bg-yellow-500"
        />

        <Card 
          title="Charity %" 
          value={
            data.user?.charity?.percentage
              ? data.user.charity.percentage + "%"
              : "Not Selected"
          } 
          color="bg-pink-500"
        />

        <Card 
          title="Draws Participated" 
          value={data.totalDraws || 0} 
          color="bg-indigo-500" 
        />

      </div>

      {/* ADD SCORE */}
      <div className="mt-8 bg-white p-5 rounded-xl shadow">
        <h2 className="font-semibold text-lg mb-3 text-gray-700">
          Add Score
        </h2>

        {data.user?.subscription?.status === "active" ? (
          <AddScore onSuccess={fetchDashboard} />
        ) : (
          <p className="text-red-500">
            Please subscribe to add scores
          </p>
        )}
      </div>

      {/* SCORES */}
      <div className="mt-8 bg-white p-5 rounded-xl shadow">
        <h2 className="font-semibold text-lg mb-3 text-gray-700">
          Your Numbers
        </h2>

        {data.scores?.length ? (
          <div className="flex flex-wrap gap-3">
            {data.scores.map((s, i) => (
              <span
                key={i}
                className="bg-blue-100 text-blue-700 px-4 py-2 rounded-full font-medium shadow-sm hover:scale-105 transition"
              >
                {s.value}
              </span>
            ))}
          </div>
        ) : (
          <p className="text-gray-400">No numbers added yet</p>
        )}
      </div>

      {/* WINNINGS */}
      <div className="mt-8 bg-white p-5 rounded-xl shadow">
        <h2 className="font-semibold text-lg mb-3 text-gray-700">
          Winnings
        </h2>

        {data.winnings?.length ? (
          <div className="space-y-3">
            {data.winnings.map((w, i) => (
              <div
                key={i}
                className="flex justify-between items-center border p-3 rounded-lg hover:shadow-md transition"
              >
                <div>
                  <p className="font-medium text-gray-700">
                    Match Count: {w.matchCount}
                  </p>
                </div>

                <span
                  className={`px-3 py-1 text-sm rounded-full font-medium ${
                    w.status === "approved"
                      ? "bg-green-100 text-green-600"
                      : "bg-yellow-100 text-yellow-600"
                  }`}
                >
                  {w.status}
                </span>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-400">No winnings yet</p>
        )}
      </div>

    </div>
  );
}

/* CARD COMPONENT */
function Card({ title, value, color }) {
  return (
    // <div className="bg-white p-5 rounded-xl shadow hover:shadow-lg transition">
    <div className="bg-white p-5 rounded-xl shadow hover:shadow-lg transition-all duration-300">
      <div className="flex items-center justify-between">
        <p className="text-gray-500">{title}</p>
        <div className={`w-3 h-3 rounded-full ${color}`}></div>
      </div>

      <h2 className="text-2xl font-bold mt-2 text-gray-800">
        {value || "-"}
      </h2>
    </div>
  );
}