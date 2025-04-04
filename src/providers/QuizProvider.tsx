// context/QuizContext.tsx
"use client";

import React, { createContext, useContext, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import {
  QuizResults,
  fetchQuizData,
  fetchQuizResultById,
  submitAnswers,
} from "@/mocks/api";
import { AnyQuestion } from "@/components/quiz";

type AnswersMap = {
  [questionId: string]: string[] | { [key: string]: string };
};

interface QuizContextType {
  topic: string;
  setTopic: (topic: string) => void;

  quizId: string;
  setQuizId: (quizId: string) => void;

  questions: AnyQuestion[];
  isLoading: boolean;

  answers: AnswersMap;
  result: QuizResults | null;
  fetchResultById: (id: string) => Promise<void>;

  handleAnswerChange: (questionId: string, selected: string[]) => void;
  onAnswerSubmit: (
    questionId: string,
    selected: { [key: string]: string }
  ) => void;

  fetchAndSetQuestions: (topic: string) => Promise<void>;
  handleSubmit: () => void;
}

const QuizContext = createContext<QuizContextType | undefined>(undefined);

export const QuizProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const router = useRouter();
  const [topic, setTopic] = useState("");
  const [quizId, setQuizId] = useState("");
  const [questions, setQuestions] = useState<AnyQuestion[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [answers, setAnswers] = useState<AnswersMap>({});
  const [result, setResult] = useState<QuizResults | null>(null);

  const fetchAndSetQuestions = useCallback(async (topic: string) => {
    setIsLoading(true);
    setTopic(topic);
    const data = await fetchQuizData(topic);
    setQuestions(data.questions);
    setQuizId(data.quizId);
    setIsLoading(false);
  }, []);

  const handleAnswerChange = useCallback(
    (questionId: string, selected: string[]) => {
      setAnswers((prev) => ({ ...prev, [questionId]: selected }));
    },
    []
  );

  const onAnswerSubmit = useCallback(
    (questionId: string, selected: { [key: string]: string }) => {
      setAnswers((prev) => ({ ...prev, [questionId]: selected }));
    },
    []
  );

  const handleSubmit = useCallback(() => {
    submitAnswers(answers)
      .then((res: QuizResults) => {
        setResult(res);
        router.push(`/dashboard/quiz/${quizId}`);
      })
      .catch((err) => console.error("Error submitting quiz:", err));
  }, [answers, router]);

  const fetchResultById = useCallback(async (id: string) => {
    const data = await fetchQuizResultById(id);
    setResult(data);
  }, []);

  return (
    <QuizContext.Provider
      value={{
        topic,
        setTopic,
        quizId,
        setQuizId,
        questions,
        isLoading,
        answers,
        result,
        fetchResultById,
        fetchAndSetQuestions,
        handleAnswerChange,
        onAnswerSubmit,
        handleSubmit,
      }}
    >
      {children}
    </QuizContext.Provider>
  );
};

export const useQuizContext = () => {
  const ctx = useContext(QuizContext);
  if (!ctx) throw new Error("useQuizContext must be used within QuizProvider");
  return ctx;
};
