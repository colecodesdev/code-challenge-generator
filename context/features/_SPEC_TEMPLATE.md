# {{FEATURE_NAME}} Spec

## Overview

<!--
2 to 4 sentences answering:
- What is being built?
- What problem does it solve?
- Where does it live (route, component, module)?
- Any tier or access constraints (free, paid, admin only)?

Look at context/features/*-spec.md from any prior project for examples of the right altitude.
-->

{{OVERVIEW_PARAGRAPH}}

## Requirements

<!--
Bullet list of concrete, verifiable requirements.
Each bullet should be a single thing the implementation must do or include.
Order them roughly by dependency: setup first, UI last, tests last.
-->

- {{REQUIREMENT_1}}
- {{REQUIREMENT_2}}
- {{REQUIREMENT_3}}
- Unit tests for {{TESTABLE_AREAS}}
- Follow existing patterns

## Files to Create

<!-- Optional. Use when you already know the file layout. Otherwise delete. -->

1. `{{PATH_1}}`: {{ROLE_1}}
2. `{{PATH_2}}`: {{ROLE_2}}

## Files to Modify

<!-- Optional. Use when modifying specific existing files. Otherwise delete. -->

1. `{{EXISTING_PATH_1}}`: {{CHANGE_1}}

## Key Gotchas

<!--
Optional but high-value. Things that will trip up the implementation if not flagged
upfront. SDK quirks, framework version differences, undocumented behavior, etc.

Example from DevStash AI auto-tag spec: "gpt-5-nano does NOT work with Chat Completions API.
Must use Responses API. completion.choices[0].message.content returns empty string."
-->

- {{GOTCHA_1}}
- {{GOTCHA_2}}

## Environment Variables

<!-- Optional. List new env vars introduced by this feature. -->

```
{{ENV_VAR_1}}=
{{ENV_VAR_2}}=
```

## Notes

<!--
Anything that doesn't fit above:
- Future-facing decisions ("not saved to DB on purpose, regenerated on each click")
- Gating policy ("Pro only, both UI and server-side")
- References to related plans or docs
-->

- {{NOTE_1}}
- See `docs/{{RELATED_DOC}}.md` for full architectural context.

## Testing

<!-- Optional. Manual test steps if useful. -->

1. {{TEST_STEP_1}}
2. {{TEST_STEP_2}}

## References

- @context/project-overview.md
- @context/features/{{RELATED_SPEC}}.md
- @docs/{{RELATED_DOC}}.md
- {{EXTERNAL_DOC_LINK}}
