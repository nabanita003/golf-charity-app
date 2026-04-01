// import { useState } from "react";
import API from "../api";
import { useState } from "react";
import { toast } from "react-toastify";

export default function Subscribe() {
  const [plan, setPlan] = useState("monthly");

  // Load Razorpay script
  const loadRazorpay = () => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  const subscribe = async () => {
    const loaded = await loadRazorpay();

    if (!loaded) {
      toast.error("Razorpay failed to load");
      return;
    }

    // Create order from backend
    const { data } = await API.post("/payment/create-order", { plan });

    const options = {
      key: "rzp_test_SXLtziSRNeAo7i", // Razorpay key
      amount: data.order.amount,
      currency: "INR",
      name: "Lottery App",
      description: plan,
      order_id: data.order.id,

      handler: async function (response) {
        // Verify payment
        await API.post("/payment/verify", {
          ...response,
          plan,
        });

        toast.success("Payment Successful 🎉");
        window.location.href = "/dashboard";
      },

      theme: {
        color: "#7c3aed",
      },
    };

    const rzp = new window.Razorpay(options);
    rzp.open();
  };

  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="bg-white p-6 rounded-xl shadow text-center w-full max-w-md">

        <h2 className="text-xl font-bold mb-4">Choose Plan</h2>

        {/* Plan Selector */}
        <select
          value={plan}
          onChange={(e) => setPlan(e.target.value)}
          className="border p-2 w-full mb-4 rounded"
        >
          <option value="monthly">Monthly ₹99</option>
          <option value="yearly">Yearly ₹999</option>
        </select>

        <button
          onClick={subscribe}
          // className="bg-purple-600 text-white px-6 py-2 rounded w-full"
          className="bg-purple-600 text-white px-6 py-2 rounded w-full hover:bg-purple-700 transition-all duration-300"
        >
          Pay Now
        </button>
      </div>
    </div>
  );
}