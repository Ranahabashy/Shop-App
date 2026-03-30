# Shop App

A responsive Next.js product browser built for the Frontend Developer Technical Task.

## What is included

- Product listing in a responsive grid
- Search by title
- Filter by category
- Product details page
- Registration and login flow
- JWT-based mock authentication
- API caching strategy through app-side API routes and configurable query caching
- Clean architecture inspired structure with reusable UI components
- Tailwind-based modern UI
- Pagination

## Tech stack

- Next.js 15
- TypeScript
- Tailwind CSS
- React Hook Form + Zod
- Zustand
- Axios
- Jose (JWT)

## Architecture

This project is split into layers to keep the code clean and scalable:

- `src/domain`: entities and repository contracts
- `src/application`: use cases and service container
- `src/infrastructure`: API implementations and HTTP client
- `src/components`: reusable presentation components
- `app/api`: route handlers that isolate external integrations

This makes it easier to swap APIs later without rewriting the UI.

## Endpoints used

### Internal app endpoints

- `POST /api/mock-auth/register`
- `POST /api/mock-auth/login`
- `GET /api/mock-auth/me`
- `POST /api/mock-auth/logout`
- `GET /api/products`
- `GET /api/products/categories`
- `GET /api/products/:id`

### External upstream endpoints

The app proxies product data from DummyJSON:

- `GET https://dummyjson.com/products`
- `GET https://dummyjson.com/products/search?q=term`
- `GET https://dummyjson.com/products/category/:slug`
- `GET https://dummyjson.com/products/category-list`
- `GET https://dummyjson.com/products/:id`

For real seeded login testing, you can also use:

- `POST https://dummyjson.com/auth/login`

## Demo credentials

### Local mock user

- username: `demo`
- password: `Demo@12345`

### DummyJSON seeded user

- username: `emilys`
- password: `emilyspass`

## How to run

```bash
npm install
cp  .env.local
npm run dev
```

Open `http://localhost:3000`.

## Notes

- Registration is implemented through a local mock endpoint so the full task flow works from scratch.
- Product data is fetched through app API routes to keep the frontend independent from the external provider.
- Mock users are stored in-memory for demo purposes, so new registered users reset when the server restarts.

## Suggested improvements if you want to push it further

- Unit tests with Jest and React Testing Library
- Protected routes middleware
- Favorites or cart module
- Server-side auth persistence using a database
- Debounced search input
- Image gallery slider on product details page
