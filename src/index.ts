// task-cli のエントリポイント。
// サブコマンドを1つ追加するときは /new-command スキルの手順に従うこと。
import { loadTasks, saveTasks, nextId } from "./store.ts";
import type { Task } from "./types.ts";

async function add(title: string): Promise<void> {
  if (!title) {
    console.error("エラー: タスクのタイトルを指定してください。");
    process.exit(1);
  }
  const tasks = await loadTasks();
  const task: Task = {
    id: nextId(tasks),
    title,
    done: false,
    createdAt: new Date().toISOString(),
  };
  tasks.push(task);
  await saveTasks(tasks);
  console.log(`追加しました: #${task.id} ${task.title}`);
}

async function list(): Promise<void> {
  const tasks = await loadTasks();
  if (tasks.length === 0) {
    console.log("タスクはありません。");
    return;
  }
  for (const t of tasks) {
    const mark = t.done ? "[x]" : "[ ]";
    console.log(`${mark} #${t.id} ${t.title}`);
  }
}

async function done(idText: string): Promise<void> {
  const id = Number(idText);
  const tasks = await loadTasks();
  const target = tasks.find((t) => t.id === id);
  if (!target) {
    console.error(`エラー: タスク #${idText} が見つかりません。`);
    process.exit(1);
  }
  target.done = true;
  await saveTasks(tasks);
  console.log(`完了にしました: #${target.id} ${target.title}`);
}

function help(): void {
  console.log(
    [
      "使い方: npm run task -- <コマンド> [引数]",
      "",
      "  add <タイトル>   タスクを追加する",
      "  list             タスク一覧を表示する",
      "  done <ID>        タスクを完了にする",
      "  help             このヘルプを表示する",
    ].join("\n"),
  );
}

async function main(): Promise<void> {
  const [command, ...rest] = process.argv.slice(2);
  switch (command) {
    case "add":
      await add(rest.join(" "));
      break;
    case "list":
      await list();
      break;
    case "done":
      await done(rest[0] ?? "");
      break;
    case "help":
    case undefined:
      help();
      break;
    default:
      console.error(`不明なコマンド: ${command}`);
      help();
      process.exit(1);
  }
}

main();
