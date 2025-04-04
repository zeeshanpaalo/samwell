import { AnyQuestion } from "@/components/quiz";

// Mock function to simulate fetching quiz data from an API
export const fetchQuizData = async (
  UserInput: string
): Promise<{ quizId: string; questions: AnyQuestion[] }> => {
  // Simulate an API delay with a timeout
  return new Promise((resolve: any) => {
    setTimeout(() => {
      resolve({
        quizId: "1",
        questions: [
          {
            id: "1",
            type: "SINGLE_CHOICE",
            text: "What is the powerhouse of the cell?",
            options: ["Nucleus", "Ribosome", "Mitochondria", "Golgi Apparatus"],
          },
          {
            id: "2",
            type: "MULTIPLE_ANSWER",
            text: "Which of the following are primary colors? (Select all that apply.)",
            options: ["Red", "Blue", "Yellow", "Green"],
          },
          {
            id: "3",
            type: "SINGLE_CHOICE",
            text: "The Great Wall of China is visible from space.",
            options: ["True", "False"],
          },
          {
            id: "4",
            type: "MATCHING",
            text: "Click a definition to match it with a term.",
            definitions: [
              "Process by which plants make their food.",
              "Type of cellular division.",
              "Movement of water across a membrane.",
              "Protein that speeds up chemical reactions.",
            ],
            terms: ["Photosynthesis", "Mitosis", "Osmosis", "Enzyme"],
          },
          {
            id: "5",
            type: "FILL_BLANK",
            text: "The main energy source for cells is which moves through semi-permeable membranes by the process of ____________ and enzymes act as biological ____________ to speed up chemical reactions.",
            options: ["COW", "FOX", "PIG", "DOG"],
          },
          {
            id: "6",
            type: "TEXT_RESPONSE",
            text: "Whats your thought on String theory?",
            options: [],
          },
        ],
      });
    }, 1000); // Simulate network delay
  });
};

export type QuizResults = {
  quizScore: number;
  correctAnswers: number;
  incorrectAnswers: number;
  totalTimeTaken: number; // in seconds
  averageTimePerQuestion: number; // in seconds
};

export const submitAnswers = (answers: {
  [questionId: string]: string[] | { [key: string]: string };
}): Promise<QuizResults> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const totalQuestions = Object.keys(answers).length;

      // Simulate scoring
      const correctAnswers = Math.floor(Math.random() * (totalQuestions + 1));
      const incorrectAnswers = totalQuestions - correctAnswers;
      const quizScore = Math.round((correctAnswers / totalQuestions) * 100);

      // Simulate time taken
      const totalTimeTaken = 72 + Math.floor(Math.random() * 300); // e.g., between 72s and 372s
      const averageTimePerQuestion =
        totalQuestions > 0 ? totalTimeTaken / totalQuestions : 0;

      const result: QuizResults = {
        quizScore,
        correctAnswers,
        incorrectAnswers,
        totalTimeTaken,
        averageTimePerQuestion: parseFloat(averageTimePerQuestion.toFixed(2)),
      };

      resolve(result);
    }, 1000);
  });
};

export const fetchQuizResultById = async (id: string): Promise<QuizResults> => {
  await new Promise((res) => setTimeout(res, 500)); // simulate delay
  return {
    quizScore: 40,
    correctAnswers: 4,
    incorrectAnswers: 6,
    totalTimeTaken: 1134,
    averageTimePerQuestion: 240,
  };
};
