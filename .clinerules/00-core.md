# Cline core rules

Use `AGENTS.md` as the primary instruction file for this repository.

## Required read order

Before meaningful implementation or refactoring:

1. Read `AGENTS.md`.
2. Read `docs/handoff.md`.
3. Inspect the real repo structure and current code before making assumptions.

## Default behavior

Default behavior in this repository is **discussion and planning only**.

Unless the user explicitly asks for implementation, you must:

- Read `AGENTS.md` and `docs/handoff.md`.
- Inspect the repository and explain findings.
- Propose plans and trade-offs.
- Avoid editing files.
- Avoid creating files.
- Avoid running modifying commands.

Do not modify code, write files, or perform refactors unless the user explicitly says: "implement this", "make these changes", or similar.

## Chat prompt pattern

When you want to stay in discussion mode, repeat in your opening:

"For this session, I will operate in discussion-only mode. You may inspect the repository and explain findings, but do not edit files, create files, run modifying commands, or change code unless I explicitly ask for implementation."

## Behavior rules

- Keep this file thin; do not duplicate the whole project brief here.
- Preserve the existing popup when practical.
- Focus first on migrating the data architecture away from direct client-side CoinGecko usage.
- Update `docs/handoff.md` when important repo discoveries are made.
