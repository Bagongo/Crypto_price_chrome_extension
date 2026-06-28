# Handoff

## Status

Active.

## Project state summary

The project is not greenfield.

The popup/frontend is already in a relatively advanced state compared with the backend/data architecture. At minimum, there is a functioning popup capable of rendering the market list.

The main known architectural weakness is that the project still uses direct calls to CoinGecko from the frontend/client path.

## Current reality to preserve

Agents should assume the existing popup is worth preserving.

The current goal is not to redesign the entire frontend from scratch. The current goal is to understand the existing implementation and migrate the data flow to a safer architecture with minimal unnecessary UI churn.

## Known but still fuzzy history

This project dates back several years.

There may be additional branches containing in-progress or partial features such as options panels or other extension-related UI/functionality. The exact state of those branches and features is not yet fully remembered by the project owner.

Agents should therefore stay generic and careful in their assumptions.

## Safe assumptions for now

- The popup can render the list and is a useful existing asset.
- Some extra features may exist, but not all are confirmed yet.
- The repository likely needs inspection before deciding what to keep, merge, or retire.
- The most reliable current migration target is the data layer, not a wholesale frontend rewrite.

## Target direction

Preferred direction going forward:

1. Keep the popup and useful frontend logic where practical.
2. Introduce a backend cache layer, currently expected to be a Cloudflare Worker.
3. Move upstream CoinGecko fetching to that backend layer.
4. Prefer CoinGecko Demo API as upstream.
5. Update the popup to consume the backend endpoint instead of calling CoinGecko directly.
6. Add stale-safe behavior so the extension can still show last valid data during temporary fetch failures.

## Migration guardrails

- Do not rewrite the popup unless the codebase inspection shows a strong technical reason.
- Do not treat direct client-side CoinGecko access as an acceptable final architecture.
- Do not assume incomplete or old branches are useless; inspect before removing.
- Prefer incremental migration over broad refactors.

## Immediate next actions for any agent

1. Inspect the current branch and repo structure.
2. Identify popup entry points and the current data-fetching code.
3. Identify where direct CoinGecko calls are made.
4. Check whether experimental branches or partially implemented features appear relevant.
5. Propose the smallest viable migration plan from direct client fetch to backend-cached fetch.

## How to update this file

As the project owner remembers more details, or as agents inspect the repo, this file should be refined with:

- confirmed existing features;
- confirmed obsolete work;
- important file paths;
- migration progress;
- next concrete tasks.

Until then, keep the document generic enough to avoid misleading future agents.

## Consistency with AGENTS.md

This handoff must be read together with `AGENTS.md`, which defines the default execution policy:

- default mode is **discussion and planning only**;
- no code changes, file writes, or modifying commands unless explicitly requested.
