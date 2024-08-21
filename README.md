### Assignment Submission Preview
![image](https://github.com/user-attachments/assets/47cec1c0-69a2-4f92-990d-6983ac8d3436)
![image](https://github.com/user-attachments/assets/0958f73a-63ff-46e2-86f1-526f78f44f13)

All the emails were fetched, but did not show all of them in the screenshot here.




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


