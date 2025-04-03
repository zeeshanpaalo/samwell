"use client";

import React from "react";

const StartQuiz: React.FC = () => {
  return (
    <div className="flex flex-col w-full px-[16px] py-[16px] min-h-screen">
      <div className="flex justify-between items-center">
        <div className="flex items-center text-sm text-gray-600">
          <span className="mr-2">Time left:</span>
          <span className="bg-gray-200 px-2 py-1 rounded">00</span> :
          <span className="bg-gray-200 px-2 py-1 rounded">18</span> :
          <span className="bg-gray-200 px-2 py-1 rounded">54</span>
        </div>
      </div>

      {/* Question List */}
      <div className="px-[16px] py-[32px]">
        {[...Array(6)].map((_, index) => (
          <div key={index} className="bg-white p-6 rounded-lg shadow mb-6">
            <p className="font-medium mb-4">Question {index + 1} of 10</p>
            <h2 className="text-lg font-semibold mb-4">
              Sample Question {index + 1}?
            </h2>
            <div className="space-y-2">
              <label className="flex items-center space-x-2 p-2 border rounded cursor-pointer hover:bg-gray-50">
                <input
                  type="radio"
                  name={`question${index}`}
                  className="form-radio"
                />
                <span>Option A</span>
              </label>
              <label className="flex items-center space-x-2 p-2 border rounded cursor-pointer hover:bg-gray-50">
                <input
                  type="radio"
                  name={`question${index}`}
                  className="form-radio"
                />
                <span>Option B</span>
              </label>
              <label className="flex items-center space-x-2 p-2 border rounded cursor-pointer hover:bg-gray-50">
                <input
                  type="radio"
                  name={`question${index}`}
                  className="form-radio"
                />
                <span>Option C</span>
              </label>
              <label className="flex items-center space-x-2 p-2 border rounded cursor-pointer hover:bg-gray-50">
                <input
                  type="radio"
                  name={`question${index}`}
                  className="form-radio"
                />
                <span>Option D</span>
              </label>
            </div>
            <a href="#" className="text-blue-600 text-sm mt-2 inline-block">
              Don't know?
            </a>
          </div>
        ))}
      </div>

      {/* Submit Button */}
      <div className="flex justify-end px-[16px] py-4">
        <button className="bg-[#2A76F6] text-white px-6 py-2 rounded-[59px] shadow hover:bg-blue-700 w-[174px] h-[50px]">
          Complete
        </button>
      </div>
    </div>
  );
};

export default StartQuiz;
