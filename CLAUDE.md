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

## アーキテクチャ / 用語

以下は CLAUDE.md の `@` インポート機能で取り込んでいます（最大4階層まで再帰展開されます）。

@.claude/architecture.md

## 守ってほしいこと（プロジェクト規約）

コーディング規約・Git規約は **Rules** として [.claude/rules/](.claude/rules/) に置いてあり、
Claude Code が自動でロードします（CLAUDE.md から取り込んでいるわけではありません）。

- `.claude/rules/coding-style.md` … `paths` 指定により `src/**/*.ts` を読んだときにロード
- `.claude/rules/git-style.md` … `paths` なしのため常時ロード

## 作業の進め方

- ソースを変更したら、最後に必ず `npm test` を実行して結果を報告すること。
- `data/tasks.json` は実データです。デモ中に勝手に中身を書き換えないこと
  （タスク追加は CLI 経由で行う）。
