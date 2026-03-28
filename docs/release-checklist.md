# Release Checklist (MVP)

## Product Readiness

- [ ] Buyer discovery, order, escrow, tracking, and review flows validated
- [ ] Merchant catalog, order handling, analytics screens validated
- [ ] Service provider listing and request handling validated
- [ ] Promotions purchase flow tested against Edge Function

## Technical Readiness

- [ ] Environment variables set for production Supabase project
- [ ] RLS policy audit completed for all touched tables
- [ ] Realtime subscriptions and polling fallback validated
- [ ] Error/retry behavior verified on unstable network

## QA and UAT

- [ ] Android test pass
- [ ] iOS test pass
- [ ] Smoke tests for login, order creation, and escrow visibility
- [ ] UAT sign-off with business stakeholders

## Launch

- [ ] Build artifacts generated
- [ ] Monitoring and alerts enabled
- [ ] Rollback plan documented
