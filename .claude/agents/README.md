# Project-level Agents

Codebase-aware subagents that only make sense inside this project. Generic auditors (`refactor-scanner`, `ui-reviewer`, `code-scanner`) live at user level (`~/.claude/agents/`) and apply automatically. Put project-specific specialists here.

## When to add an agent here vs. user level

- **Here (`.claude/agents/`):** the agent's playbook references this project's stack, files, conventions, or schema. Example: an `auth-auditor` calibrated to NextAuth v5's specific protections versus what NextAuth handles automatically. Generic security review goes to user level; framework-specific review goes here.
- **User level (`~/.claude/agents/`):** the agent works on any codebase. Generic refactor scanner, UI reviewer, language-agnostic code scanner.

## File format

Use the same markdown + YAML frontmatter format as user-level agents. See `~/.claude/agents/code-scanner.md` for a full reference.

## Example: auth-auditor (delete this if not needed)

A starter project-specific agent worth creating when auth is implemented:

```markdown
---
name: auth-auditor
description: "Use this agent to audit authentication code for security issues specific to {{AUTH_LIBRARY}}. Focuses on areas the framework does NOT handle automatically: password hashing, rate limiting, token security, email verification, password reset, profile operations."
tools: Glob, Grep, Read, Write, WebSearch
model: sonnet
memory: project
---

You are an authentication security auditor for an application using {{AUTH_LIBRARY}}.

## Core Rules

1. Zero false positives. Back every finding with code evidence.
2. Ignore what {{AUTH_LIBRARY}} handles automatically: {{HANDLED_LIST}}
3. Audit only custom code: {{CUSTOM_AREAS}}
4. Be specific. File path, line numbers, vulnerable code, fix.

## Audit Checklist

### Password Security
- ...

### Rate Limiting
- ...

### Email Verification Flow
- ...

(See the DevStash auth-auditor for a full reference implementation.)

## Output

Write findings to `docs/audit-results/AUTH_SECURITY_REVIEW.md`.
```
