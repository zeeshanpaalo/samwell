"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import QuizQuestionsList from "@/components/quiz";

const StartQuiz: React.FC = () => {
  const router = useRouter();
  const [answers, setAnswers] = useState<{
    [key: string]: string[] | { [key: string]: string };
  }>({});

  const handleAnswerChange = (
    questionId: string,
    selectedAnswers: string[]
  ) => {
    setAnswers((prev) => ({ ...prev, [questionId]: selectedAnswers }));
  };
  console.log(answers);

  const onAnswerSubmit = (
    questionId: string,
    selectedAnswers: { [key: string]: string }
  ) => {
    setAnswers((prev) => ({ ...prev, [questionId]: selectedAnswers }));
  };

  const handleSubmit = () => {
    router.push("/dashboard/quiz/1");
  };
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
        <QuizQuestionsList
          onAnswerSubmit={onAnswerSubmit}
          handleAnswerChange={handleAnswerChange}
          questions={[
            {
              id: "1",
              type: "SINGLE_CHOICE",
              text: "What is the powerhouse of the cell?",
              options: [
                "Nucleus",
                "Ribosome",
                "Mitochondria",
                "Golgi Apparatus",
              ],
              // correctAnswer: ""
            },
            {
              id: "2",
              type: "MULTIPLE_ANSWER",
              text: "Which of the following are primary colors? (Select all that apply.)",
              options: ["Red", "Blue", "Yellow", "Green"],
              // pairs: [],
            },
            {
              id: "3",
              type: "SINGLE_CHOICE",
              text: "The Great Wall of China is visible from space.",
              options: ["True", "False"],
              // pairs: [],
            },
            {
              id: "4",
              type: "MATCHING",
              text: "Click a definition to match it with a term.",
              definitions: ["dsfsdf", "dsfdf", "dfd", "dfffd"],
              terms: ["COW", "FOX", "PIG", "DOG"],
            },
            {
              id: "5",
              type: "FILL_BLANK",
              text: "The main energy source for cells is  which moves through semi-permeable membranes by the process of ____________ and enzymes act as biological ____________ to speed up chemical reactions.",
              options: ["COW", "FOX", "PIG", "DOG"],
              // pairs: [],
            },
            {
              id: "6",
              type: "TEXT_RESPONSE",
              text: "Whats your thought on String theory?",
              options: [],
              // pairs: [],
            },
          ]}
        />
      </div>

      {/* Submit Button */}
      <div className="flex justify-end px-[16px] py-4">
        <button
          className="bg-[#2A76F6] text-white px-6 py-2 rounded-[59px] shadow hover:bg-blue-700 w-[174px] h-[50px]"
          onClick={handleSubmit}
        >
          Complete
        </button>
      </div>
    </div>
  );
};

export default StartQuiz;
