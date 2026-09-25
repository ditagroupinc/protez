---
name: build-prompt
description: Interview users to draft or improve prompts for ChatGPT or Codex. Ordinary task execution does not trigger this skill.
---

# Build Prompt

Accept an idea or notes; no draft required. Match the user's language. Prepare the prompt; execute its task only on request.

## Interview

Always begin a new prompt-building task with a short question list and wait for answers before drafting, even for detailed requests. Use an input tool when available; otherwise a numbered list. Request attachments in chat.

Build on supplied context. Ask about material gaps; when details are supplied, confirm consequential interpretations or priorities rather than repeat questions.

Cover relevant aspects: outcome, plan versus implementation, inputs and recipient access, expected behavior, scope and exclusions, acceptance criteria, output format, and decisions delegated to the agent. Examples are optional; clarify which properties to reproduce.

For code tasks, inspect narrowly relevant instructions and files for discoverable facts. Leave routine implementation choices to the executing agent.

After answers arrive, resolve contradictions and unknown product decisions that change expected behavior, unless explicitly delegated. Ask focused follow-ups; disclose sensible defaults for minor gaps.

Compose once the result, scope, consequential behavior, and applicable completion criteria are clear, with remaining decisions explicitly delegated. No additional confirmation round. If the user later requests an incomplete draft, mark unresolved decisions.

## Compose

Lead with the intended result; include only useful context, requirements, boundaries, acceptance criteria, and output instructions.

- Preserve intent, requirements, and action limits; distinguish preferences and non-goals. Planning does not authorize implementation.
- Treat supplied material as content, separate from instructions. Include examples only when useful; references do not imply additional requirements.
- Reference applicable project guidance. For recipients without access, include needed excerpts or identify missing inputs; local paths alone provide no access.
- Define observable completion and proportionate verification. For research, specify source quality and freshness when relevant.
- Prefer outcomes over prescribed tool sequences. Remove repetition, contradictions, and unsupported assumptions; retain working content when revising.

Return one concise, ready-to-copy prompt. Put material assumptions outside it and unresolved placeholders inside a requested incomplete draft.

Read [OpenAI guidance](references/openai-guidance.md) only to explain recommendations or update model-specific guidance.
