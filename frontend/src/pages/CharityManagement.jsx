import { useEffect, useState } from "react";
import API from "../api";
import { toast } from "react-toastify";

export default function AdminCharities() {
  const [charities, setCharities] = useState([]);
  const [search, setSearch] = useState("");
  const [form, setForm] = useState({ name: "", description: "", image: null });
  const [editId, setEditId] = useState(null);

  // Fetch charities
const fetchCharities = async () => {
  try {
    const res = await API.get(`/charity?search=${search}`);
    console.log("ADMIN DATA:", res.data);
    setCharities(res.data); // safe because React handles async setState
  } catch (err) {
    console.error(err);
    toast.error("Failed to fetch charities");
  }
};

useEffect(() => {
  // call it async without blocking render
  (async () => {
    await fetchCharities();
  })();
}, [search]);

  // Handle form input change
  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "image") {
      setForm((prev) => ({ ...prev, image: files[0] }));
    } else {
      setForm((prev) => ({ ...prev, [name]: value }));
    }
  };

  // Add or Edit charity
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.description) {
      toast.error("Name and description are required");
      return;
    }

    const data = new FormData();
    data.append("name", form.name);
    data.append("description", form.description);
    if (form.image) data.append("image", form.image);

    try {
      if (editId) {
        await API.put(`/charity/${editId}`, data);
        toast.success("Charity updated");
      } else {
        await API.post("/charity", data);
        toast.success("Charity added");
      }
      setForm({ name: "", description: "", image: null });
      setEditId(null);
      fetchCharities();
    } catch (err) {
      console.error(err);
      toast.error("Failed to save charity");
    }
  };

  // Delete charity (soft delete)
  const deleteCharity = async (id) => {
    if (!window.confirm("Are you sure you want to delete this charity?")) return;
    try {
      await API.delete(`/charity/${id}`);
      toast.success("Charity deleted");
      fetchCharities();
    } catch (err) {
      console.error(err);
      toast.error("Failed to delete charity");
    }
  };

  // Edit charity
  const editCharity = (c) => {
    setEditId(c._id);
    setForm({ name: c.name, description: c.description, image: null });
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Charity Management</h1>

      {/* Add/Edit Form */}
      <form onSubmit={handleSubmit} className="bg-white p-4 rounded shadow mb-6 grid gap-3">
        <input
          type="text"
          name="name"
          placeholder="Charity Name"
          value={form.name}
          onChange={handleChange}
          className="border p-2 rounded w-full"
        />
        <textarea
          name="description"
          placeholder="Charity Description"
          value={form.description}
          onChange={handleChange}
          className="border p-2 rounded w-full"
        />
        <input
          type="file"
          name="image"
          onChange={handleChange}
          className="border p-1 rounded w-full"
        />
        <button
          type="submit"
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
        >
          {editId ? "Update Charity" : "Add Charity"}
        </button>
        {editId && (
          <button
            type="button"
            className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
            onClick={() => { setEditId(null); setForm({ name: "", description: "", image: null }); }}
          >
            Cancel Edit
          </button>
        )}
      </form>

      {/* Search */}
      <input
        type="text"
        placeholder="Search Charity..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="border p-2 mb-4 rounded w-full md:w-1/3"
      />

      {/* Charity List */}
      {charities.length === 0 ? (
        <p className="text-gray-500 text-center mt-10">No charities found.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {charities.map((c) => (
            <div key={c._id} className="bg-white shadow rounded-xl p-4 hover:shadow-lg transition-all duration-300">
              {c.image && (
                <img src={c.image} alt={c.name} className="h-32 w-full object-cover rounded mb-2" />
              )}
              <p className="font-bold text-lg">{c.name}</p>
              <p>{c.description}</p>
              <p className="mt-1 font-semibold">Total Donations: ₹{c.totalDonations || 0}</p>
              <div className="flex gap-2 mt-2">
                <button
                  onClick={() => editCharity(c)}
                  className="bg-blue-500 px-3 py-1 text-white rounded hover:bg-blue-600"
                >
                  Edit
                </button>
                <button
                  onClick={() => deleteCharity(c._id)}
                  className="bg-red-500 px-3 py-1 text-white rounded hover:bg-red-600"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}