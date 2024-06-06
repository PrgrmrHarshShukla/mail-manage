
## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

You also need to set up the following environment variables after configuring your project on Google Developer Console.
```bash

GOOGLE_CLIENT_ID="your-google-client-id"
GOOGLE_CLIENT_SECRET="your-google-client-secret"
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="random-secret"
GOOGLE_REDIRECT_URI="http://localhost:3000/api/auth/callback/google"
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.


