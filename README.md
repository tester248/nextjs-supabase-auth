# Next.js + Supabase Authentication POC

This is a proof of concept (POC) demonstrating authentication integration between Next.js 15 and Supabase.

## Features

- Email/password authentication
- Magic link sign-in
- Google social sign-in

## Getting Started

### Prerequisites

- Node.js 18+
- Supabase project ([get your URL and anon key](https://app.supabase.com/))

### Setup

1. Clone this repository
2. Install dependencies:
   ```bash
   npm install
   # or: yarn install / pnpm install / bun install
   ```
3. Create a `.env.local` file in the project root:
   ```
   NEXT_PUBLIC_SUPABASE_URL=your-supabase-url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
   ```

### Development

Start the dev server:

```bash
npm run dev
# or: yarn dev / pnpm dev / bun dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

- `app/` — Next.js app directory
- `app/auth-provider.tsx` — Auth context/provider
- `app/page.tsx` — Main page (protected)
- `app/login/` — Login page

## Deployment

Deploy to Vercel or any platform supporting Next.js 15.

## Troubleshooting

- **Dark Mode:** Ensure `globals.css` handles theme variables and no conflicting settings exist.
- **Cookie Errors:** Await all Supabase cookie operations.

## License

MIT
