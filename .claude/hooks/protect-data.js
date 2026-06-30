// PreToolUse フック（Edit / Write の直前に実行される）。
//
// 目的: data/tasks.json を Claude が直接編集しようとしたらブロックする。
//       （実データはCLI経由で更新する、というプロジェクト規約を機械的に強制するデモ）
//
// 仕組み: Claude Code はツール実行の直前に、このスクリプトへ JSON を標準入力で渡す。
//         終了コード 2 で終了し、stderr にメッセージを出すと、ツール実行はブロックされ、
//         そのメッセージが Claude にフィードバックされる。
//
// クロスプラットフォーム化のため Node で書いている（Windows / mac / Linux 共通で動く）。

let input = "";
process.stdin.on("data", (chunk) => (input += chunk));
process.stdin.on("end", () => {
  let payload = {};
  try {
    payload = JSON.parse(input);
  } catch {
    process.exit(0); // 入力が壊れていても安全側（許可）に倒す
  }

  const filePath = payload?.tool_input?.file_path ?? "";
  const normalized = filePath.replace(/\\/g, "/");

  if (normalized.endsWith("data/tasks.json")) {
    console.error(
      "[protect-data フック] data/tasks.json への直接編集はブロックされました。" +
        "タスクの追加・更新は CLI（npm run task -- add ...）経由で行ってください。",
    );
    process.exit(2); // 2 = ブロック。stderr が Claude に渡される
  }

  process.exit(0); // それ以外は許可
});
