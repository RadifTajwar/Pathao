// lib/kanban-storage.ts
import type { KanbanData } from "@/features/tasks/types";

const STORAGE_KEY = "kanban-data";

export function saveKanbanData(data: KanbanData) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

export function loadKanbanData(): KanbanData | null {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : null;
  } catch {
    return null;
  }
}

export function clearKanbanData() {
  localStorage.removeItem(STORAGE_KEY);
}
