import { useState } from "react";
import API from "../api";
import { toast } from "react-toastify";


export default function AddScore({ onSuccess }) {
  const [value, setValue] = useState("");
  const [loading, setLoading] = useState(false);

  const submit = async () => {
    if (!value) return toast.warning("Enter a score");

    if (value < 1 || value > 45) {
      return toast.error("Score must be between 1 and 45");
    }

    try {
      setLoading(true);

      await API.post("/score", { value: Number(value) });

      toast.success("Score added ✅");
      setValue("");

      // refresh dashboard without reload
      if (onSuccess) onSuccess();

    } catch (err) {
      toast.error(err.response?.data?.msg || "Error adding score");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex gap-3 items-center flex-wrap">
      <input
        type="number"
        min="1"
        max="45"
        value={value}
        placeholder="Enter score (1-45)"
        className="border p-3 rounded-lg w-40 focus:outline-none focus:ring-2 focus:ring-green-400 transition-all duration-300"
        onChange={(e) => setValue(e.target.value)}
      />

      <button
        onClick={submit}
        disabled={loading}
        className="bg-green-600 text-white px-5 py-2 rounded-lg hover:bg-green-700 transition-all duration-300 disabled:opacity-50"
      >
        {loading ? "Adding..." : "Add Score"}
      </button>
    </div>
  );
}