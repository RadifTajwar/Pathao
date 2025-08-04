"use client";

import { useEffect, useState } from "react";
import { KanbanBoard } from "@/features/tasks/components/kanban-board";
import { getBoards } from "@/lib/local-storage";

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
      className="min-h-screen w-full bg-cover bg-center overflow-hidden"
      style={{
        backgroundImage: backgroundImage ? `url(${backgroundImage})` : undefined,
      }}
    >
      <div className="sticky top-0 z-20 bg-black/30 backdrop-blur p-4 text-center">
        <h1 className="text-xl italic underline font-semibold text-white drop-shadow">
          {boardTitle}
        </h1>
      </div>
      <div className="h-full w-full overflow-y-auto overflow-x-auto ">

        <KanbanBoard boardId={params.boardId} />
      </div>
    </div>
  );
}
