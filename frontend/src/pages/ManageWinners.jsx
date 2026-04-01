import { useEffect, useState } from "react";
import API from "../api";

export default function ManageWinners() {
  const [winners, setWinners] = useState([]);

  // ✅ Use an inner async function inside useEffect
  useEffect(() => {
    const fetchWinners = async () => {
      try {
        const res = await API.get("/admin/winners");
        setWinners(res.data);
      } catch (err) {
        console.error("Error fetching winners:", err);
      }
    };

    fetchWinners();
  }, []);

  const approve = async (id) => {
    try {
      await API.put(`/admin/winner/approve/${id}`);
      // Refetch winners after approve
      const res = await API.get("/admin/winners");
      setWinners(res.data);
    } catch (err) {
      console.error("Error approving winner:", err);
    }
  };

  const pay = async (id) => {
    try {
      await API.put(`/admin/winner/pay/${id}`);
      // Refetch winners after pay
      const res = await API.get("/admin/winners");
      setWinners(res.data);
    } catch (err) {
      console.error("Error paying winner:", err);
    }
  };

  return (
<div className=" p-6">
  <h1 className="text-2xl font-bold mb-6">Manage Winners</h1>

  {winners.length === 0 ? (
    <p className="text-gray-500 text-center mt-10">No winners found.</p>
  ) : (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {winners.map((w) => (
        <div
          key={w._id}
          className="bg-white shadow rounded-xl p-4 hover:shadow-lg transition-all duration-300"
        >
          <p className="font-bold">{w.userId?.email}</p>
          <p>Match: {w.matchCount}</p>
          <p>Status: {w.status}</p>
          <p>Payment: {w.paymentStatus}</p>

          <div className="mt-2 flex gap-2">
            <button
              onClick={() => approve(w._id)}
              className="bg-green-500 px-3 py-1 text-white rounded hover:bg-green-600 transition-all duration-300"
            >
              Approve
            </button>

            <button
              onClick={() => pay(w._id)}
              className="bg-blue-500 px-3 py-1 text-white rounded hover:bg-blue-600 transition-all duration-300"
            >
              Pay
            </button>
          </div>
        </div>
      ))}
    </div>
  )}
</div>
  );
}