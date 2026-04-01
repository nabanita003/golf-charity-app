import { useState, useEffect } from "react";
import AuthModal from "../components/AuthModal";

import tracking from "../assets/trackscore.jpg";
import prize from "../assets/prize.jpg";
import charity from "../assets/charity.jpg";
import heroImg from "../assets/images.png";

export default function Home() {
  const [open, setOpen] = useState(false);
  const [type, setType] = useState("login");
  const [show, setShow] = useState(false);

  // trigger animation on load
  useEffect(() => {
    setTimeout(() => setShow(true), 100);
  }, []);

  return (
    <div className={`relative min-h-screen bg-linear-to-br from-green-400 via-blue-500 to-purple-600 flex flex-col items-center text-white px-4 overflow-hidden ${show ? "animate-fadeIn" : "opacity-0"}`}>

      {/* HERO SECTION */}
      <div className="max-w-6xl w-full flex flex-col md:flex-row items-center justify-between mt-16 gap-10">

        {/* LEFT */}
        <div className="space-y-6 md:max-w-lg text-center md:text-left">

          <h1 className="text-4xl md:text-6xl font-extrabold leading-tight animate-fadeIn delay-200">
            Play Golf. <span className="text-yellow-300">Win Rewards.</span><br />
            Support Charity.
          </h1>

          <p className="text-lg md:text-xl text-white/90 animate-fadeIn delay-400">
            Track scores, enter monthly draws, and contribute to charities — all in one platform.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start animate-fadeIn delay-600">

            <button
              onClick={() => {
                setType("register");
                setOpen(true);
              }}
              className="bg-white text-gray-900 px-6 py-3 rounded-full font-semibold shadow-lg hover:scale-105 transition duration-300"
            >
              Get Started
            </button>

            <button
              onClick={() => {
                setType("login");
                setOpen(true);
              }}
              className="border border-white px-6 py-3 rounded-full hover:bg-white hover:text-gray-900 transition duration-300"
            >
              Login
            </button>

          </div>
        </div>

        {/* RIGHT IMAGE */}
        <div className="flex justify-center md:justify-end animate-fadeIn delay-800 w-84">
          <img
            src={heroImg}
            alt="Golf"
            className="w-40 sm:w-56 md:w-72 lg:w-96 xl:w-105 rounded-2xl shadow-2xl animate-float"
          />
        </div>
      </div>

      {/* FEATURES */}
      <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl w-full">
        {/* FEATURED CHARITY */}
<div className="mt-12 bg-white/20 backdrop-blur-lg p-6 rounded-2xl shadow-xl text-center max-w-3xl">
  <h2 className="text-2xl font-bold mb-2">🌟 Featured Charity</h2>
  <p className="text-white/90">
    Support education for underprivileged children and make a real impact.
  </p>
</div>

        {[
          { title: "Track Scores", desc: "Enter your last 5 golf scores.", img: tracking },
          { title: "Monthly Draws", desc: "Win exciting rewards every month.", img: prize },
          { title: "Support Charity", desc: "Your subscription helps charities.", img: charity },
        ].map((card, idx) => (
          <div
            key={idx}
            className="relative h-64 rounded-2xl overflow-hidden group shadow-xl animate-fadeIn"
            style={{ animationDelay: `${idx * 0.2 + 0.6}s` }}
          >

            {/* IMAGE */}
            <img
              src={card.img}
              alt={card.title}
              className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition duration-500"
            />

            {/* OVERLAY */}
            <div className="absolute inset-0 bg-black/50 group-hover:bg-black/60 transition"></div>

            {/* TEXT */}
            <div className="relative z-10 p-5 flex flex-col justify-end h-full">
              <h3 className="text-xl font-bold">{card.title}</h3>
              <p className="text-sm text-white/80">{card.desc}</p>
            </div>

          </div>
        ))}

      </div>

      {/* FLOATING ICON */}
      <div className="absolute bottom-6 text-3xl animate-float">
        🏌️‍♂️
      </div>

      {/* MODAL */}
      <AuthModal
        isOpen={open}
        onClose={() => setOpen(false)}
        type={type}
      />
    </div>
  );
}