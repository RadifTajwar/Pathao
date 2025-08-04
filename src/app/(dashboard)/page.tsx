"use client";

import { useEffect, useState } from "react";

import { AllBoards, BoardType } from "@/features/boards/components/all-boards";
import {
  getBoards,
  addBoardLS,
  deleteBoardLS,
  updateBoardLS,
} from "@/lib/local-storage";

export default function HomePage() {
 
  const [boards, setBoards] = useState<BoardType[]>([]);

  
  useEffect(() => {
    const stored = getBoards();
    setBoards(stored);
  }, []);


  const addBoard = (newBoard: BoardType) => {
    const updated = addBoardLS(newBoard);
    setBoards(updated);
  };


  const deleteBoard = (id: string) => {
    const updated = deleteBoardLS(id);
    setBoards(updated);
  };

 
  const updateBoard = (updatedBoard: BoardType) => {
    const updated = updateBoardLS(updatedBoard);
    setBoards(updated);
  };

  return (
    <div className="space-y-10 py-8">
      <AllBoards
        onCreate={addBoard}
        boards={boards}
        onDelete={deleteBoard}
        onEdit={(id) => {
          const existing = boards.find((b) => b.id === id);
          if (!existing) return;

          const newTitle = prompt("Enter new board title", existing.title);
          if (newTitle && newTitle !== existing.title) {
            updateBoard({ ...existing, title: newTitle });
          }
        }}
      />
      
    </div>
  );
}
