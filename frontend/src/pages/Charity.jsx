import { useEffect, useState } from "react";
import API from "../api";
import { toast } from "react-toastify";

export default function Charity() {
  const [charities, setCharities] = useState([]);
  const [percentage, setPercentage] = useState(10);

useEffect(() => {
  API.get("/charity").then(res => {
    console.log(res.data);   // 🔥 ADD HERE
    setCharities(res.data);
  });
}, []);

const selectCharity = async (id) => {
  try {
    await API.post("/charity/select", { charityId: id, percentage });
    toast.success("Charity Selected 💜");
  } catch {
    toast.error("Failed to select charity");
  }
};

//   return (
//     <div>
//       <h1 className="text-xl font-bold mb-4 mt-12">Choose Charity</h1>

//       <input
//         type="number"
//         min="10"
//         value={percentage}
//         onChange={(e)=>setPercentage(e.target.value)}
//         className="border p-2 mb-4"
//       />
// <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
//   {charities.map(c => (
//     <div key={c._id} className="bg-white p-4 rounded-xl shadow">
      
//       <img src={c.image} className="h-32 w-full object-cover rounded mb-2" />

//       <h2 className="font-bold">{c.name}</h2>
//       <p className="text-sm text-gray-600">{c.description}</p>

//       <p className="mt-2">₹{c.totalDonations}</p>

//       <button
//         onClick={()=>selectCharity(c._id)}
//         className="bg-purple-600 text-white px-3 py-1 mt-2 w-full"
//       >
//         Select
//       </button>
//     </div>
//   ))}
// </div>
//     </div>
//   );
return (
  <div className="pt-24 px-4">

    <h1 className="text-2xl font-bold mb-6 text-center">
      Choose Charity
    </h1>

    <input
      type="number"
      min="10"
      value={percentage}
      onChange={(e) => setPercentage(e.target.value)}
      className="border p-2 mb-6 rounded w-full max-w-xs block mx-auto transition-all duration-300"
    />

    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
      {charities.map(c => (
        <div key={c._id} className="bg-white p-4 rounded-xl shadow hover:scale-105 transition-all duration-300">

          <img
            src={c.image}
            className="h-32 w-full object-cover rounded mb-2"
          />

          <h2 className="font-bold">{c.name}</h2>
          <p className="text-sm text-gray-600">{c.description}</p>

          <p className="mt-2 font-semibold">₹{c.totalDonations}</p>

          <button
            onClick={() => selectCharity(c._id)}
            className="bg-purple-600 text-white px-3 py-2 mt-3 w-full rounded-lg hover:bg-purple-700 transition"
          >
            Select
          </button>

        </div>
      ))}
    </div>

  </div>
);
}