"use client";

import { useQuizContext } from "@/providers/QuizProvider";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Home() {
  const { setTopic } = useQuizContext();
  const router = useRouter();
  const [studyInput, setStudyInput] = useState(""); // State for the text input

  const handleStartStudying = () => {
    setTopic(studyInput);
    router.push(`/dashboard/quiz/add`);
  };

  return (
    <div className="min-h-screen bg-white flex flex-col items-center px-6">
      {/* Navbar */}
      <header className="w-full flex justify-between items-center py-6 max-w-7xl gap-4">
        <div className="flex items-center justify-center">
          <h1 className="text-xl font-bold mr-[20px]">samwell.ai</h1>
          <nav className="space-x-6 hidden md:flex">
            <a href="#" className="text-gray-600 hover:text-black">
              Pricing
            </a>
            <a href="#" className="text-gray-600 hover:text-black">
              Examples
            </a>
            <a href="#" className="text-gray-600 hover:text-black">
              Affiliate
            </a>
            <a href="#" className="text-gray-600 hover:text-black">
              Products
            </a>
          </nav>
        </div>
        <div className="flex items-center space-x-4">
          <button className="px-4 py-2 border border-gray-300 rounded-md">
            Login
          </button>
          <button className="px-4 py-2 bg-black text-white rounded-md">
            Sign-up for Free
          </button>
        </div>
      </header>

      {/* Hero Section */}
      <section className="text-center max-w-3xl mt-10">
        <h2 className="text-4xl font-bold">
          <span className="text-blue-500">Personalized</span> Learning with
          Samwell.ai
        </h2>
        <p className="text-gray-600 mt-4">
          Explore how Samwell can help you learn what you need, effortlessly.
        </p>
      </section>

      {/* AI Tutor Input */}
      <div className="mt-10 w-full max-w-xl bg-gray-100 p-6 rounded-xl shadow-md">
        <div className="flex justify-between items-center pb-4 border-b">
          <span className="font-medium">AI tutor</span>
        </div>
        <div className="mt-4 border border-gray-300 p-4 rounded-md bg-white">
          <div className="border-dashed border-2 border-gray-300 p-10 text-center text-gray-500 cursor-pointer">
            Click to Upload or drag and drop <br />
            <span className="text-sm">(Max. File size: 25 MB)</span>
          </div>
          <div className="mt-4 flex items-center space-x-2">
            <input
              type="text"
              placeholder="Paste URL here"
              className="flex-1 p-2 border rounded-md"
              // value={studyInput} // Bind the input value to state
              // onChange={(e) => setStudyInput(e.target.value)} // Update state on change
            />
            <button className="px-4 py-2 bg-gray-200 rounded-md">Add</button>
          </div>
          <textarea
            placeholder="Type what you study..."
            className="w-full mt-4 p-2 border rounded-md"
            value={studyInput} // Bind the input value to state
            onChange={(e) => setStudyInput(e.target.value)} // Update state on change
          ></textarea>
          <button
            className="w-full mt-4 py-2 bg-blue-500 text-white rounded-md"
            onClick={handleStartStudying} // Trigger URL push with query
          >
            Start Studying
          </button>
        </div>
      </div>

      {/* Footer */}
      <footer className="mt-16 text-center text-gray-600 text-sm">
        <p>Loved by over 3 million Students and Academics across the world</p>
        <div className="flex justify-center space-x-6 mt-4">
          <span>🌍 United Nations</span>
          <span>🏛️ King's College London</span>
          <span>📚 University of Toronto</span>
          <span>📖 LSE</span>
          <span>🎓 Università Bocconi</span>
        </div>
      </footer>
    </div>
  );
}
