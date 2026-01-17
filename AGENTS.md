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

## Additional agent notes

- Place directory-specific guidance in nested AGENTS.md files.
- Shadcn integration guidance is in apps/web/AGENTS.md.

## Shadcn json-render wiring overview

The web app exposes Shadcn UI components for JSON-driven rendering via two
explicit symbols:

- Catalog: `shadcnCatalog` in `apps/web/lib/shadcn-catalog.ts`.
- Registry: `shadcnRegistry` in `apps/web/components/shadcn-registry.tsx`.

### Catalog shape and extension

`shadcnCatalog` is created via `createCatalog` and defines a `components` map
keyed by the component type names the LLM should emit (for example, `Badge`,
`Button`, `Card`, `Sheet`, `SheetTrigger`, `SheetContent`, `SheetHeader`,
`SheetFooter`, `SheetTitle`, `SheetDescription`, `SheetClose`, `Tabs`,
`TabsList`, `TabsTrigger`, `TabsContent`). Each entry defines a `props` Zod
schema and, when needed, `hasChildren: true`. To extend the catalog, add a new
component entry to `shadcnCatalog.components` in `shadcn-catalog.ts` and ensure
the new key matches the registry key in `shadcn-registry.tsx`.

### Registry wiring

`shadcnRegistry` maps catalog component type names to React components using the
`ComponentRegistry` shape. Each entry reads `element.props` and renders the
matching Shadcn component (for example, `SheetContent` reads the `side` prop and
passes it to the `Sheet` variant). To wire the registry into the renderer flow,
pass it to the `Renderer` or `JSONUIProvider` as the `registry` prop and use
`generateCatalogPrompt(shadcnCatalog)` to constrain model output to the catalog.

### Validation rules

- Catalog keys must match registry keys exactly (for example, `SheetContent` in
  `shadcnCatalog` must map to a `SheetContent` entry in `shadcnRegistry`).
- Catalog `props` schemas must align with the registry component props. If a
  prop is required in the renderer, make it required in the Zod schema.
- For nested components (for example, `Sheet` or `Tabs`), set `hasChildren: true`
  so the renderer can attach child elements.

### Example JSON targeting Shadcn components

Example element tree that uses the Sheet variants:

```json
{
  "root": "sheet",
  "elements": {
    "sheet": {
      "key": "sheet",
      "type": "Sheet",
      "props": {},
      "children": ["trigger", "content"]
    },
    "trigger": {
      "key": "trigger",
      "type": "SheetTrigger",
      "props": { "text": "Open" }
    },
    "content": {
      "key": "content",
      "type": "SheetContent",
      "props": { "side": "right" },
      "children": ["title", "description"]
    },
    "title": {
      "key": "title",
      "type": "SheetTitle",
      "props": { "text": "Profile" }
    },
    "description": {
      "key": "description",
      "type": "SheetDescription",
      "props": { "text": "Update your settings" }
    }
  }
}
```

The renderer resolves `type` values by matching them against `shadcnCatalog`
schemas and looking up the same keys in `shadcnRegistry` to render the correct
Shadcn components.
