# React Bits MCP Setup

This project is configured to use the shadcn MCP server with the React Bits registry.

## Applied Setup

- MCP config generated at `.cursor/mcp.json`.
- `components.json` includes:
  - `"@react-bits": "https://reactbits.dev/r/{name}.json"`

## In Cursor

1. Open Cursor settings and enable MCP servers.
2. Ensure `shadcn` server is active.
3. Use prompts such as:
   - "Show me all available backgrounds from React Bits registry"
   - "Add Dither background from React Bits and make it purple"
   - "Add FadeContent based section"

## Important Note for React Native

React Bits/shadcn components are generally web-focused. For this mobile codebase:

- Use MCP to discover design patterns and assets.
- Port behavior and styles into React Native components manually.
- Keep platform-safe primitives (`View`, `Text`, `Pressable`, etc.) for app runtime compatibility.
