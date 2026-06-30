import { test } from "node:test";
import assert from "node:assert/strict";
import { nextId } from "./store.ts";
import type { Task } from "./types.ts";

test("nextId は空配列のとき 1 を返す", () => {
  assert.equal(nextId([]), 1);
});

test("nextId は既存IDの最大値+1を返す", () => {
  const tasks: Task[] = [
    { id: 1, title: "a", done: false, createdAt: "" },
    { id: 5, title: "b", done: true, createdAt: "" },
  ];
  assert.equal(nextId(tasks), 6);
});
