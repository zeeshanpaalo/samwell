import React, { useState } from "react";
import {
  DndContext,
  useDraggable,
  useDroppable,
  DragEndEvent,
} from "@dnd-kit/core";

const QUESTION_TYPES = {
  SINGLE_CHOICE: "SINGLE_CHOICE",
  MULTIPLE_ANSWER: "MULTIPLE_ANSWER",
  FILL_BLANK: "FILL_BLANK",
  TEXT_RESPONSE: "TEXT_RESPONSE",
  MATCHING: "MATCHING",
};

type Question = {
  id: string;
  type: string;
  text: string;
};

// Single choice question type or True false
interface SingleChoiceQuestion extends Question {
  options: string[];
  //   correctAnswer: string;
}

// Multiple choice question type
interface MultipleChoiceQuestion extends Question {
  options: string[];
  correctAnswer: string[]; // can be multiple
}

// Matching question type
interface MatchingQuestion extends Question {
  definitions: string[];
  terms: string[];
  //   correctPairs: { [key: string]: string };
}

// Fill in the blank question type
interface FillInTheBlankQuestion extends Question {
  options: string[];
  //   correctAnswer: string;
}

// Short answer question type
interface ShortAnswerQuestion extends Question {
  //   correctAnswer: string;
}

// Union type to represent all possible questions
export type AnyQuestion =
  | SingleChoiceQuestion
  | MultipleChoiceQuestion
  | MatchingQuestion
  | FillInTheBlankQuestion
  | ShortAnswerQuestion;

interface QuestionProps {
  question: AnyQuestion;
  handleAnswerChange: (questionId: string, selectedAnswers: string[]) => void;
  onAnswerSubmit: (
    questionId: string,
    selectedAnswers: { [key: string]: string }
  ) => void;
}

interface QuizQuestionsListProps {
  onAnswerSubmit: (
    questionId: string,
    selectedAnswers: { [key: string]: string }
  ) => void;
  handleAnswerChange: (questionId: string, selectedAnswers: string[]) => void;
  questions: AnyQuestion[];
}

