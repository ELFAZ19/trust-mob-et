# MVP Scope and Phase Boundaries

## Product Scope Decision

The app is implemented as one React Native application with role-guarded modules.

### In Scope for Mobile MVP

- Buyer onboarding and profile basics
- Marketplace discovery and listing details
- Order creation and escrow status visibility
- Delivery timeline tracking
- Buyer review and rating submission
- Merchant catalog and order management
- Service provider listing and request handling
- Merchant basic analytics snapshots

### Out of Scope for Mobile MVP

- Full admin operations (merchant verification, dispute console, moderation tools)
- Advanced route optimization and fleet operation tooling
- Full financial reconciliation tooling

## Phase Boundaries

### Phase 0

- Foundation and architecture
- Supabase contract map
- Auth and navigation shell

### Phase 1 (Buyer)

- Sign in, profile completion, address management
- Discovery and detail screens
- Order and escrow status timeline
- Review submission and reputation reflection

### Phase 2 (Merchant and Service Provider)

- Catalog + service listing management
- Incoming order/service request handling
- Basic analytics views

### Phase 3 (Trust, Realtime, Delivery Experience)

- Realtime status subscriptions
- Trust score presentation
- Delivery event timeline synchronization

### Phase 4 (Revenue and Hardening)

- Promotions and boosts
- Reliability guards, retry, offline-safe UX
- Release checklist and QA completion
