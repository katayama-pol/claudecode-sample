# 05. Hooks — ツール実行に自動で割り込む

## どんな機能か

Hook（フック）は、Claude Code の**ライフサイクルの各イベントで、
自分で書いたスクリプトを自動で差し込む**仕組みです。Claude の判断に依存せず、
**機械的に・確実に**処理を強制できるのが最大の特徴です。

発動できるイベントはツール実行の前後だけではありません。主なものは以下:

- `PreToolUse` / `PostToolUse` … ツール実行の直前 / 直後
- `UserPromptSubmit` … ユーザーがプロンプトを送信したとき
- `Stop` / `SubagentStop` … 応答の停止時 / サブエージェントの停止時
- `SessionStart` / `SessionEnd` … セッションの開始 / 終了
- `Notification` … 通知が出るとき / `PreCompact` … 文脈圧縮の直前

このデモでは、最も分かりやすい **ツール実行の前後（PreToolUse / PostToolUse）** の
2つのフックを仕込んであります（設定: [.claude/settings.json](../../.claude/settings.json)）。

| フック | タイミング | 中身 |
|---|---|---|
| `protect-data.js` | **PreToolUse**（Edit/Write の直前） | `data/tasks.json` への直接編集を**ブロック** |
| `post-edit-log.js` | **PostToolUse**（Edit/Write の直後） | 編集内容を `.claude/edit-log.txt` に**追記** |

確認: Claude Code 内で `/hooks` を打つと設定中のフックが見られます。

---

## デモA：編集を強制ブロックする（PreToolUse）

### 打つプロンプト

```
data/tasks.json を直接開いて、新しいタスクを1件追記して。
```

### 何が起きれば成功か

- Claude が `data/tasks.json` を Edit/Write しようとした瞬間、フックが**終了コード2でブロック**。
- 「[protect-data フック] data/tasks.json への直接編集はブロックされました…」という
  メッセージが Claude に返り、Claude は方針転換して **CLI 経由（`node src/index.ts add ...`）** を使う。

> ポイント: CLAUDE.md にも「直接書き換えない」と書いてありますが、それは“お願い”。
> フックは**実行を物理的に止める**ので、確実性が段違いです。守らせたい規則の最後の砦になります。

---

## デモB：編集のたびにログが増える（PostToolUse）

### 打つプロンプト

```
src/index.ts の先頭コメントに「// デモ確認用」という行を足して。
```

### 何が起きれば成功か

- 編集成功の**直後**にフックが走り、`.claude/edit-log.txt` に1行追記される。
- 中身を確認:

```bash
cat .claude/edit-log.txt
# 例: 2026-06-30T...Z  Edit  c:/.../src/index.ts
```

- 何度か編集すると、その都度**行が増えていく**。Claude は何も意識していないのに自動で記録される。

---

## こういう用途に効く（実務例）

- 編集後に **自動フォーマット / lint**（prettier, eslint --fix）。
- 機密ファイル・本番設定への**書き込み禁止**。
- コマンド実行前の**危険コマンド検査**（`rm -rf` を止める等）。
- 作業終了時（Stop フック）に**テストを自動実行**。

## メリットまとめ

- Claude の気分に左右されない**決定論的な強制力**。
- 定型処理（整形・記録・検査）を**完全自動化**。
- チームの「やってはいけない」をコードで守れる。

> 後片付け: `rm -f .claude/edit-log.txt` でログを消し、`git checkout src/index.ts` でコメントを戻せます。
