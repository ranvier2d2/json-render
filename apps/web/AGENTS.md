## Shadcn usage with json-render

- You can use Shadcn UI components with json-render by mapping them in the React registry.
- Define catalog entries (props and allowed components) that align with the Shadcn components you want to expose.
- Register those components in the React registry used by the Renderer/JSONUIProvider.
- The web app includes a Shadcn configuration file at apps/web/components.json.

## Shadcn component updates

- Current Shadcn-derived components in apps/web/components/ui: badge, button, card, sheet, sonner, tabs.
- When updating Shadcn versions, validate compatibility with these components and their props before updating the registry or catalog schemas.
