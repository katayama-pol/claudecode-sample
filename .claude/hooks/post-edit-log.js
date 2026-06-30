// PostToolUse フック（Edit / Write が成功した直後に実行される）。
//
// 目的: Claude がファイルを編集するたびに、編集ログを .claude/edit-log.txt に追記する。
//       「フックは自分が何もしなくても自動で動く」ことを、増えていくログで体感するためのデモ。
//
// 仕組み: ツール実行の直後に JSON が標準入力で渡される。ここでは編集対象のパスを
//         タイムスタンプ付きでログファイルに追記しているだけ。終了コード 0 で正常終了。

import { appendFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

let input = "";
process.stdin.on("data", (chunk) => (input += chunk));
process.stdin.on("end", () => {
  let payload = {};
  try {
    payload = JSON.parse(input);
  } catch {
    process.exit(0);
  }

  const here = dirname(fileURLToPath(import.meta.url));
  const logFile = join(here, "..", "edit-log.txt");

  const tool = payload?.tool_name ?? "?";
  const filePath = payload?.tool_input?.file_path ?? "?";
  const line = `${new Date().toISOString()}  ${tool}  ${filePath}\n`;

  try {
    appendFileSync(logFile, line, "utf-8");
  } catch {
    // ログ失敗は無視（フックでメインの作業を止めない）
  }
  process.exit(0);
});
