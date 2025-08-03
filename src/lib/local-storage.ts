import { BoardType } from "@/features/boards/components/all-boards";
import CryptoJS from "crypto-js";

const STORAGE_KEY = "boards-data";
const SECRET_KEY = process.env.board_secret_key || "1234"; // Ideally from env in real apps

function encrypt(data: BoardType[]): string {
  const json = JSON.stringify(data);
  return CryptoJS.AES.encrypt(json, SECRET_KEY).toString();
}

function decrypt(cipherText: string): BoardType[] {
  const bytes = CryptoJS.AES.decrypt(cipherText, SECRET_KEY);
  const decrypted = bytes.toString(CryptoJS.enc.Utf8);
  return JSON.parse(decrypted) as BoardType[];
}

export function getBoards(): BoardType[] {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) return [];
    return decrypt(stored);
  } catch (error) {
    console.error("Failed to decrypt localStorage data:", error);
    return [];
  }
}

export function saveBoards(boards: BoardType[]) {
  const encrypted = encrypt(boards);
  localStorage.setItem(STORAGE_KEY, encrypted);
}

export function addBoardLS(newBoard: BoardType): BoardType[] {
  const boards = getBoards();
  const updated = [...boards, newBoard];
  saveBoards(updated);
  return updated;
}

export function deleteBoardLS(id: string): BoardType[] {
  const boards = getBoards();
  const updated = boards.filter(b => b.id !== id);
  saveBoards(updated);
  return updated;
}

export function updateBoardLS(updatedBoard: BoardType): BoardType[] {
  const boards = getBoards();
  const updated = boards.map(b => (b.id === updatedBoard.id ? updatedBoard : b));
  saveBoards(updated);
  return updated;
}
