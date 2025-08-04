// features/kanban/kanban-store.ts

import { create } from "zustand";
import { persist } from "zustand/middleware";
import { KanbanData, Task, Column } from "@/features/tasks/types";

type KanbanStore = {
  boards: KanbanData[];
  setBoards: (boards: KanbanData[]) => void;
  getBoard: (boardId: string) => KanbanData | undefined;
  updateBoard: (boardId: string, updated: KanbanData) => void;

  addColumn: (boardId: string, title: string) => void;
  updateColumnTitle: (boardId: string, columnId: string, newTitle: string) => void;
  deleteColumn: (boardId: string, columnId: string) => void;

  addTask: (boardId: string, columnId: string, content: string) => void;
  toggleTaskDone: (boardId: string, taskId: string) => void;
  updateTaskContent: (boardId: string, taskId: string, newContent: string) => void;
  updateTaskLabelColor: (boardId: string, taskId: string, color: string) => void;
  deleteTask: (boardId: string, taskId: string) => void;
  moveTask: (
    boardId: string,
    sourceId: string,
    destId: string,
    sourceIdx: number,
    destIdx: number,
    taskId: string
  ) => void;
};

export const useKanbanStore = create<KanbanStore>()(
  persist(
    (set, get) => ({
      boards: [],

      setBoards: (boards) => set({ boards }),

      getBoard: (boardId) => get().boards.find((b) => b.board.id === boardId),

      updateBoard: (boardId, updatedBoard) => {
        set((state) => {
          const updatedBoards = state.boards.map((b) =>
            b.board.id === boardId ? updatedBoard : b
          );
          if (!state.boards.find((b) => b.board.id === boardId)) {
            updatedBoards.push(updatedBoard);
          }
          return { boards: updatedBoards };
        });
      },

      addColumn: (boardId, title) => {
        let board = get().getBoard(boardId);
        if (!board) {
          board = {
            board: { id: boardId },
            tasks: {},
            columns: {},
            columnOrder: [],
          };
        }
        const id = `column-${Date.now()}`;
        const newColumn: Column = { id, title, taskIds: [] };

        const updatedBoard = {
          ...board,
          columns: { ...board.columns, [id]: newColumn },
          columnOrder: [...board.columnOrder, id],
        };
        get().updateBoard(boardId, updatedBoard);
      },

      updateColumnTitle: (boardId, columnId, newTitle) => {
        const board = get().getBoard(boardId);
        if (!board) return;
        const column = board.columns[columnId];
        if (!column) return;

        const updatedBoard = {
          ...board,
          columns: {
            ...board.columns,
            [columnId]: { ...column, title: newTitle },
          },
        };
        get().updateBoard(boardId, updatedBoard);
      },

      deleteColumn: (boardId, columnId) => {
        const board = get().getBoard(boardId);
        if (!board) return;

        const { [columnId]: deletedColumn, ...remainingColumns } = board.columns;
        const updatedTasks = { ...board.tasks };
        deletedColumn.taskIds.forEach((taskId) => {
          delete updatedTasks[taskId];
        });

        const updatedBoard: KanbanData = {
          ...board,
          columns: remainingColumns,
          tasks: updatedTasks,
          columnOrder: board.columnOrder.filter((id) => id !== columnId),
        };
        get().updateBoard(boardId, updatedBoard);
      },

      addTask: (boardId, columnId, content) => {
        const board = get().getBoard(boardId);
        if (!board) return;

        const id = `task-${Date.now()}`;
        const newTask: Task = {
          id,
          content,
          labelColor: "bg-blue-500",
          done: false,
        };

        const updatedColumn = {
          ...board.columns[columnId],
          taskIds: [...board.columns[columnId].taskIds, id],
        };

        const updatedBoard = {
          ...board,
          tasks: { ...board.tasks, [id]: newTask },
          columns: { ...board.columns, [columnId]: updatedColumn },
        };
        get().updateBoard(boardId, updatedBoard);
      },

      toggleTaskDone: (boardId, taskId) => {
        const board = get().getBoard(boardId);
        if (!board) return;

        const updatedTask = {
          ...board.tasks[taskId],
          done: !board.tasks[taskId].done,
        };

        const updatedBoard = {
          ...board,
          tasks: { ...board.tasks, [taskId]: updatedTask },
        };
        get().updateBoard(boardId, updatedBoard);
      },

      updateTaskContent: (boardId, taskId, newContent) => {
        const board = get().getBoard(boardId);
        if (!board) return;

        const updatedBoard = {
          ...board,
          tasks: {
            ...board.tasks,
            [taskId]: {
              ...board.tasks[taskId],
              content: newContent,
            },
          },
        };
        get().updateBoard(boardId, updatedBoard);
      },

      updateTaskLabelColor: (boardId, taskId, color) => {
        const board = get().getBoard(boardId);
        if (!board) return;

        const updatedBoard = {
          ...board,
          tasks: {
            ...board.tasks,
            [taskId]: {
              ...board.tasks[taskId],
              labelColor: color,
            },
          },
        };
        get().updateBoard(boardId, updatedBoard);
      },

      deleteTask: (boardId, taskId) => {
        const board = get().getBoard(boardId);
        if (!board) return;

        const newTasks = { ...board.tasks };
        delete newTasks[taskId];

        const newColumns = { ...board.columns };
        for (const col of Object.values(newColumns)) {
          col.taskIds = col.taskIds.filter((id) => id !== taskId);
        }

        const updatedBoard = {
          ...board,
          tasks: newTasks,
          columns: newColumns,
        };
        get().updateBoard(boardId, updatedBoard);
      },

      moveTask: (boardId, sourceId, destId, sourceIdx, destIdx, taskId) => {
        const board = get().getBoard(boardId);
        if (!board) return;

        const newColumns = { ...board.columns };

        if (sourceId === destId) {
          const column = newColumns[sourceId];
          const taskIds = [...column.taskIds];
          taskIds.splice(sourceIdx, 1);
          taskIds.splice(destIdx, 0, taskId);
          newColumns[sourceId] = { ...column, taskIds };
        } else {
          const sourceTasks = [...newColumns[sourceId].taskIds];
          const destTasks = [...newColumns[destId].taskIds];
          sourceTasks.splice(sourceIdx, 1);
          destTasks.splice(destIdx, 0, taskId);

          newColumns[sourceId] = { ...newColumns[sourceId], taskIds: sourceTasks };
          newColumns[destId] = { ...newColumns[destId], taskIds: destTasks };
        }

        const updatedBoard = {
          ...board,
          columns: newColumns,
        };
        get().updateBoard(boardId, updatedBoard);
      },
    }),
    {
      name: "kanban-storage",
    }
  )
);
