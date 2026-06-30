---
description: Git / コミット規約（常時ロード）
---

# Git / コミット規約

このファイルも `.claude/rules/` に置かれた **Rules** です。
`paths` フロントマターが**ない**ため、セッション開始時に**常時ロード**されます
（coding-style.md の条件付きロードと対になるデモ）。

## コミットメッセージ

- [Conventional Commits](https://www.conventionalcommits.org/) 形式にする。
  - 例: `feat: add export command`
  - 例: `fix: correct task id calculation`
- 種別は `feat` / `fix` / `docs` / `refactor` / `test` / `chore` のいずれか。
- 件名は72文字以内。本文は日本語でよい。

## ブランチ

- 作業ブランチ名は `feature/<内容>` または `fix/<内容>`。
