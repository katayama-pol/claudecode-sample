// タスク1件を表す型。
// このプロジェクトのデータ構造はすべてここで定義する。
export interface Task {
  id: number;
  title: string;
  done: boolean;
  createdAt: string; // ISO 8601 形式の文字列
}
