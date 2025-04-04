import { useState } from "react";
import { MultipleChoiceQuestion } from ".";

export const MultipleAnswerQuestionComp: React.FC<{
  question: MultipleChoiceQuestion;
  handleAnswerChange: (questionId: string, selectedAnswers: string[]) => void;
}> = ({ question, handleAnswerChange }) => {
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);

  const handleSelection = (option: string) => {
    // Update the selectedOptions state first
    const newSelection = selectedOptions.includes(option)
      ? selectedOptions.filter((item) => item !== option) // Remove if already selected
      : [...selectedOptions, option]; // Add if not selected

    // Call handleAnswerChange outside of setSelectedOptions
    setSelectedOptions(newSelection);
    handleAnswerChange(question.id, newSelection); // Call this after state update
  };

  return (
    <div className="p-6 rounded-lg bg-white shadow-sm">
      <p className="font-semibold text-lg">{question.text}</p>
      <div className="grid grid-cols-2 gap-4 mt-4">
        {question.options.map((option, index) => (
          <label
            key={index}
            className="p-4 border rounded-lg text-left flex items-center cursor-pointer"
          >
            <input
              type="checkbox"
              className="mr-2"
              checked={selectedOptions.includes(option)}
              onChange={() => handleSelection(option)}
            />
            {option}
          </label>
        ))}
      </div>
      <p className="text-blue-600 text-sm text-center mt-4 cursor-pointer">
        Don’t know?
      </p>
    </div>
  );
};
