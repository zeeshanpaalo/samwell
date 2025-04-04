import React from "react";
import { SingleChoiceQuestionComp } from "./SingleChoice";
import { MultipleAnswerQuestionComp } from "./MultipleChoice";
import { FillBlankQuestionComp } from "./FillBlanks";
import { TextResponseQuestionComp } from "./TextResponse";
import { MatchingQuestionComp } from "./MatchQuestion";

const QUESTION_TYPES = {
  SINGLE_CHOICE: "SINGLE_CHOICE",
  MULTIPLE_ANSWER: "MULTIPLE_ANSWER",
  FILL_BLANK: "FILL_BLANK",
  TEXT_RESPONSE: "TEXT_RESPONSE",
  MATCHING: "MATCHING",
};

export type Question = {
  id: string;
  type: string;
  text: string;
};

// Single choice question type or True false
export interface SingleChoiceQuestion extends Question {
  options: string[];
}

// Multiple choice question type
export interface MultipleChoiceQuestion extends Question {
  options: string[];
  correctAnswer: string[]; // can be multiple
}

// Matching question type
export interface MatchingQuestion extends Question {
  definitions: string[];
  terms: string[];
}

// Fill in the blank question type
export interface FillInTheBlankQuestion extends Question {
  options: string[];
  blanks: number;
}

// Short answer question type
export interface ShortAnswerQuestion extends Question {
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
      <FillBlankQuestionComp
        question={question as FillInTheBlankQuestion}
        handleAnswerChange={handleAnswerChange}
      />
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
