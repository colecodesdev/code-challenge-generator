# Coding Standards

<!--
This file holds the rules for THIS project's stack.
The DevStash version was Next.js + React + TypeScript + Tailwind v4 + Prisma + Vitest.
Replace each section below with the rules that apply to this project's chosen stack.
Keep entries specific and verifiable: "Use 2-space indentation" beats "format code nicely".
-->

## Language

- {{LANGUAGE_RULE_1}}
- {{LANGUAGE_RULE_2}}
- {{LANGUAGE_RULE_3}}

<!-- Examples for TypeScript:
- Strict mode enabled
- No `any` types. Use proper typing or `unknown`.
- Define interfaces for all props, API responses, and data models.
- Use type inference where obvious, explicit types where helpful.
-->

## Framework

- {{FRAMEWORK_RULE_1}}
- {{FRAMEWORK_RULE_2}}

<!-- Examples for Next.js:
- Server components by default. Only use `'use client'` when needed.
- Server Actions for form submissions and simple mutations.
- API routes for: webhooks, file uploads with progress, long-running operations,
  specific HTTP status codes/headers, mobile/CLI clients, third-party integrations.
- Otherwise fetch directly in server components.
-->

## Styling

<!-- Critical version-specific rules go here. The DevStash project flagged Tailwind v4
     uses CSS-based config and no JS config file. That's the kind of thing that needs
     to be locked in early or Claude will revert to old patterns. -->

- {{STYLING_RULE_1}}
- {{STYLING_RULE_2}}

## File Organization

- {{LAYER_1}}: `{{PATH_1}}`
- {{LAYER_2}}: `{{PATH_2}}`
- {{LAYER_3}}: `{{PATH_3}}`

<!-- Examples:
- Components: `src/components/[feature]/ComponentName.tsx`
- Pages: `src/app/[route]/page.tsx`
- Server Actions: `src/actions/[feature].ts`
- Types: `src/types/[feature].ts`
- Lib/Utils: `src/lib/[utility].ts`
-->

## Naming

- Components: {{CASE_1}}
- Files: {{FILE_NAMING_RULE}}
- Functions: {{CASE_2}}
- Constants: {{CASE_3}}
- Types/Interfaces: {{CASE_4}}

## Database

- {{DB_RULE_1}}
- {{DB_RULE_2}}

<!-- Critical: include any "never use this command" rules. DevStash had:
     "Always use `prisma migrate dev`, never `db push`. Run `prisma migrate status`
     before committing. Production runs `prisma migrate deploy` before app start."
-->

## Data Fetching

- {{FETCH_RULE_1}}
- {{FETCH_RULE_2}}
- Validate all inputs with {{VALIDATION_LIB}}.

## Error Handling

- {{ERROR_RULE_1}}
- {{ERROR_RULE_2}}

<!-- Example return shape: `{ success, data, error }` -->

## Testing

- **Framework:** {{TEST_FRAMEWORK}}
- **Scope:** {{TEST_SCOPE}}
- **File pattern:** {{TEST_FILE_PATTERN}}
- **Run:** `{{TEST_COMMAND}}` (single run) or `{{TEST_WATCH_COMMAND}}` (watch mode)

## Code Quality

- No commented-out code unless explicitly requested.
- No unused imports or variables.
- Keep functions under 50 lines when possible.
- {{ADDITIONAL_RULE_1}}
- {{ADDITIONAL_RULE_2}}
