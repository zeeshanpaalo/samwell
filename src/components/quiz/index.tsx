import React, { useState } from "react";

const QUESTION_TYPES = {
  SINGLE_CHOICE: "SINGLE_CHOICE",
  MULTIPLE_ANSWER: "MULTIPLE_ANSWER",
  FILL_BLANK: "FILL_BLANK",
  TEXT_RESPONSE: "TEXT_RESPONSE",
  MATCHING: "MATCHING",
};

type Question = {
  type: string;
  text: string;
  options: string[];
  pairs: string[];
};

interface QuestionProps {
  question: Question;
}

interface QuizQuestionsListProps {
  questions: Question[];
}

const SingleChoiceQuestion: React.FC<QuestionProps> = ({ question }) => {
  const [selected, setSelected] = useState<number | null>(null);

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
              onChange={() => setSelected(index)}
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

const MultipleAnswerQuestion: React.FC<QuestionProps> = ({ question }) => (
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

const FillBlankQuestion: React.FC<QuestionProps> = ({ question }) => (
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

const TextResponseQuestion: React.FC<QuestionProps> = ({ question }) => (
  <div className="p-6 rounded-lg bg-white shadow-sm">
    <p className="font-semibold text-lg">{question.text}</p>
    <textarea
      className="w-full px-4 py-3 mt-4 border rounded-lg"
      rows={1}
      placeholder="Type your response..."
    ></textarea>
  </div>
);

const MatchingQuestion: React.FC<QuestionProps> = ({ question }) => (
  <div className="p-6 rounded-lg bg-white shadow-sm">
    <p className="font-semibold text-lg">{question.text}</p>
    <div className="mt-4 space-y-2">
      {question.pairs.map((pair, index) => (
        <div
          key={index}
          className="flex justify-between items-center p-4 border rounded-lg"
        >
          <span>{pair}</span>
          <button className="px-4 py-2 border rounded-lg bg-white">
            Select from list
          </button>
        </div>
      ))}
    </div>
  </div>
);

const QuestionRenderer: React.FC<QuestionProps> = ({ question }) => {
  const components = {
    [QUESTION_TYPES.SINGLE_CHOICE]: SingleChoiceQuestion,
    [QUESTION_TYPES.MULTIPLE_ANSWER]: MultipleAnswerQuestion,
    [QUESTION_TYPES.FILL_BLANK]: FillBlankQuestion,
    [QUESTION_TYPES.TEXT_RESPONSE]: TextResponseQuestion,
    [QUESTION_TYPES.MATCHING]: MatchingQuestion,
  };

  const Component =
    components[question.type] || (() => <div>Unsupported question type</div>);

  return <Component question={question} />;
};

const QuizQuestionsList: React.FC<QuizQuestionsListProps> = ({ questions }) => {
  return (
    <div className="space-y-6 px-[25px]">
      {questions.map((question, index) => (
        <QuestionRenderer key={index} question={question} />
      ))}
    </div>
  );
};

export default QuizQuestionsList;
