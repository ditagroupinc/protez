# OpenAI guidance

Checked 2026-09-21 for GPT-6 Astra. The interview workflow is our implementation of the recommendations, not an official OpenAI template.

- [ChatGPT prompting](https://learn.chatgpt.com/docs/prompting): describe the result, useful context, output, and meaningful boundaries. Include only relevant parts; refine through feedback.
- [Astra model guidance](https://developers.openai.com/api/docs/guides/latest-model): calibrate initiative, response style, and verification. Check for conflicting skill and project instructions.
- [Rethinking skills and prompts for Astra](https://developers.openai.com/blog/rethinking-skills-and-prompts-for-gpt-6-astra): define completion, keep skill triggers narrow, and avoid overprescribing workflows or loading irrelevant context.
- [Prompt engineering](https://developers.openai.com/api/docs/guides/prompt-engineering): separate instructions, examples, and context; evaluate prompt behavior on representative tasks.
- [Reasoning best practices](https://developers.openai.com/api/docs/guides/reasoning-best-practices): clear goals and constraints; examples when needed; avoid unnecessary chain-of-thought prompting. This page also contains older o-series and API-specific guidance; do not transfer its model settings to Astra or ChatGPT.

Prefer current Astra guidance over older generic recipes when they differ. Recheck official sources when updating model-specific advice; ordinary prompt drafting does not require a fresh documentation search.
