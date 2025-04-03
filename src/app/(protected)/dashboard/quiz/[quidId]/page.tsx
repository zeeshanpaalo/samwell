"use client";
import React from "react";

const QuizResults: React.FC = () => {
  return (
    <div className="flex flex-col w-full px-[16px] py-[16px] min-h-screen">
      {/* Breadcrumb Navigation */}
      <div className="mb-4 flex space-x-2 text-sm text-gray-600">
        <span className="bg-gray-200 px-2 py-1 rounded-md">Dashboard</span>
        <span className="bg-gray-200 px-2 py-1 rounded-md">
          New Quiz
        </span>
        <span className="bg-blue-200 px-2 py-1 rounded-md">Quiz Results</span>
      </div>
      <h2 className="text-2xl font-semibold text-gray-900 mb-4">
        Don’t worry, you’ll bounce back!
      </h2>
      <div className="grid grid-cols-4 gap-6">
        {/* Quiz Score */}
        <div className="bg-white p-6 rounded-xl shadow-sm col-span-1 flex flex-col items-center justify-center text-center">
          <h3 className="text-lg font-medium text-gray-700">Quiz Score</h3>
          <div className="flex flex-col items-center mt-4">
            <div className="relative w-16 h-16">
              {/* Circular progress (static for now) */}
              <svg className="w-full h-full" viewBox="0 0 36 36">
                <circle
                  className="text-gray-200 stroke-current"
                  strokeWidth="4"
                  cx="18"
                  cy="18"
                  r="16"
                  fill="none"
                ></circle>
                <circle
                  className="text-orange-500 stroke-current"
                  strokeWidth="4"
                  cx="18"
                  cy="18"
                  r="16"
                  fill="none"
                  strokeDasharray="40, 100"
                ></circle>
              </svg>
            </div>
            <p className="text-3xl font-bold mt-4">40%</p>
            <p className="text-sm text-green-600">Correct: 4</p>
            <p className="text-sm text-orange-500">Incorrect: 6</p>
          </div>
        </div>

        {/* Time Completed - Wider Card */}
        <div className="bg-white p-6 rounded-xl shadow-sm col-span-2 flex flex-col items-center">
          <h3 className="text-lg font-medium text-gray-700">Time Completed</h3>
          <p className="text-3xl font-bold mt-4">00:18:54</p>
          <h3 className="text-lg font-medium text-gray-700 mt-4">
            Avg. Time Per Question
          </h3>
          <p className="text-xl font-semibold text-gray-900 mt-2">4 mins</p>
          <h3 className="text-lg font-medium text-gray-700 mt-4">
            Longest Time On A Question
          </h3>
          <div className="mt-2 flex space-x-2">
            <button className="px-3 py-1 bg-gray-100 rounded-md">Q. 6</button>
            <button className="px-3 py-1 bg-gray-100 rounded-md">Q. 8</button>
          </div>
        </div>

        {/* Actions and Review Section */}
        <div className="bg-white p-6 rounded-xl shadow-sm col-span-1">
          <h3 className="text-lg font-medium text-gray-700">Try Again</h3>
          <p className="text-sm text-gray-500">
            Retake the test to improve your score.
          </p>
          <h3 className="text-lg font-medium text-gray-700 mt-4">
            Review your answer
          </h3>
          <p className="text-sm text-gray-500">
            Go over your answers and get instant AI feedback.
          </p>
          <div className="bg-orange-100 text-orange-600 text-sm font-medium py-1 px-3 rounded-md mt-2">
            ⚠️ 6 Missed item
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuizResults;
