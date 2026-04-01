import { useState } from "react";
import API from "../api";
import { toast } from "react-toastify";

export default function UploadProof() {
  const [drawId, setDrawId] = useState("");
  const [file, setFile] = useState(null);

  const upload = async () => {
    if (!file) return toast.info("Select file");

    const formData = new FormData();
    formData.append("drawId", drawId);
    formData.append("proof", file);
   try{
    await API.post("/winner/proof", formData, {
      headers: {
        "Content-Type": "multipart/form-data"
      }
    });
   toast.success("Proof uploaded successfully 🎉");
  }catch {
    toast.error("Upload failed");
  }
  };

  return (
    <div>
      <h1 className="text-xl font-bold mb-4">Upload Proof</h1>

      <input
        placeholder="Draw ID"
        className="border p-2 block mb-2 transition-all duration-300"
        onChange={(e)=>setDrawId(e.target.value)}
      />

      <input
        type="file"
        className="border p-2 block mb-2 transition-all duration-300"
        onChange={(e)=>setFile(e.target.files[0])}
      />

      <button
        onClick={upload}
        className="bg-green-600 text-white px-4 py-2 transition-all duration-300"
      >
        Upload
      </button>
    </div>
  );
}