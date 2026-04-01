import { useEffect, useState } from "react";
import API from "../api";

export default function History() {
  const [draws, setDraws] = useState([]);

  useEffect(() => {
    API.get("/history").then(res => setDraws(res.data));
  }, []);

  return (
    <>
      {draws.length === 0 ? (
        <div className="flex items-center justify-center h-60 text-gray-500 text-lg">
          No history available yet 📭
        </div>
      ) : (
        <div className="grid md:grid-cols-2 gap-4">
          {draws.map(d => (
            <div key={d._id} className="bg-white p-4 rounded-xl shadow">
              <p className="font-bold">🎯 {d.numbers.join(", ")}</p>
              <p>Pool ₹{d.totalPool}</p>
              <p className="text-sm text-gray-500">
                {new Date(d.createdAt).toLocaleString()}
              </p>
            </div>
          ))}
        </div>
      )}
    </>
  );
}