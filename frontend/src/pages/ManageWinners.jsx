import { useEffect, useState } from "react";
import API from "../api";

export default function ManageWinners() {
  const [winners, setWinners] = useState([]);

  useEffect(() => {
    API.get("/admin/winners").then(res => setWinners(res.data));
  }, []);

  const approve = async (id) => {
    await API.put(`/admin/winner/approve/${id}`);
    alert("Approved");
  };

  const pay = async (id) => {
    await API.put(`/admin/winner/pay/${id}`);
    alert("Paid");
  };

  return (
    <div>
      <h1 className="text-xl font-bold mb-4">Manage Winners</h1>

      {winners.map(w => (
       <div className="bg-white p-4 rounded-xl shadow mb-2">
  <p className="font-bold">{w.userId?.email}</p>
  <p>Match: {w.matchCount}</p>
  <p>Status: {w.status}</p>

  <div className="mt-2 flex gap-2">
    <button onClick={()=>approve(w._id)}
      className="bg-green-500 px-3 py-1 text-white rounded transition-all duration-300">
      Approve
    </button>

    <button onClick={()=>pay(w._id)}
      className="bg-blue-500 px-3 py-1 text-white rounded transition-all duration-300">
      Pay
    </button>
  </div>
</div>
      ))}
    </div>
  );
}