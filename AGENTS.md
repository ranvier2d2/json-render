# AGENTS.md

Instructions for AI coding agents working with this codebase.

## Code Style

- Do not use emojis in code or UI

## Workflow

- Run `pnpm type-check` after each turn to ensure type safety

<!-- opensrc:start -->

## Source Code Reference

Source code for dependencies is available in `opensrc/` for deeper understanding of implementation details.

See `opensrc/sources.json` for the list of available packages and their versions.

Use this source code when you need to understand how a package works internally, not just its types/interface.

### Fetching Additional Source Code

To fetch source code for a package or repository you need to understand, run:

```bash
npx opensrc <package>           # npm package (e.g., npx opensrc zod)
npx opensrc pypi:<package>      # Python package (e.g., npx opensrc pypi:requests)
npx opensrc crates:<package>    # Rust crate (e.g., npx opensrc crates:serde)
npx opensrc <owner>/<repo>      # GitHub repo (e.g., npx opensrc vercel/ai)
```

<!-- opensrc:end -->

## Shadcn usage with json-render

- You can use Shadcn UI components with json-render by mapping them in the React registry.
- Define catalog entries (props and allowed components) that align with the Shadcn components you want to expose.
- Register those components in the React registry used by the Renderer/JSONUIProvider.
- The web app includes a Shadcn configuration file at apps/web/components.json.

## Shadcn component updates

- Current Shadcn-derived components in apps/web/components/ui: badge, button, card, sheet, sonner, tabs.
- When updating Shadcn versions, validate compatibility with these components and their props before updating the registry or catalog schemas.

## Custom instructions with AGENTS.md

Give Codex extra instructions and context for your project.

### How Codex discovers guidance

Codex builds an instruction chain when it starts (once per run; in the TUI this usually means once per launched session). Discovery follows this precedence order:

- Global scope: In your Codex home directory (defaults to ~/.codex, unless you set CODEX_HOME), Codex reads AGENTS.override.md if it exists. Otherwise, Codex reads AGENTS.md. Codex uses only the first non-empty file at this level.
- Project scope: Starting at the project root (typically the Git root), Codex walks down to your current working directory. If Codex cannot find a project root, it only checks the current directory. In each directory along the path, it checks for AGENTS.override.md, then AGENTS.md, then any fallback names in project_doc_fallback_filenames. Codex includes at most one file per directory.
- Merge order: Codex concatenates files from the root down, joining them with blank lines. Files closer to your current directory override earlier guidance because they appear later in the combined prompt.
- Codex skips empty files and stops adding files once the combined size reaches the limit defined by project_doc_max_bytes (32 KiB by default). For details on these knobs, see Project instructions discovery. Raise the limit or split instructions across nested directories when you hit the cap.
