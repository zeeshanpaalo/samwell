import React, { useState } from "react";
import Image from "next/image";
import {
  DndContext,
  DragEndEvent,
  useDraggable,
  useDroppable,
} from "@dnd-kit/core";

export type FillInTheBlankQuestion = {
  text: string;
  options: string[];
  blanks: number; // Number of blanks in the question
};

const DraggableItem: React.FC<{ id: string; children: React.ReactNode }> = ({
  id,
  children,
}) => {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({ id });
  const style = {
    transform: transform
      ? `translate3d(${transform.x}px, ${transform.y}px, 0)`
      : "none",
  };

  return (
    <div
      ref={setNodeRef}
      {...listeners}
      {...attributes}
      style={style}
      className="px-4 py-2 border rounded-md cursor-pointer shadow-md"
    >
      {children}
    </div>
  );
};

const DroppableArea: React.FC<{
  id: string;
  onDrop: (id: string) => void;
  children?: string;
}> = ({ id, onDrop, children }) => {
  const { setNodeRef } = useDroppable({ id });

  return (
    <span
      ref={setNodeRef}
      onClick={() => children && onDrop(children)} // Allow clicking to remove
      className="inline-block min-w-[80px] px-2 h-8 border-b-2 border-dashed border-gray-500 text-center align-middle bg-gray-100 cursor-pointer"
    >
      {children || "____"}
    </span>
  );
};

export const FillBlankQuestionComp: React.FC<{
  question: FillInTheBlankQuestion;
}> = ({ question }) => {
  const [availableOptions, setAvailableOptions] = useState(question.options);
  const [blanks, setBlanks] = useState(Array(question.blanks).fill(null));

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over) return;

    const draggedItem = active.id;
    const overId = over.id.toString();

    if (overId.startsWith("blank-")) {
      const dropIndex = parseInt(overId.replace("blank-", ""), 10);
      if (!isNaN(dropIndex) && !blanks[dropIndex]) {
        const newBlanks = [...blanks];
        newBlanks[dropIndex] = draggedItem;
        setBlanks(newBlanks);
        setAvailableOptions((prev) =>
          prev.filter((item) => item !== draggedItem)
        );
      }
    } else if (overId === "options-container") {
      // Dragging back to options
      setAvailableOptions((prev) => [...prev, `${draggedItem}`]);
      setBlanks((prev) => prev.map((b) => (b === draggedItem ? null : b)));
    }
  };

  const handleRemoveFromBlank = (id: string) => {
    setAvailableOptions((prev) => [...prev, id]);
    setBlanks((prev) => prev.map((b) => (b === id ? null : b)));
  };

  const renderedText = question.text.split("{BLANK}").map((part, index) => (
    <React.Fragment key={index}>
      {part}
      {index < blanks.length && (
        <DroppableArea id={`blank-${index}`} onDrop={handleRemoveFromBlank}>
          {blanks[index]}
        </DroppableArea>
      )}
    </React.Fragment>
  ));

  return (
    <div className="p-6 rounded-lg bg-white shadow-sm">
      <DndContext onDragEnd={handleDragEnd}>
        <div className="w-full mx-auto">
          <p className="font-semibold text-lg mb-4">{renderedText}</p>
          <div
            id="options-container"
            className="flex flex-wrap gap-3 p-3 rounded-lg"
          >
            {availableOptions.map((word) => (
              <DraggableItem key={word} id={word}>
                <div className="flex items-center">
                  <Image
                    src={"/assets/dragIcon.svg"}
                    alt={`Logo`}
                    width={10}
                    height={15}
                  />
                  <div className="ml-[15px]">{word}</div>
                </div>
              </DraggableItem>
            ))}
          </div>
        </div>
      </DndContext>
    </div>
  );
};
