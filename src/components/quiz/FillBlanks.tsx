import React, { useState } from "react";
import {
  DndContext,
  DragEndEvent,
  useDraggable,
  useDroppable,
} from "@dnd-kit/core";
import { FillInTheBlankQuestion } from ".";
const DraggableItem: React.FC<{ id: string; children: React.ReactNode }> = ({
  id,
  children,
}) => {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({ id });
  const style = transform
    ? { transform: `translate3d(${transform.x}px, ${transform.y}px, 0)` }
    : {};

  return (
    <div
      ref={setNodeRef}
      {...listeners}
      {...attributes}
      style={style}
      className="px-4 py-2 bg-blue-500 text-white rounded-md cursor-pointer"
    >
      {children}
    </div>
  );
};
const DroppableArea: React.FC<{ id: string; children?: string }> = ({
  id,
  children,
}) => {
  const { setNodeRef } = useDroppable({ id });

  return (
    <span
      ref={setNodeRef}
      className="inline-block min-w-[50px] h-6 border-b-2 border-dashed border-gray-400 align-middle"
    >
      {children || "____"}
    </span>
  );
};

export const FillBlankQuestionComp: React.FC<{
  question: FillInTheBlankQuestion;
}> = ({ question }) => {
  const [answers, setAnswers] = useState(question.options);
  const [blanks, setBlanks] = useState(
    Array(question.blanks.length).fill(null)
  );

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over) return;

    const draggedItem = active.id;
    // const dropIndex = parseInt(over.id.replace("blank-", ""));
    const dropIndex = parseInt(`${over.id}`);

    if (!isNaN(dropIndex)) {
      const newBlanks = [...blanks];
      newBlanks[dropIndex] = draggedItem;
      setBlanks(newBlanks);
      setAnswers((prev) => prev.filter((item) => item !== draggedItem));
    }
  };

  const renderedText = question.text.split("{BLANK}").map((part, index) => (
    <React.Fragment key={index}>
      {part}
      {index < blanks.length && (
        <DroppableArea id={`blank-${index}`}>
          {blanks[index] && (
            <DraggableItem id={blanks[index]}>{blanks[index]}</DraggableItem>
          )}
        </DroppableArea>
      )}
    </React.Fragment>
  ));

  return (
    <DndContext onDragEnd={handleDragEnd}>
      <div className="p-6 bg-white rounded-lg shadow-md w-full max-w-2xl">
        <p className="font-semibold text-lg mb-4">{renderedText}</p>
        <div className="flex flex-wrap gap-2">
          {answers.map((word) => (
            <DraggableItem key={word} id={word}>
              {word}
            </DraggableItem>
          ))}
        </div>
      </div>
    </DndContext>
  );
};
