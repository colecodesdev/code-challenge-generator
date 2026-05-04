# Project Overview: {{PROJECT_NAME}}

> **{{ONE_LINE_PITCH}}**

---

## Table of Contents

1. [Problem & Vision](#1-problem--vision)
2. [Target Users](#2-target-users)
3. [Tech Stack](#3-tech-stack)
4. [Architecture Overview](#4-architecture-overview)
5. [Data Models](#5-data-models)
6. [Features](#6-features)
7. [{{DOMAIN_OBJECTS_SECTION_NAME}}](#7-domain-objects)
8. [UI/UX Guidelines](#8-uiux-guidelines)
9. [Monetization](#9-monetization)
10. [URL Structure](#10-url-structure)
11. [{{INTEGRATIONS_SECTION_NAME}}](#11-integrations)
12. [Key Dependencies & Links](#12-key-dependencies--links)

---

## 1. Problem & Vision

{{PROBLEM_STATEMENT}}

| What | Where it ends up today |
|---|---|
| {{SCATTERED_THING_1}} | {{CURRENT_LOCATION_1}} |
| {{SCATTERED_THING_2}} | {{CURRENT_LOCATION_2}} |
| {{SCATTERED_THING_3}} | {{CURRENT_LOCATION_3}} |

**{{PROJECT_NAME}}** solves this with {{ONE_SENTENCE_SOLUTION}}.

---

## 2. Target Users

| Persona | Core Need |
|---|---|
| **{{PERSONA_1}}** | {{NEED_1}} |
| **{{PERSONA_2}}** | {{NEED_2}} |
| **{{PERSONA_3}}** | {{NEED_3}} |

---

## 3. Tech Stack

| Layer | Technology |
|---|---|
| **Framework** | {{FRAMEWORK}} |
| **Language** | {{LANGUAGE}} |
| **Database** | {{DATABASE}} |
| **ORM / DB Layer** | {{ORM}} |
| **Auth** | {{AUTH}} |
| **File Storage** | {{STORAGE}} |
| **AI / ML** | {{AI_PROVIDER}} (if applicable) |
| **CSS / Styling** | {{CSS}} |
| **Components** | {{UI_LIBRARY}} |
| **Caching** | {{CACHE}} |
| **Payments** | {{PAYMENTS}} (if applicable) |
| **Testing** | {{TEST_FRAMEWORK}} |
| **Hosting** | {{HOSTING}} |

> **{{STACK_RULE_1_TITLE}}**: {{STACK_RULE_1_BODY}}
> e.g., "Database rule: never use `db push`. Always create and run migrations."

---

## 4. Architecture Overview

```
{{ASCII_ARCHITECTURE_DIAGRAM}}
```

<!-- Replace with an ASCII diagram of the major components and data flow.
     Keep it under 25 lines. Show: client, server boundaries, data stores,
     and external services. -->

---

## 5. Data Models

```{{SCHEMA_LANGUAGE}}
// {{SCHEMA_FILE_PATH}}

{{SCHEMA_PASTE_HERE}}
```

<!-- Paste the schema (Prisma, SQL DDL, types, GraphQL, etc.).
     Keep it as the source of truth. Update when migrations land. -->

---

## 6. Features

### Core Features (All Users)

- {{FEATURE_1}}
- {{FEATURE_2}}
- {{FEATURE_3}}

### {{TIERED_FEATURES_SECTION}} Features (e.g., Pro / Enterprise / Admin only)

- {{TIERED_FEATURE_1}}
- {{TIERED_FEATURE_2}}

---

## 7. Domain Objects

<!-- Examples: item types, content types, resource types, entity kinds.
     Whatever the project's primary nouns are. -->

| Type | Icon | Color | {{ATTR_1}} | {{ATTR_2}} | URL Pattern |
|---|---|---|---|---|---|
| {{TYPE_1}} | {{ICON_1}} | {{COLOR_1}} | {{V_1_1}} | {{V_1_2}} | {{ROUTE_1}} |
| {{TYPE_2}} | {{ICON_2}} | {{COLOR_2}} | {{V_2_1}} | {{V_2_2}} | {{ROUTE_2}} |

---

## 8. UI/UX Guidelines

### Design Principles

- {{PRINCIPLE_1}}
- {{PRINCIPLE_2}}
- {{PRINCIPLE_3}}
- Reference designs: {{REFERENCE_LINKS}}

### Screenshots

Reference the screenshots below as a base for the {{KEY_VIEW}} UI. Use as a reference, not exact reproduction.

- @context/screenshots/{{SCREENSHOT_1}}
- @context/screenshots/{{SCREENSHOT_2}}

### Layout

```
{{ASCII_LAYOUT_DIAGRAM}}
```

### Micro-interactions

- {{INTERACTION_1}}
- {{INTERACTION_2}}

---

## 9. Monetization

<!-- Delete this section if not applicable. -->

### Tiers

| Feature | Free | {{PAID_TIER_NAME}} ({{PRICE}}) |
|---|---|---|
| {{FEATURE_A}} | {{FREE_LIMIT_A}} | {{PAID_LIMIT_A}} |
| {{FEATURE_B}} | {{FREE_LIMIT_B}} | {{PAID_LIMIT_B}} |

> **During development:** {{DEV_TIER_BEHAVIOR}}

### Payment Integration

- {{PAYMENT_DETAIL_1}}
- {{PAYMENT_DETAIL_2}}

---

## 10. URL Structure

```
/                          → {{ROUTE_DESCRIPTION}}
/{{ROUTE_1}}               → {{DESCRIPTION_1}}
/{{ROUTE_2}}/[id]          → {{DESCRIPTION_2}}
/auth/{{AUTH_ROUTE}}       → {{AUTH_DESCRIPTION}}
/settings                  → {{SETTINGS_DESCRIPTION}}
```

---

## 11. Integrations

<!-- AI providers, payment processors, third-party APIs. Delete if not applicable. -->

| Integration | Purpose | Trigger |
|---|---|---|
| {{INTEGRATION_1}} | {{PURPOSE_1}} | {{TRIGGER_1}} |
| {{INTEGRATION_2}} | {{PURPOSE_2}} | {{TRIGGER_2}} |

{{INTEGRATION_NOTES}}

---

## 12. Key Dependencies & Links

### Documentation

| Tool | Link |
|---|---|
| {{TOOL_1}} | {{DOC_LINK_1}} |
| {{TOOL_2}} | {{DOC_LINK_2}} |

### Key Packages

```{{PACKAGE_FORMAT}}
{{KEY_PACKAGES_BLOCK}}
```

### {{MIGRATION_OR_SETUP_WORKFLOW_TITLE}}

```bash
{{KEY_COMMANDS_BLOCK}}
```

---

*Last updated: {{DATE}}*
