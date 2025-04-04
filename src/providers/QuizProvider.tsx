// context/QuizContext.tsx
"use client";

import React, { createContext, useContext, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { QuizResults, fetchQuizData, submitAnswers } from "@/mocks/api";
import { AnyQuestion } from "@/components/quiz";

type AnswersMap = {
  [questionId: string]: string[] | { [key: string]: string };
};

interface QuizContextType {
  topic: string;
  setTopic: (topic: string) => void;

  questions: AnyQuestion[];
  isLoading: boolean;

  answers: AnswersMap;
  result: QuizResults | null;

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
  const [questions, setQuestions] = useState<AnyQuestion[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [answers, setAnswers] = useState<AnswersMap>({});
  const [result, setResult] = useState<QuizResults | null>(null);

  const fetchAndSetQuestions = useCallback(async (topic: string) => {
    setIsLoading(true);
    setTopic(topic);
    const data = await fetchQuizData(topic);
    setQuestions(data);
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
        setResult(res); // Store result for use elsewhere
        console.log("Quiz Result:", res);
        router.push("/dashboard/quiz/1");
      })
      .catch((err) => console.error("Error submitting quiz:", err));
  }, [answers, router]);

  return (
    <QuizContext.Provider
      value={{
        topic,
        setTopic,
        questions,
        isLoading,
        answers,
        result,
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
