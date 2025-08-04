"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { KanbanBoard } from "@/features/tasks/components/kanban-board";
import { getBoards } from "@/lib/local-storage";
import { FiArrowLeft } from "react-icons/fi";
export type BoardType = {
  id: string;
  title: string;
  image?: string;
};

export default function BoardPage({ params }: { params: { boardId: string } }) {
  const [backgroundImage, setBackgroundImage] = useState<string | null>(null);
  const [boardTitle, setBoardTitle] = useState<string>("");

  useEffect(() => {
    const boards: BoardType[] = getBoards();
    const board = boards.find((b) => b.id === params.boardId);
    if (board) {
      setBoardTitle(board.title);
      if (board.image) {
        setBackgroundImage(board.image);
      }
    }
  }, [params.boardId]);

  return (
    <div
      className="w-full bg-cover bg-center overflow-x-auto"
      style={{
        backgroundImage: backgroundImage ? `url(${backgroundImage})` : undefined,
      }}
    >
      {/* Sticky bar with fixed height */}
      <div className="sticky top-0 z-20 bg-black/30 backdrop-blur px-4 py-4 h-16 flex items-center justify-between">
        <Link
          href="/"
          className="flex items-center text-white gap-2 hover:underline transition"
        >
          <FiArrowLeft className="w-5 h-5" />
          <span className="hidden sm:inline">Home</span>
        </Link>
        <h1 className="text-xl italic underline font-semibold text-white drop-shadow text-center flex-1">
          {boardTitle}
        </h1>
        <div className="w-8" />
      </div>

      {/* Main content: Subtract header height from screen height */}
      <div className="w-full" style={{ height: "calc(100vh - 4rem)", overflowY: "auto" }}>
        <KanbanBoard boardId={params.boardId} />
      </div>
    </div>
  );
}
