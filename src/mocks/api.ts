import { AnyQuestion } from "@/components/quiz";

// Mock function to simulate fetching quiz data from an API
export const fetchQuizData = async (UserInput: string): Promise<AnyQuestion[]> => {
  // Simulate an API delay with a timeout
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
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
      ]);
    }, 1000); // Simulate network delay
  });
};
