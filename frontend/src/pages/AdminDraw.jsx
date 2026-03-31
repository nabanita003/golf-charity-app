import API from "../api";

export default function AdminDraw() {

  const runDraw = async () => {
    await API.post("/draw/run");
    alert("Draw executed");
  };

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold mb-4">Draw Control</h1>

      <button
        onClick={runDraw}
        className="bg-red-600 text-white px-4 py-2"
      >
        Run Draw
      </button>
    </div>
  );
}