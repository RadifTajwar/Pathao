import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogClose } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { CreateBoardForm } from "@/features/boards/components/create-board-form";
import type { BoardType } from "@/features/boards/components/all-boards"; // adjust path if needed

export function BoardCreateCard({ onCreate }: { onCreate: (board: BoardType) => void; remaining?: number }) {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <div className="flex flex-col items-center justify-center w-full min-h-[140px] rounded-xl bg-gray-200 hover:bg-gray-300 cursor-pointer transition group">
          <span className="font-medium text-gray-700">Create new board</span>
        </div>
      </DialogTrigger>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle>Create Board</DialogTitle>
        </DialogHeader>
        <CreateBoardForm
          onCreate={(board) => {
            onCreate(board);
            setOpen(false);
          }}
        />
        <DialogClose asChild>
          <Button variant="outline">Cancel</Button>
        </DialogClose>
      </DialogContent>
    </Dialog>
  );
}
