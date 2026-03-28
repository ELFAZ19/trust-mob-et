# ታማኝ Mobile App

React Native application for the trusted hyperlocal commerce platform.

## MVP Scope

This repository follows a single-app, role-based structure:

- `buyer` experiences discovery, ordering, escrow visibility, tracking, and reviews.
- `merchant` manages catalog, confirms orders, and monitors performance.
- `serviceProvider` manages service listings and service requests.
- `admin` is intentionally out of mobile MVP and remains web-first.

## Tech Stack

- Expo + React Native + TypeScript
- Supabase (Auth, PostgREST, Realtime, Storage, Edge Functions)
- React Query for data fetching and cache
- React Navigation (stack + tabs)
- shadcn MCP server + React Bits registry for component discovery

## Quick Start

1. Copy `.env.example` to `.env`.
2. Fill in Supabase credentials.
3. Install dependencies:
   - `npm install`
4. Run:
   - `npm run start`

## Folder Guide

- `src/app`: navigation and app shell
- `src/core`: cross-cutting foundations (api, auth, guards, types, storage, observability)
- `src/features`: role and domain modules (discovery, orders, tracking, merchant, etc.)
- `docs`: scope, contracts, release checklist
- `stitch`: provided UI/UX references used for design token porting

## Design + MCP

- The mobile visual system is ported from `stitch/tamagn_trust_system/DESIGN.md` into React Native-safe components.
- React Bits MCP setup details are in `docs/react-bits-mcp.md`.
