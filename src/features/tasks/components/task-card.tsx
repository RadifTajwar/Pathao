import { useState, useRef, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { CheckCircle, Circle, X } from "lucide-react";
import { Task } from "../types";
import { useKanbanStore } from "@/store/kanban-store";
import type { DraggableProvided, DraggableProvidedDragHandleProps, DraggableProvidedDraggableProps } from "@hello-pangea/dnd";

interface TaskCardProps {
  task: Task;
  innerRef: DraggableProvided['innerRef'];
  dragHandleProps?: DraggableProvidedDragHandleProps;
  draggableProps: DraggableProvidedDraggableProps;
  boardId: string;
}

const COLORS = [
  "bg-red-500",
  "bg-yellow-500",
  "bg-green-500",
  "bg-blue-500",
  "bg-purple-500",
  "bg-pink-500",
];

export const TaskCard = ({
  task,
  innerRef,
  dragHandleProps,
  draggableProps,
  boardId,
}: TaskCardProps) => {
  const toggleTaskDone = useKanbanStore((s) => s.toggleTaskDone);
  const updateTaskContent = useKanbanStore((s) => s.updateTaskContent);
  const updateLabelColor = useKanbanStore((s) => s.updateTaskLabelColor);
  const deleteTask = useKanbanStore((s) => s.deleteTask);

  const [editing, setEditing] = useState(false);
  const [value, setValue] = useState(task.content);
  const [showColorPicker, setShowColorPicker] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);

  useEffect(() => {
    if (editing && textareaRef.current) {
      const el = textareaRef.current;
      el.style.height = "auto";
      el.style.height = `${el.scrollHeight}px`;

      const length = el.value.length;
      el.setSelectionRange(length, length);
      el.focus();
    }
  }, [editing]);

  const handleSave = () => {
    if (value.trim() && value !== task.content) {
      updateTaskContent(boardId,task.id, value.trim());
    }
    setEditing(false);
  };

  const handleColorChange = (color: string) => {
    updateLabelColor(boardId,task.id, color);
    setShowColorPicker(false);
  };

  return (
    <Card
      ref={innerRef}
      {...dragHandleProps}
      {...draggableProps}
      className="p-3 flex items-start justify-between relative"
    >
      <div className="flex items-start gap-2 w-full">
        <button onClick={() => toggleTaskDone(boardId,task.id)} className="mt-1">
          {task.done ? (
            <CheckCircle className="text-green-500 w-4 h-4" />
          ) : (
            <Circle className="text-gray-400 w-4 h-4" />
          )}
        </button>

        <div className="flex-1 w-full overflow-hidden min-h-[40px]">
          {task.labelColor && (
            <div
              className={`w-6 h-1.5 rounded-full ${task.labelColor} mb-1 cursor-pointer`}
              onClick={() => setShowColorPicker((prev) => !prev)}
            />
          )}

          {editing ? (
            <textarea
              ref={textareaRef}
              value={value}
              onChange={(e) => {
                setValue(e.target.value);
                if (textareaRef.current) {
                  textareaRef.current.style.height = "auto";
                  textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
                }
              }}
              onBlur={handleSave}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  handleSave();
                } else if (e.key === "Escape") {
                  setValue(task.content);
                  setEditing(false);
                }
              }}
              className="w-full resize-none text-sm p-1 outline-none bg-transparent break-words whitespace-pre-wrap"
              rows={1}
              autoFocus
            />
          ) : (
            <div
              className="text-sm font-medium cursor-text break-words overflow-hidden whitespace-pre-wrap"
              onClick={() => setEditing(true)}
            >
              {task.content}
            </div>
          )}
        </div>

        {task.done && (
          <button
            onClick={() => deleteTask(boardId,task.id)}
            className="ml-2 text-gray-400 hover:text-red-500"
            title="Delete task"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>

      {showColorPicker && (
        <div className="absolute top-10 left-8 z-10 bg-white border rounded p-2 shadow flex gap-1">
          {COLORS.map((color) => (
            <div
              key={color}
              className={`w-4 h-4 rounded-full cursor-pointer ${color}`}
              onClick={() => handleColorChange(color)}
            />
          ))}
        </div>
      )}
    </Card>
  );
};
