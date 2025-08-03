"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { CreateBoardForm } from "@/features/boards/components/create-board-form";
import { AllBoards, BoardType } from "@/features/boards/components/all-boards";
import {
  getBoards,
  addBoardLS,
  deleteBoardLS,
  updateBoardLS,
} from "@/lib/local-storage";

export default function HomePage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  const [boards, setBoards] = useState<BoardType[]>([]);

  // Load initial boards from localStorage
  useEffect(() => {
    const stored = getBoards();
    setBoards(stored);
  }, []);

  // Redirect to sign-in if not logged in
  useEffect(() => {
    if (!session && status !== "loading") {
      router.push("/sign-in");
    }
  }, [session, status, router]);

  // Add new board
  const addBoard = (newBoard: BoardType) => {
    const updated = addBoardLS(newBoard);
    setBoards(updated);
  };

  // Delete board
  const deleteBoard = (id: string) => {
    const updated = deleteBoardLS(id);
    setBoards(updated);
  };

  // Update board title/image
  const updateBoard = (updatedBoard: BoardType) => {
    const updated = updateBoardLS(updatedBoard);
    setBoards(updated);
  };

  return (
    <div className="space-y-10">
      <AllBoards
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
      <CreateBoardForm onCreate={addBoard} />
    </div>
  );
}
