import { ShortAnswerQuestion } from ".";

export const TextResponseQuestionComp: React.FC<{
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