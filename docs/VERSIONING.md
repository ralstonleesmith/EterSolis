# EterSolis Versioning and Change Control

EterSolis uses PR-level SemVer. Every merged pull request, including small documentation or content updates, must update the project version.

## Source of Truth

- `package.json` is the version source of truth.
- `package-lock.json` must carry the same root version.
- `docs/CHANGELOG.md` must include the same version with an ISO-8601 UTC timestamp.

## Version Rules

- Patch: default for every normal site, content, copy, documentation, automation or bug-fix PR.
- Minor: use for larger public capabilities, new major content systems or substantial route families.
- Major: reserved for incompatible operational or deployment changes.

## Required Per PR

1. Run `npm run version:bump -- --patch` unless a minor or major bump is explicitly justified.
2. Update `docs/CHANGELOG.md` with `## x.y.z — YYYY-MM-DDTHH:MM:SSZ`.
3. Update README and relevant docs when routes, scripts, content, deployment, forms or public behavior change.
4. Run `npm run check` before pushing.
5. Record preview status and validation commands in the changelog.

## Enforcement

`npm run release:audit` fails when package and lockfile versions diverge, the changelog entry is missing, the timestamp format is invalid or source/content changes omit README updates.
