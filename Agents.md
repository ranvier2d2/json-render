## json-render agent notes

### Shadcn usage with json-render
- You can use Shadcn UI components with json-render by mapping them in the React registry.
- Define catalog entries (props and allowed components) that align with the Shadcn components you want to expose.
- Register those components in the React registry used by the Renderer/JSONUIProvider.
- The web app already includes a Shadcn configuration file at apps/web/components.json.
