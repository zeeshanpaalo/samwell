import { useState } from "react";
import { SingleChoiceQuestion } from ".";

export const SingleChoiceQuestionComp: React.FC<{
  question: SingleChoiceQuestion;
  handleAnswerChange: (questionId: string, selectedAnswers: string[]) => void;
}> = ({ question, handleAnswerChange }) => {
  const [selected, setSelected] = useState<number | null>(null);

  const handleAnswer = (index: number, value: string) => {
    setSelected(index);
    handleAnswerChange(question.id, [`${value}`]);
  };

  return (
    <div className="p-6 rounded-lg bg-white shadow-sm w-full max-w-xxl">
      <p className="text-gray-500 text-sm">Question 1 of 10</p>
      <p className="font-semibold text-lg mt-2">{question.text}</p>
      <div className="grid grid-cols-2 gap-4 mt-4">
        {question.options.map((option, index) => (
          <label
            key={index}
            className={`flex items-center p-4 border rounded-lg w-full cursor-pointer transition-all ${
              selected === index
                ? "border-blue-500 bg-blue-50 text-blue-600"
                : "text-gray-700"
            }`}
          >
            <input
              type="radio"
              name="question"
              value={index}
              checked={selected === index}
              onChange={() => handleAnswer(index, option)}
              className="hidden"
            />
            <span
              className={`w-5 h-5 border-2 rounded-full flex items-center justify-center mr-2 ${
                selected === index ? "border-blue-500" : "border-gray-400"
              }`}
            >
              {selected === index && (
                <span className="w-3 h-3 bg-blue-500 rounded-full"></span>
              )}
            </span>
            {String.fromCharCode(65 + index)}) {option}
          </label>
        ))}
      </div>
      <p className="text-blue-600 text-sm text-center mt-4 cursor-pointer">
        Don’t know?
      </p>
    </div>
  );
};
