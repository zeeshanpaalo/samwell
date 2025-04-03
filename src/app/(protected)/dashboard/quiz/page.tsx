"use client";
import React from "react";
import Link from "next/link";

const Quiz: React.FC = () => {
  return (
    <div>
      List of quizes taken
      <Link
        href="/"
        className="block p-2 rounded hover:bg-gray-200"
      >
        <button>Start New quiz</button>
      </Link>
    </div>
  );
};

export default Quiz;
