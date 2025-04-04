import {
  DndContext,
  DragEndEvent,
  useDraggable,
  useDroppable,
} from "@dnd-kit/core";
import { MatchingQuestion } from ".";
import { useState } from "react";

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

export const MatchingQuestionComp: React.FC<{
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