const SingleChoiceQuestionComp: React.FC<{
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

const MultipleAnswerQuestionComp: React.FC<{
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
      handleAnswerChange(question.id, newSelection);  // Call this after state update
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

const FillBlankQuestionComp: React.FC<{ question: FillInTheBlankQuestion }> = ({
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

const TextResponseQuestionComp: React.FC<{
  question: ShortAnswerQuestion;
  handleAnswerChange: (questionId: string, selectedAnswers: string[]) => void;
}> = ({ question, handleAnswerChange }) => {
  const handleAnswer = (value: string) => {
    handleAnswerChange(question.id, [`${value}`]);
  };
  return (
    <div className="p-6 rounded-lg bg-white shadow-sm">
      <p className="font-semibold text-lg">{question.text}</p>
      <textarea
        className="w-full px-4 py-3 mt-4 border rounded-lg"
        rows={1}
        placeholder="Type your response..."
        onChange={(e) => handleAnswer(e.target.value)}
      ></textarea>
    </div>
  );
};

const DraggableTerm: React.FC<{ id: string; children: React.ReactNode }> = ({
  id,
  children,
}) => {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({ id });

  return (
    <div
      ref={setNodeRef}
      {...listeners}
      {...attributes}
      className="px-4 py-2 border rounded-lg bg-gray-100 cursor-pointer"
      style={{
        transform: transform
          ? `translate(${transform.x}px, ${transform.y}px)`
          : undefined,
      }}
    >
      {children}
    </div>
  );
};

const DroppableArea: React.FC<{ id: string; selectedTerm?: string }> = ({
  id,
  selectedTerm,
}) => {
  const { setNodeRef } = useDroppable({ id });

  return (
    <div
      ref={setNodeRef}
      className="px-4 py-2 border-2 border-dashed rounded-lg w-48 text-center min-h-[40px] flex items-center justify-center"
    >
      {selectedTerm ? (
        <DraggableTerm id={selectedTerm}>{selectedTerm}</DraggableTerm>
      ) : (
        "Select From list below"
      )}
    </div>
  );
};

const MatchingQuestionComp: React.FC<{
  question: MatchingQuestion;
  onAnswerSubmit: (
    questionId: string,
    selectedAnswers: { [key: string]: string }
  ) => void;
}> = ({ question, onAnswerSubmit }) => {
  const [selectedAnswers, setSelectedAnswers] = useState<{
    [key: string]: string;
  }>({});
//   const [options, setOptions] = useState(question.terms);

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over) return;

    const draggedItem = String(active.id);
    const dropTarget = String(over.id);

    // Remove dragged item from its previous definition (if any)
    const updatedAnswers: { [key: string]: string } = {};
    Object.entries(selectedAnswers).forEach(([def, term]) => {
      if (term !== draggedItem) {
        updatedAnswers[def] = term;
      }
    });

    // Assign dragged item to new drop target
    updatedAnswers[dropTarget] = draggedItem;

    setSelectedAnswers(updatedAnswers);
    onAnswerSubmit(question.id, updatedAnswers);
  };

  return (
    <div className="p-6 rounded-lg bg-white shadow-sm">
      <p className="font-semibold text-lg">{question.text}</p>

      <DndContext onDragEnd={handleDragEnd}>
        <div className="mt-4 space-y-4">
          {question.definitions.map((definition, index) => (
            <div
              key={index}
              className="flex justify-between items-center p-4 border rounded-lg"
            >
              <span>{definition}</span>
              <DroppableArea
                id={definition}
                selectedTerm={selectedAnswers[definition]}
              />
            </div>
          ))}
        </div>

        <div className="mt-6 flex gap-2 flex-wrap">
          {question.terms
            .filter((term) => !Object.values(selectedAnswers).includes(term))
            .map((term) => (
              <DraggableTerm key={term} id={term}>
                {term}
              </DraggableTerm>
            ))}
        </div>
      </DndContext>
    </div>
  );
};

const QuestionRenderer: React.FC<QuestionProps> = ({
  question,
  handleAnswerChange,
  onAnswerSubmit,
}) => {
  if (question.type === QUESTION_TYPES.SINGLE_CHOICE) {
    return (
      <SingleChoiceQuestionComp
        question={question as SingleChoiceQuestion}
        handleAnswerChange={handleAnswerChange}
      />
    );
  }
  if (question.type === QUESTION_TYPES.MULTIPLE_ANSWER) {
    return (
      <MultipleAnswerQuestionComp
        question={question as MultipleChoiceQuestion}
        handleAnswerChange={handleAnswerChange}
      />
    );
  }
  if (question.type === QUESTION_TYPES.FILL_BLANK) {
    return (
      <FillBlankQuestionComp question={question as FillInTheBlankQuestion} />
    );
  }
  if (question.type === QUESTION_TYPES.TEXT_RESPONSE) {
    return (
      <TextResponseQuestionComp
        question={question as ShortAnswerQuestion}
        handleAnswerChange={handleAnswerChange}
      />
    );
  }
  if (question.type === QUESTION_TYPES.MATCHING) {
    return (
      <MatchingQuestionComp
        question={question as MatchingQuestion}
        onAnswerSubmit={onAnswerSubmit}
      />
    );
  }

  return <div>Unsupported question type</div>;
};

const QuizQuestionsList: React.FC<QuizQuestionsListProps> = ({
  questions,
  handleAnswerChange,
  onAnswerSubmit,
}) => {
  return (
    <div className="space-y-6 px-[25px]">
      {questions.map((question, index) => (
        <QuestionRenderer
          key={index}
          question={question}
          handleAnswerChange={handleAnswerChange}
          onAnswerSubmit={onAnswerSubmit}
        />
      ))}
    </div>
  );
};

export default QuizQuestionsList;
