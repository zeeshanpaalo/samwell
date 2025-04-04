"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import QuizQuestionsList, { AnyQuestion } from "@/components/quiz";
import { fetchQuizData } from "@/mocks/api";

const StartQuiz: React.FC = () => {
  const router = useRouter();
  const [answers, setAnswers] = useState<{
    [key: string]: string[] | { [key: string]: string };
  }>({});
  const [questions, setQuestions] = useState<AnyQuestion[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // Fetch questions on component mount
  useEffect(() => {
    const loadData = async () => {
      const data = await fetchQuizData();
      setQuestions(data);
      setIsLoading(false);
    };
    loadData();
  }, []);

  const handleAnswerChange = (
    questionId: string,
    selectedAnswers: string[]
  ) => {
    setAnswers((prev) => ({ ...prev, [questionId]: selectedAnswers }));
  };

  const onAnswerSubmit = (
    questionId: string,
    selectedAnswers: { [key: string]: string }
  ) => {
    setAnswers((prev) => ({ ...prev, [questionId]: selectedAnswers }));
  };

  const handleSubmit = () => {
    router.push("/dashboard/quiz/1");
  };
  console.log(answers)

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

      {/* Loading state */}
      {isLoading ? (
        <div className="flex justify-center items-center py-10">
          <div className="animate-spin border-t-4 border-blue-600 w-16 h-16 rounded-full"></div>
        </div>
      ) : (
        // Question List
        <div className="px-[16px] py-[32px]">
          <QuizQuestionsList
            onAnswerSubmit={onAnswerSubmit}
            handleAnswerChange={handleAnswerChange}
            questions={questions}
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
