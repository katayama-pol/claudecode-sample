# Claude Code 機能体験デモ（task-cli）

Claude Code の主要機能が「**いつ・どう動いて・何がうれしいのか**」を、
実際に手を動かして体感するためのデモプロジェクトです。

土台は小さな **タスク管理CLI**（TypeScript / Node.js）。
このコードに対して各機能を仕掛けてあるので、Claude Code で開いてプロンプトを打つだけで効果が分かります。

---

## まず動かす（3分）

前提: **Node.js 22.6 以上**（型付き `.ts` を直接実行するため。推奨は 20系ではなく 22/24系）と **Claude Code** がインストール済み。

```bash
# 1. このフォルダを Claude Code で開く
cd claudecode-sample
claude

# 2. （Claudeを使わず）CLI 単体が動くことを確認
node src/index.ts list
node src/index.ts add "牛乳を買う"
node src/index.ts done 1
```

依存パッケージのインストールは不要です（標準のNodeだけで動きます）。

---

## 7つの機能と、その違い

| 機能 | 何をするもの | 発動タイミング | 一言でいうと |
|---|---|---|---|
| **CLAUDE.md** | プロジェクトの常設メモリ | セッション開始時に**自動** | 毎回説明しなくても文脈を共有 |
| **Rules** | 規約を分割した指示ファイル | CLAUDE.md から `@`で取り込み | ルールを部品化して再利用 |
| **Skills** | 定型作業の手順書 | `/名前` または関連時に**自動** | 「いつものやり方」を再現 |
| **Subagents** | 専門タスク用の別エージェント | 委譲時／関連時に**自動** | 別コンテキストで集中処理 |
| **Hooks** | ツール実行に割り込むスクリプト | ツール実行の**前後で自動** | 強制・自動化（人手いらず） |
| **Output styles** | 応答スタイルの切替 | `/output-style` で切替中ずっと | 振る舞い・口調を変える |
| **system prompt 追記** | 起動時の一時的な追加指示 | `claude` 起動時の**そのセッション中** | その場限りの方針注入 |

### 「自動で効くもの」と「明示的に呼ぶもの」の地図

```
  指示しなくても効く            明示的に呼び出す
  ─────────────────            ─────────────────
  CLAUDE.md  (常時)            Skills      ( /new-command )
  Rules      (常時)            Output style( /output-style )
  Hooks      (ツール毎)        system追記  ( 起動オプション )
  Subagents  (関連時に委譲)    Subagents   ( 明示指定も可 )
```

---

## デモの進め方

`docs/demo/` に**機能ごとの体験ガイド**があります。番号順に進めるのがおすすめです。
各ガイドには「**打つプロンプト**」と「**何が起きれば成功か**」が書いてあります。

1. [docs/demo/00-はじめに.md](docs/demo/00-はじめに.md) — 全体像と進め方
2. [docs/demo/01-CLAUDE.md.md](docs/demo/01-CLAUDE.md.md)
3. [docs/demo/02-Rules.md](docs/demo/02-Rules.md)
4. [docs/demo/03-Skills.md](docs/demo/03-Skills.md)
5. [docs/demo/04-Subagents.md](docs/demo/04-Subagents.md)
6. [docs/demo/05-Hooks.md](docs/demo/05-Hooks.md)
7. [docs/demo/06-Output-styles.md](docs/demo/06-Output-styles.md)
8. [docs/demo/07-Append-system-prompt.md](docs/demo/07-Append-system-prompt.md)

---

## このプロジェクトの構成

```
claudecode-sample/
├── CLAUDE.md                  ← ① プロジェクト常設メモリ（自動読込）
├── src/                       ← 土台のCLIコード
│   ├── index.ts               ←   コマンド本体
│   ├── store.ts               ←   データ読み書き
│   └── types.ts
├── data/tasks.json            ←   タスクの保存先（Hooksで保護）
├── docs/demo/                 ← 機能ごとの体験ガイド
└── .claude/
    ├── settings.json          ← ⑤ Hooks の設定
    ├── rules/                 ← ② 分割した規約ファイル
    │   ├── coding-style.md
    │   └── git-style.md
    ├── skills/new-command/    ← ③ スキル
    │   └── SKILL.md
    ├── agents/                ← ④ サブエージェント
    │   └── code-reviewer.md
    ├── output-styles/         ← ⑥ 出力スタイル
    │   └── senpai-mentor.md
    └── hooks/                 ← ⑤ Hooks スクリプト本体
        ├── protect-data.js
        └── post-edit-log.js
```

---

## 他の人に共有するには

このフォルダごと（`.claude/` を含めて）Git リポジトリにして渡すだけです。
`.claude/` 配下の設定はリポジトリに含めるので、受け取った人が `claude` を起動した時点で
同じ機能がすべて有効になります。あとは `docs/demo/` を順に試してもらってください。
