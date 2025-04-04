import { FillInTheBlankQuestion } from ".";

export const FillBlankQuestionComp: React.FC<{ question: FillInTheBlankQuestion }> = ({
  question,
}) => (
  <div className="p-6 rounded-lg bg-white shadow-sm">
    <p className="font-semibold text-lg">{question.text}</p>
    <div className="grid grid-cols-2 gap-4 mt-4">
      {question.options.map((option, index) => (
        <label
          key={index}
          className="p-4 border rounded-lg text-left flex items-center cursor-pointer"
        >
          <input type="checkbox" className="mr-2" />
          {option}
        </label>
      ))}
    </div>
  </div>
);
