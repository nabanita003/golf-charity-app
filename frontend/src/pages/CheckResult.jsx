import { useState } from "react";
import API from "../api";
import { toast } from "react-toastify";

export default function CheckResult() {
  const [drawId, setDrawId] = useState("");
  const [result, setResult] = useState(null);

const check = async () => {
  try {
    const res = await API.post("/draw-check/check", { drawId });
    setResult(res.data);

    if (res.data.message) {
      toast.info(res.data.message);
    } else {
      toast.success("You won 🎉");
    }
  } catch {
    toast.error("Error checking result");
  }
};

  return (
    <div>
      <h1 className="text-xl font-bold mb-4">Check Result</h1>

      <input
        placeholder="Enter Draw ID"
        className="border p-2 mr-2 transition-all duration-300"
        onChange={(e)=>setDrawId(e.target.value)}
      />

      <button
        onClick={check}
        className="bg-blue-600 text-white px-4 py-2"
      >
        Check
      </button>

      {result && (
        <div className="mt-4 border p-4 rounded">
          <p>{result.message || "Winner!"}</p>
          <p>Match: {result.matchCount}</p>
          <p>Prize: ₹{result.prize}</p>
        </div>
      )}
    </div>
  );
}