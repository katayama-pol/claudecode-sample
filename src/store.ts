// データの読み書きは必ずこのファイル経由で行う（規約: .claude/rules/coding-style.md）。
// 他のファイルから data/tasks.json を直接読み書きしてはいけない。
import { readFile, writeFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";
import type { Task } from "./types.ts";

const here = dirname(fileURLToPath(import.meta.url));
const DATA_FILE = join(here, "..", "data", "tasks.json");

export async function loadTasks(): Promise<Task[]> {
  try {
    const raw = await readFile(DATA_FILE, "utf-8");
    return JSON.parse(raw) as Task[];
  } catch {
    return [];
  }
}

export async function saveTasks(tasks: Task[]): Promise<void> {
  await writeFile(DATA_FILE, JSON.stringify(tasks, null, 2) + "\n", "utf-8");
}

export function nextId(tasks: Task[]): number {
  return tasks.reduce((max, t) => Math.max(max, t.id), 0) + 1;
}
