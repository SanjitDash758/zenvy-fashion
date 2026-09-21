# Zenvy Fashion — Baby Saree E-Commerce

An end-to-end online store for a Bangladeshi fashion brand. Customers browse products, add to cart, check out, and track orders. The store owner manages inventory and orders from a custom admin dashboard, and gets a Telegram alert the moment a new order is placed.

**Live:** [zenvyfashion.com](https://zenvyfashion.com)

---

## Stack

| Layer         | Choice                                         |
| ------------- | ---------------------------------------------- |
| Frontend      | Next.js 16 · React 19 · TypeScript · Tailwind  |
| Commerce      | WordPress · WooCommerce · WooCommerce REST API |
| Database      | Supabase (PostgreSQL) · MySQL                  |
| Auth          | bcryptjs · HMAC-SHA256 · Row-Level Security    |
| Notifications | Telegram Bot API · Webhooks                    |
| Deployment    | Vercel · Hostnin · GitHub · Cloudflare         |
| Tools         | Docker · Git · Node.js · ESLint                |

---

## Architecture

```
Customer
  │
  ▼
Next.js storefront ──► WooCommerce REST API ──► MySQL
        │                       │
        │                       ▼
        │              Telegram Bot API ──► Owner's phone
        ▼
  Supabase (PostgreSQL)
  (product views, order metadata, RLS-protected reads)
```

**Why two databases?** WooCommerce owns the transactional truth — products, orders, payments. Supabase carries the parts WooCommerce handles awkwardly: fast reads, RLS-scoped access for the admin dashboard, and a clean API for the Next.js frontend.

**Why a Telegram bot?** The owner needed immediate order notifications. Email was too slow, SMS cost money per message, and building a push app was overkill. Telegram is free, instant, and the owner already used it.

---

## Running locally

```bash
npm install
npm run dev
```

Opens at `http://localhost:3000`.

### Environment variables

Create `.env.local` at the project root:

```
WOOCOMMERCE_URL=https://zenvyfashion.com
WOOCOMMERCE_KEY=your_consumer_key
WOOCOMMERCE_SECRET=your_consumer_secret
SUPABASE_URL=https://xxxx.supabase.co
SUPABASE_ANON_KEY=your_anon_key
TELEGRAM_BOT_TOKEN=your_bot_token
TELEGRAM_CHAT_ID=owner_chat_id
```

None of these are committed. `.env*.local` is in `.gitignore`.

---

## Order flow

1. Customer adds items to cart — state persists in `localStorage`.
2. Checkout POSTs to WooCommerce's `/orders` endpoint.
3. On success, a webhook fires to the Next.js API route.
4. That route calls the Telegram Bot API — the owner receives a formatted message with order ID, customer name, items, and total.
5. Order appears in the admin dashboard, backed by Supabase.

---

## Security

- Admin routes are gated by server-side session checks.
- Passwords are hashed with **bcryptjs**.
- API requests to internal services are signed with **HMAC-SHA256**.
- Supabase reads use **Row-Level Security** — the admin sees everything, an anonymous visitor sees only published products.

---

## Deployment

- **Storefront:** Vercel, auto-deployed on push to `main`.
- **WooCommerce:** Hostnin shared hosting, behind Cloudflare.
- **DNS / Proxy:** Cloudflare.

---

## Notes

- Payment integration uses WooCommerce's built-in gateway. The store currently supports cash-on-delivery and bKash.
- Image assets are served through Cloudflare's CDN.
- The admin dashboard is intentionally minimal — one screen for orders, one for products, one for customers.
