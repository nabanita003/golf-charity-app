

export default function Alert({ message, type, onClose }) {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/40 z-50">

      <div className="bg-white p-6 rounded-xl shadow-lg w-75 text-center animate-fadeIn">

        <h2 className={`text-lg font-bold mb-2 ${
          type === "success" ? "text-green-600" : "text-red-600"
        }`}>
          {type === "success" ? "Success 🎉" : "Error ❌"}
        </h2>

        <p className="text-gray-600 mb-4">{message}</p>

        <button
          onClick={onClose}
          className="w-full bg-green-600 text-white py-2 rounded-md hover:bg-green-700 transition-all duration-300"
        >
          OK
        </button>

      </div>
    </div>
  );
}