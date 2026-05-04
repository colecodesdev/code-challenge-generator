# Project-level Skills

Skills that only make sense inside this project. Generic workflow skills (`/feature`, `/cleanup`, `/research`, `/list-components`) live at user level (`~/.claude/skills/`) and are available everywhere.

## When to add a skill here vs. user level

- **Here (`.claude/skills/`):** the skill references this project's stack, schema, file paths, or domain. Example: a `/migrate` skill that wraps Prisma migration commands and revalidates known paths. A `/seed` skill that loads project-specific seed data.
- **User level (`~/.claude/skills/`):** the skill works on any codebase. Workflow scaffolding like `/feature load|start|review|complete`.

## File format

Use the same SKILL.md + actions structure as user-level skills. See `~/.claude/skills/feature/` for a full reference.

If the skill is a single file, put `SKILL.md` directly here. If it has multiple actions, use a directory:

```
.claude/skills/
├── my-skill/
│   ├── SKILL.md           # entry point with argument-hint
│   └── actions/
│       ├── action-1.md
│       └── action-2.md
```
