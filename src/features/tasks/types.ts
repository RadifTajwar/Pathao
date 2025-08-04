export interface Task {
  id: string;
  content: string;
  labelColor: string;
  done: boolean;
}

export interface Column {
  id: string;
  title: string;
  taskIds: string[];
}

export interface KanbanData {
  board: {
    id: string;
  
  };
  tasks: Record<string, Task>;
  columns: Record<string, Column>;
  columnOrder: string[];
}
