# ACCESS — Premium Electronics Archive

ACCESS is a dark, editorial-style storefront demo for premium consumer tech and BTS-inspired collections. Browse the product archive, narrow it down with search and filters, inspect product details, and build a shopping cart.

> This repository is a front-end demo. Product data is local, cart state is held in memory, and there is no checkout, payment processing, or connected inventory service.

## Features

- Responsive storefront with a cinematic intro, category discovery, featured products, and promotional sections.
- Product archive with category, text, price, and sort controls.
- Product detail pages and quick-view modal.
- Cart drawer and cart page with quantity controls, discounts, shipping estimates, and demo voucher codes.
- Toast notifications, route scroll handling, and a back-to-top control.
- Product and collection catalog data maintained in `src/data/products.js`.

## Getting started

### Prerequisites

- Node.js and npm

### Install and run

```bash
npm install
npm run dev
```

Open the local URL printed by Vite (usually `http://localhost:5173`).

## Available scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Start the Vite development server with hot reload. |
| `npm run build` | Create a production build in `dist/`. |
| `npm run preview` | Serve the production build locally. |
| `npm run lint` | Run ESLint across the project. |

## Routes

| Path | Description |
| --- | --- |
| `/` | Storefront home page. |
| `/products` | Searchable and filterable product archive. |
| `/product/:id` | Product details for a catalog item. |
| `/cart` | Cart summary and demo voucher entry. |

The cart starts with a sample item to demonstrate the cart experience. Cart changes are not persisted after the page reloads.

## Demo voucher codes

The cart accepts these in-memory demo codes:

- `ACCESS2026`, `FLAGSHIP15`, or `BTS2026` — 15% off.
- `PRODIGY10` or `VIP10` — 10% off.

## Project structure

```text
src/
  components/   Shared storefront UI, overlays, and product cards
  context/      Cart state and cart actions
  data/         Product, category, and collection catalog
  pages/        Home, products, product details, and cart pages
  App.jsx       Router and application shell
  main.jsx      React entry point
public/         Static public assets
```

## Tech stack

- React 19 and React Router
- Vite
- Tailwind CSS 4
- Lucide icons

Product photography is loaded from Unsplash, and the interface uses Google Fonts. Those assets need an internet connection to load.
