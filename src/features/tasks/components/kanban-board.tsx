"use client";

import { useState } from "react";
import { DragDropContext, Droppable, Draggable, DropResult } from "@hello-pangea/dnd";
import { Plus, CheckCircle, Circle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";

interface Task {
  id: string;
  content: string;
  labelColor: string;
  done: boolean;
}

interface Column {
  id: string;
  title: string;
  taskIds: string[];
}

interface KanbanData {
  tasks: Record<string, Task>;
  columns: Record<string, Column>;
  columnOrder: string[];
}

const initialData: KanbanData = {
  columns: {
    "column-1": {
      id: "column-1",
      title: "To Do",
      taskIds: ["task-1", "task-2"],
    },
    "column-2": {
      id: "column-2",
      title: "In Progress",
      taskIds: [],
    },
  },
  tasks: {
    "task-1": {
      id: "task-1",
      content: "Login",
      labelColor: "bg-green-500",
      done: false,
    },
    "task-2": {
      id: "task-2",
      content: "Fix bug",
      labelColor: "bg-yellow-500",
      done: false,
    },
  },
  columnOrder: ["column-1", "column-2"],
};

export  const  KanbanBoard=()=> {
  const [data, setData] = useState<KanbanData>(initialData);
  const [newTaskText, setNewTaskText] = useState<Record<string, string>>({});
  const [newColumnTitle, setNewColumnTitle] = useState<string>("");

  const onDragEnd = (result: DropResult) => {
    const { destination, source, draggableId } = result;
    if (!destination) return;

    const sourceCol = data.columns[source.droppableId];
    const destCol = data.columns[destination.droppableId];

    if (sourceCol === destCol) {
      const newTaskIds = [...sourceCol.taskIds];
      newTaskIds.splice(source.index, 1);
      newTaskIds.splice(destination.index, 0, draggableId);

      const newCol = { ...sourceCol, taskIds: newTaskIds };
      setData({ ...data, columns: { ...data.columns, [newCol.id]: newCol } });
    } else {
      const sourceTasks = [...sourceCol.taskIds];
      sourceTasks.splice(source.index, 1);
      const destTasks = [...destCol.taskIds];
      destTasks.splice(destination.index, 0, draggableId);

      setData({
        ...data,
        columns: {
          ...data.columns,
          [sourceCol.id]: { ...sourceCol, taskIds: sourceTasks },
          [destCol.id]: { ...destCol, taskIds: destTasks },
        },
      });
    }
  };

  const toggleTaskDone = (taskId: string) => {
    const updated = {
      ...data.tasks[taskId],
      done: !data.tasks[taskId].done,
    };
    setData({ ...data, tasks: { ...data.tasks, [taskId]: updated } });
  };

  const handleAddTask = (columnId: string) => {
    const input = newTaskText[columnId]?.trim();
    if (!input) return;

    const id = `task-${Date.now()}`;
    const newTask: Task = {
      id,
      content: input,
      labelColor: "bg-blue-500",
      done: false,
    };

    const updatedColumn = {
      ...data.columns[columnId],
      taskIds: [...data.columns[columnId].taskIds, id],
    };

    setData({
      ...data,
      tasks: { ...data.tasks, [id]: newTask },
      columns: { ...data.columns, [columnId]: updatedColumn },
    });
    setNewTaskText({ ...newTaskText, [columnId]: "" });
  };

  const handleAddColumn = () => {
    const title = newColumnTitle.trim();
    if (!title) return;

    const id = `column-${Date.now()}`;
    const newCol: Column = { id, title, taskIds: [] };
    setData({
      ...data,
      columns: { ...data.columns, [id]: newCol },
      columnOrder: [...data.columnOrder, id],
    });
    setNewColumnTitle("");
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="flex gap-4 overflow-x-auto">
        {data.columnOrder.map((colId) => {
          const column = data.columns[colId];
          return (
            <div key={colId} className="bg-white rounded-md shadow-md w-64 p-4">
              <div className="font-semibold mb-4 flex justify-between">
                {column.title}
              </div>
              <Droppable droppableId={colId}>
                {(provided) => (
                  <div
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                    className="space-y-2 min-h-[60px]"
                  >
                    {column.taskIds.map((taskId, idx) => {
                      const task = data.tasks[taskId];
                      return (
                        <Draggable key={taskId} draggableId={taskId} index={idx}>
                          {(provided) => (
                            <Card
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                              className="p-3 flex items-center justify-between"
                            >
                              <div className="flex items-center gap-2">
                                <button onClick={() => toggleTaskDone(task.id)}>
                                  {task.done ? (
                                    <CheckCircle className="text-green-500 w-4 h-4" />
                                  ) : (
                                    <Circle className="text-gray-400 w-4 h-4" />
                                  )}
                                </button>
                                <div>
                                  <div className="text-sm font-medium">
                                    {task.content}
                                  </div>
                                  <div className={`w-3 h-3 rounded-full ${task.labelColor} mt-1`} />
                                </div>
                              </div>
                            </Card>
                          )}
                        </Draggable>
                      );
                    })}
                    {provided.placeholder}
                    <div className="pt-2">
                      <Input
                        placeholder="Add a card"
                        value={newTaskText[colId] || ""}
                        onChange={(e) =>
                          setNewTaskText((prev) => ({ ...prev, [colId]: e.target.value }))
                        }
                        onKeyDown={(e) => e.key === "Enter" && handleAddTask(colId)}
                      />
                      <Button
                        variant="ghost"
                        size="sm"
                        className="w-full mt-2"
                        onClick={() => handleAddTask(colId)}
                      >
                        Add card
                      </Button>
                    </div>
                  </div>
                )}
              </Droppable>
            </div>
          );
        })}

        <div className="w-64 min-w-[16rem] bg-gray-100/30 rounded-md h-fit px-4 py-6 space-y-2">
          <Input
            placeholder="New list title"
            value={newColumnTitle}
            onChange={(e) => setNewColumnTitle(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleAddColumn()}
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
      <Separator className="my-6" />
    </DragDropContext>
  );
}
