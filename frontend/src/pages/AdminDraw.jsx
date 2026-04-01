import { useEffect, useState } from "react";
import API from "../api";
import { toast } from "react-toastify";

export default function AdminDraw() {
  const [draws, setDraws] = useState([]);

  const runDraw = async () => {
    await API.post("/draw/run");
    toast.success("Draw executed");
    fetchDraws();
  };

  const fetchDraws = async () => {
    const res = await API.get("/draw");
    setDraws(res.data);
  };

  useEffect(() => {
    fetchDraws();
  }, []);

  const publishDraw = async (id) => {
    await API.put(`/admin/publish/${id}`);
    toast.success("Draw published");
    fetchDraws();
  };

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold mb-4">Draw Management</h1>

      <button onClick={runDraw} className="bg-red-600 text-white px-4 py-2 mb-4">
        Run Draw
      </button>

      <table className="w-full table-auto border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-100">
            <th className="border p-2">Draw ID</th>
            <th className="border p-2">Total Pool</th>
            <th className="border p-2">Published</th>
            <th className="border p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {draws.map(draw => (
            <tr key={draw._id} className="text-center">
              <td className="border p-2">{draw._id}</td>
              <td className="border p-2">₹{draw.totalPool}</td>
              <td className="border p-2">{draw.isPublished ? "Yes" : "No"}</td>
              <td className="border p-2">
                {!draw.isPublished && (
                  <button
                    onClick={() => publishDraw(draw._id)}
                    className="bg-green-500 text-white px-2 py-1 rounded"
                  >
                    Publish
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}