# Supabase Contract Map

This document maps backend contracts to mobile feature modules.

## Auth and Profiles

- Tables:
  - `profiles`
  - `addresses`
- Auth:
  - Supabase Auth session (`auth.users`)
- Mobile modules:
  - `src/core/auth`
  - `src/features/addresses`

## Marketplace

- Tables:
  - `merchants`
  - `merchant_products`
  - `service_providers`
  - `provider_services`
- RPC/Views (recommended):
  - `rpc.search_marketplace`
  - `view.marketplace_cards`
- Mobile modules:
  - `src/features/discovery`
  - `src/features/catalog`

## Orders, Escrow, Logistics

- Tables:
  - `orders`
  - `order_items`
  - `escrow_transactions`
  - `delivery_events`
- Edge Functions (recommended):
  - `create-order`
  - `initiate-mpesa-payment`
  - `update-escrow-status`
  - `release-escrow`
- Mobile modules:
  - `src/features/orders`
  - `src/features/payments`
  - `src/features/tracking`

## Reviews and Trust

- Tables:
  - `reviews`
  - `merchant_trust_metrics`
- RPC/Views (recommended):
  - `rpc.calculate_trust_score`
  - `view.merchant_reputation`
- Mobile modules:
  - `src/features/reviews`
  - `src/features/trust`

## Promotion and Revenue

- Tables:
  - `promotion_orders`
  - `promotion_campaigns`
  - `platform_fees`
- Edge Functions (recommended):
  - `purchase-boost`
  - `verify-boost-payment`
- Mobile modules:
  - `src/features/promotions`

## Realtime Channels

- `orders:{order_id}`
- `delivery:{order_id}`
- `merchant:{merchant_id}:orders`

## RLS Expectations

- Buyer can read/write own profile, addresses, orders, and reviews.
- Merchant can read own orders and write own products/listings.
- Service provider can write own services and requests.
- Promotions and payment-sensitive rows are write-restricted through Edge Functions.
