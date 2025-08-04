"use client";

import { useEffect, useState } from "react";
import { Plus } from "lucide-react";
import { DragDropContext, DropResult } from "@hello-pangea/dnd";
import { ColumnCard } from "./column";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useKanbanStore } from "@/store/kanban-store";

interface KanbanBoardProps {
  boardId: string;
}

export const KanbanBoard = ({ boardId }: KanbanBoardProps) => {
  const boardData = useKanbanStore((s) =>
    s.boards.find((b) => b.board.id === boardId)
  );
  const moveTask = useKanbanStore((s) => s.moveTask);
  const addColumn = useKanbanStore((s) => s.addColumn);

  const [newColumnTitle, setNewColumnTitle] = useState("");

  const onDragEnd = (result: DropResult) => {
    const { destination, source, draggableId } = result;
    if (!destination) return;

    moveTask(boardId, source.droppableId, destination.droppableId, source.index, destination.index, draggableId);
  };

  const handleAddColumn = () => {
    if (!newColumnTitle.trim()) return;
    addColumn(boardId, newColumnTitle.trim());
    setNewColumnTitle("");
  };

  useEffect(()=>{
    console.log("boardData",boardData)
  })

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      
      <div className="w-full px-4 py-4 " >
        <div className="flex gap-4 w-fit min-w-full items-start">
          {boardData?.columnOrder.map((colId) => (
            <ColumnCard
              key={colId}
              boardId={boardId}
              column={boardData.columns[colId]}
              tasks={boardData.columns[colId].taskIds.map((id) => boardData.tasks[id])}
            />
          ))}

          <div className="w-64 min-w-[16rem] bg-gray-100/30 rounded-md h-fit px-4 py-6 space-y-2 mr-4">
            <Input
              placeholder="New list title"
              value={newColumnTitle}
              onChange={(e) => setNewColumnTitle(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleAddColumn()}
              className="placeholder:text-white"
            />
            <Button
              onClick={handleAddColumn}
              variant="ghost"
              className="w-full justify-start"
            >
              <Plus className="h-4 w-4 mr-2" /> Add another list
            </Button>
          </div>
        </div>
      </div>
    </DragDropContext>
  );
};

