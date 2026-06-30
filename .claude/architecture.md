# アーキテクチャ / 用語メモ

このファイルは CLAUDE.md から `@` 構文で取り込まれます（**CLAUDE.md の import 機能**のデモ）。
Rules（`.claude/rules/`）とは別の仕組みである点に注意してください。

## データフロー

```
CLI (src/index.ts)
   └─ コマンドを解釈
        └─ src/store.ts  ← データ読み書きはすべてここを通す
             └─ data/tasks.json  （唯一の永続データ）
```

## 用語

- **タスク（Task）**: id / title / done / createdAt を持つ1件のToDo。定義は [src/types.ts](../src/types.ts)。
- **store**: tasks.json の読み書きを担う層。直接 `fs` を触ってよいのはここだけ。
