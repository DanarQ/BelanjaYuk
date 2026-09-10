# Routing BelanjaYuk

React Router runs in declarative mode with BrowserRouter in `src/main.tsx`.
Routes live in `src/App.tsx`. `StoreLayout` renders Header, Outlet, and Footer.
Add new page components under `src/pages` and register them inside the layout route.

| URL | Page |
| --- | --- |
| `/` | Existing storefront |
| `/produk?q=kata&kategori=Fashion` | Demo catalog; URL-driven search and category filter |
| `/produk/:productId` | Detail from the recommendations demo catalog |
| `/keranjang`, `/wishlist` | Explicit feature placeholders |
| `/masuk`, `/daftar` | Explicit authentication placeholders |
| Other paths | Not-found page |

Use Link for internal navigation and useNavigate for search/category actions.
Home-section links in the shared footer use `/#section-id` so they also work from other pages.
The layout handles scrolling to the top or a section after navigation.

Product details currently use IDs from `src/data/recommendations.ts`. Flash-sale
and bestseller datasets remain independent; do not link their IDs to details
until they share a catalog. No cart, authentication, or checkout backend is implemented.

## Deployment

This is a browser-history SPA. Configure the production host to serve
`frontend/dist/index.html` for frontend routes such as `/produk/headphone`.
Keep static assets and backend API paths outside that fallback. Without this
rewrite, refreshing a nested URL may return a server 404. Vite handles this locally.

## Verification

Run `bun --filter frontend build` and `bun --filter frontend lint`.
Check navbar search, category selection, recommendation-to-detail navigation,
browser back/forward, nested URL refresh, unknown product/URL, and footer links
back to home sections.
