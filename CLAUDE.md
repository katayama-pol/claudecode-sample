# task-cli プロジェクト

Claude Code の各機能を体験するためのデモ用プロジェクトです。
中身は「タスク管理CLI」（TypeScript / Node.js）です。

> このファイル（CLAUDE.md）は、Claude Code がセッション開始時に**自動で読み込む**
> プロジェクトの常設メモリです。ここに書いたことは、毎回指示しなくても守られます。

## プロジェクト概要

- 言語: TypeScript（Node.js の型ストリッピングで `.ts` を直接実行）
- エントリポイント: [src/index.ts](src/index.ts)
- データ保存: [data/tasks.json](data/tasks.json)
- ビルド不要。`node src/index.ts <コマンド>` で動く。

## コマンド

- 実行: `npm run task -- <コマンド>`（例: `npm run task -- list`）
- テスト: `npm test`
- 型チェック: `npx tsc`（typescript を入れている場合）

## 守ってほしいこと（プロジェクト規約）

詳細な規約は分割して別ファイルに置いています。以下を必ず参照してください。

@.claude/rules/coding-style.md
@.claude/rules/git-style.md

## 作業の進め方

- ソースを変更したら、最後に必ず `npm test` を実行して結果を報告すること。
- `data/tasks.json` は実データです。デモ中に勝手に中身を書き換えないこと
  （タスク追加は CLI 経由で行う）。
