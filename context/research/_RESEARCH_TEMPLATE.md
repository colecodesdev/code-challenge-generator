# {{RESEARCH_TOPIC}}

<!--
This file is the input to the `/research <name>` skill.
The skill reads this file, executes the research, and writes findings to the Output path below.
-->

## Output

<!-- Where the research findings should be written. Typically docs/<topic>.md. -->

`docs/{{OUTPUT_FILENAME}}.md`

## Research

<!--
What to investigate. Be specific about the question(s) being answered.
Multi-question is fine. Bullet list is fine.
-->

{{RESEARCH_QUESTION_OR_DESCRIPTION}}

- {{SUB_QUESTION_1}}
- {{SUB_QUESTION_2}}

## Include

<!--
Specific topics, sections, or details the output should cover.
Treat this as the table of contents for the eventual research doc.
-->

- {{INCLUDE_TOPIC_1}}
- {{INCLUDE_TOPIC_2}}
- {{INCLUDE_TOPIC_3}}
- {{INCLUDE_TOPIC_4}}

## Sources

<!--
What to read or query during research:
- Project files (use @path/to/file)
- Web docs (full URLs)
- MCP-connected tools (Neon, GitHub, Linear, etc.)
- Web search topics
-->

- @context/project-overview.md
- @{{RELEVANT_PROJECT_FILE}}
- {{EXTERNAL_DOC_URL}}
- Web search for: {{SEARCH_TOPIC}}
