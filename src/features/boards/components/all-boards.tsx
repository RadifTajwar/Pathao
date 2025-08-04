// AllBoards.tsx

"use client";

import Image from "next/image";
import Link from "next/link";
import { Card } from "@/components/ui/card";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { MoreVertical } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

export type BoardType = {
    id: string;
    title: string;
    image?: string;
};

interface AllBoardsProps {
    boards: BoardType[];
    onDelete: (id: string) => void;
    onEdit: (id: string) => void;
}

export const AllBoards = ({ boards, onDelete, onEdit }: AllBoardsProps) => {
    return (
        <div className="p-6 max-w-screen-xl mx-auto">
            <h2 className="text-2xl font-semibold mb-6">Your Boards</h2>
            <Separator className="mb-6" />

            {boards.length === 0 ? (
                <div className="text-center text-muted-foreground text-sm mt-10">
                    You don’t have any boards yet. Create one to get started!
                </div>
            ) : (
                <div className="grid grid-cols-2 xs:grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-6">
                    {boards.map(board => (
                        <BoardCard
                            key={board.id}
                            board={board}
                            onDelete={onDelete}
                            onEdit={onEdit}
                        />
                    ))}
                </div>
            )}
        </div>
    );
};

const BoardCard = ({
    board,
    onDelete,
    onEdit,
}: {
    board: BoardType;
    onDelete: (id: string) => void;
    onEdit: (id: string) => void;
}) => {
    return (
        <div className="relative group">
            <Link href={`/board/${board.id}`}>
                <Card className="overflow-hidden rounded-xl cursor-pointer transition-transform duration-300 hover:scale-105 h-[140px] sm:h-[160px] md:h-[180px]">
                    <div className="relative w-full h-[80px] sm:h-[100px] md:h-[120px] overflow-hidden">
                        <Image
                            src={board.image || "/placeholder.png"}
                            alt={board.title}
                            fill
                            className="object-cover group-hover:scale-110 transition-transform duration-300"
                        />
                    </div>
                    <div className="text-sm px-3 py-2 font-medium text-blue-700 truncate">
                        {board.title}
                    </div>
                </Card>
            </Link>

            <div className="absolute top-2 right-2 z-10">
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button
                            variant="ghost"
                            size="icon"
                            className="opacity-70 hover:opacity-100 focus:ring-2 focus:ring-offset-1 focus:ring-neutral-300 rounded-full p-1"
                            onClick={(e) => e.preventDefault()}
                            aria-label="Open board actions"
                        >
                            <MoreVertical className="w-4 h-4 text-neutral-600" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent
                        align="end"
                        sideOffset={6}
                        className="w-40 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none"
                    >
                        <DropdownMenuItem
                            onClick={() => onEdit(board.id)}
                            className="cursor-pointer px-3 py-2 text-sm hover:bg-neutral-100 transition"
                        >
                            ✏️ Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem
                            onClick={() => onDelete(board.id)}
                            className="cursor-pointer px-3 py-2 text-sm text-red-600 hover:bg-red-50 transition"
                        >
                            🗑️ Delete
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
        </div>
    );
};
