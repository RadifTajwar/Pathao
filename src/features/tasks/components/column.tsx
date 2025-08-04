"use client";
import { FiTrash2 } from "react-icons/fi";

import { useState, useRef, useEffect } from "react";
import { Droppable, Draggable } from "@hello-pangea/dnd";
import { TaskCard } from "./task-card";
import { Button } from "@/components/ui/button";
import { Column, Task } from "../types";
import { useKanbanStore } from "@/store/kanban-store";

interface ColumnProps {
  column: Column;
  boardId: string;
  tasks: Task[];
}

export const ColumnCard = ({ column, tasks, boardId }: ColumnProps) => {
  const [taskInput, setTaskInput] = useState("");
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);
  const [editingTitle, setEditingTitle] = useState(false);
  const [columnTitle, setColumnTitle] = useState(column.title);



  const updateColumnTitle = useKanbanStore((s) => s.updateColumnTitle);
  const deleteColumn = useKanbanStore((s) => s.deleteColumn);
  const addTask = useKanbanStore((state) => state.addTask);

  const handleAddTask = () => {
    if (!taskInput.trim()) return;
    addTask(boardId, column.id, taskInput.trim());
    setTaskInput("");
  };

  const handleTitleSave = () => {
    if (columnTitle.trim()) {
      updateColumnTitle(boardId, column.id, columnTitle.trim());
    }
    setEditingTitle(false);
  };

  useEffect(() => {
    if (editingTitle && textareaRef.current) {
      const el = textareaRef.current;
      el.style.height = "auto";
      el.style.height = `${el.scrollHeight}px`;

      const length = el.value.length;
      el.setSelectionRange(length, length);
      el.focus();
    }
  }, [editingTitle]);

  return (
    <div className="bg-white rounded-md shadow-md w-64 p-4 mb-10 ">

      <div className="flex justify-between">
        {editingTitle ? (
          <textarea
            ref={textareaRef}
            value={columnTitle}
            onChange={(e) => {
              setColumnTitle(e.target.value);
              if (textareaRef.current) {
                textareaRef.current.style.height = "auto";
                textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
              }
            }}
            onBlur={handleTitleSave}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                handleTitleSave();
              } else if (e.key === "Escape") {
                setColumnTitle(column.title);
                setEditingTitle(false);
              }
            }}
            rows={1}
            autoFocus
            className="w-full resize-none text-sm p-1 outline-none bg-transparent break-words whitespace-pre-wrap"
          />
        ) : (
          <div
            className="text-sm font-medium cursor-text break-words overflow-hidden whitespace-pre-wrap"
            onClick={() => setEditingTitle(true)}
          >
            {column.title}
          </div>
        )}
        <button
          onClick={() => deleteColumn(boardId, column.id)}
          className="text-red-500 hover:text-red-600 transition"
          title="Delete column"
        >
          <FiTrash2 className="w-4 h-4" />
        </button>
      </div>

      <Droppable droppableId={column.id}>
        {(provided) => (
          <div
            {...provided.droppableProps}
            ref={provided.innerRef}
            className="space-y-2 min-h-[60px]"
          >
            {tasks.map((task, idx) => (
              <Draggable key={task.id} draggableId={task.id} index={idx}>
                {(provided) => (
                  <TaskCard
                    boardId={boardId}
                    task={task}
                    innerRef={provided.innerRef}
                    dragHandleProps={provided.dragHandleProps ?? undefined}
                    draggableProps={provided.draggableProps}
                  />
                )}
              </Draggable>
            ))}
            {provided.placeholder}

            <div className="pt-2">
              <textarea
                ref={textareaRef}
                placeholder="Add a card"
                value={taskInput}
                onChange={(e) => setTaskInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault();
                    handleAddTask();
                  }
                }}
                rows={1}
                className=" w-full resize-none rounded border text-sm p-2 outline-none overflow-hidden break-words whitespace-pre-wrap"
              />
              <Button
                variant="ghost"
                size="sm"
                className="w-full mt-2"
                onClick={handleAddTask}
              >
                Add card
              </Button>
            </div>
          </div>
        )}
      </Droppable>
    </div>
  );
};
