"use client";

import React, { useEffect } from "react";
import QuizQuestionsList from "@/components/quiz";
import { useQuizContext } from "@/providers/QuizProvider";

const StartQuiz: React.FC = () => {
  const {
    fetchAndSetQuestions,
    handleAnswerChange,
    onAnswerSubmit,
    questions,
    isLoading,
    handleSubmit,
    topic,
    answers,
  } = useQuizContext();

  useEffect(() => {
    if (topic) {
      fetchAndSetQuestions(topic);
    }
  }, [topic]);
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

      {/* Loading */}
      {isLoading ? (
        <div className="flex justify-center items-center py-10">
          <div className="animate-spin border-t-4 border-blue-600 w-16 h-16 rounded-full"></div>
        </div>
      ) : (
        <div className="px-[16px] py-[32px]">
          <QuizQuestionsList
            questions={questions}
            onAnswerSubmit={onAnswerSubmit}
            handleAnswerChange={handleAnswerChange}
          />
        </div>
      )}

      {/* Submit Button */}
      {!isLoading && (
        <div className="flex justify-end px-[16px] py-4">
          <button
            className="bg-[#2A76F6] text-white px-6 py-2 rounded-[59px] shadow hover:bg-blue-700 w-[174px] h-[50px]"
            onClick={handleSubmit}
          >
            Complete
          </button>
        </div>
      )}
    </div>
  );
};

export default StartQuiz;
