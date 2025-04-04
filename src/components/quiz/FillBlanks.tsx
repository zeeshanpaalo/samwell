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
  blanks: number;
};

const DraggableItem: React.FC<{
  id: string;
  children: React.ReactNode;
}> = ({ id, children }) => {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({ id });
  const style = {
    transform: transform
      ? `translate3d(${transform.x}px, ${transform.y}px, 0)`
      : "none",
    zIndex: 50,
  };

  return (
    <div
      ref={setNodeRef}
      {...listeners}
      {...attributes}
      style={style}
      className="px-4 py-2 border rounded-md cursor-pointer shadow-md bg-white"
    >
      {children}
    </div>
  );
};

const DroppableArea: React.FC<{
  id: string;
  onDrop: (blankId: string, value?: string) => void;
  value?: string;
}> = ({ id, onDrop, value }) => {
  const { setNodeRef } = useDroppable({ id });

  return (
    <span
      ref={setNodeRef}
      onClick={() => value && onDrop(id, value)}
      className="inline-block min-w-[80px] px-2 h-8 border-b-2 border-dashed border-gray-500 text-center align-middle bg-gray-100 cursor-pointer"
    >
      {value || "____"}
    </span>
  );
};

export const FillBlankQuestionComp: React.FC<{
  question: FillInTheBlankQuestion;
}> = ({ question }) => {
  const [availableOptions, setAvailableOptions] = useState<string[]>(
    question.options
  );
  const [blanks, setBlanks] = useState<(string | null)[]>(
    Array(question.blanks).fill(null)
  );

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over) return;

    const draggedId = active.id.toString();
    const overId = over.id.toString();

    if (overId.startsWith("blank-")) {
      const index = parseInt(overId.split("-")[1], 10);
      setBlanks((prev) => {
        const oldValue = prev[index];
        const newBlanks = [...prev];
        newBlanks[index] = draggedId;
        return newBlanks;
      });

      setAvailableOptions((prev) => {
        const withRemoved = prev.filter((opt) => opt !== draggedId);
        if (blanks[index]) {
          // Return previous item in that blank back to options
          withRemoved.push(blanks[index]!);
        }
        return withRemoved;
      });
    } else if (overId === "options-container") {
      // Dragging back to options
      setAvailableOptions((prev) =>
        prev.includes(draggedId) ? prev : [...prev, draggedId]
      );
      setBlanks((prev) => prev.map((val) => (val === draggedId ? null : val)));
    }
  };

  const handleRemoveFromBlank = (blankId: string, value?: string) => {
    const index = parseInt(blankId.split("-")[1], 10);
    setBlanks((prev) => {
      const newBlanks = [...prev];
      newBlanks[index] = null;
      return newBlanks;
    });
    setAvailableOptions((prev) => [...prev, value!]);
  };

  const renderedText = question.text.split("{BLANK}").map((part, index) => (
    <React.Fragment key={index}>
      {part}
      {index < blanks.length && (
        <DroppableArea
          id={`blank-${index}`}
          onDrop={handleRemoveFromBlank}
          value={blanks[index] || undefined}
        />
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
            className="flex flex-wrap gap-3 p-3 rounded-lg border bg-gray-50"
          >
            {availableOptions.map((word) => (
              <DraggableItem key={word} id={word}>
                <div className="flex items-center">
                  <Image
                    src={"/assets/dragIcon.svg"}
                    alt="Drag"
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
