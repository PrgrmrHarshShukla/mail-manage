// import { NextRequest, NextResponse } from "next/server";
// import { getToken } from "next-auth/jwt";
// import { google } from "googleapis";
// import { redirect } from "next/dist/server/api-utils";

// export async function GET(req: NextRequest) {
// //   const token: any = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

// //   if (!token) {
// //     return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
// //   }

// //   const auth = new google.auth.OAuth2();
// //   auth.setCredentials({ 
// //     access_token: token.accessToken 
// //   });

// //   const gmail = google.gmail({ version: "v1", auth });

//     const link = new URL(req.url);
//     const state: any = link.searchParams.get("state");
//     const code: any = link.searchParams.get("code");
//     const prompt: any = link.searchParams.get("prompt");

//     console.log("state: ", state);
//     console.log("code: ", code);
//     console.log("prompt: ", prompt);



//   try {
//     // const response = await gmail.users.messages.list({
//     //   userId: "me",
//     //   maxResults: 100,
//     // });

//     // const obj: any = {
//     //     msg: "good to go!"
//     // }

//     return NextResponse.redirect("/emails");

//     // return NextResponse.json(, { status: 200 });
//   } catch (error) {
//     return NextResponse.json({ error: "Failed to redirect to emails" }, { status: 500 });
//   }
// }


// /api/auth/callback/google?
// state=kuQSY579ZvgDuVAYHMk1wrs-6Spl5f4Pa66VN-Ajjfc
// &
// code=4/0AdLIrYd_fl3sOjFW3wpyi18oVXafM2iFvRjU-IiNPmmvLoPrTAuXiZe-bo72isx4Rqe6Jg
// &
// scope=email%20profile%20https://www.googleapis.com/auth/gmail.readonly%20openid%20https://www.googleapis.com/auth/userinfo.profile%20https://www.googleapis.com/auth/userinfo.email
// &
// authuser=2
// &
// prompt=consent


import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
import { google } from "googleapis";

export async function GET(req: NextRequest) {
  // Extract the authorization code from the request query parameters
        const link = new URL(req.url);
        const state: any = link.searchParams.get("state");
        const code: any = link.searchParams.get("code");
        const prompt: any = link.searchParams.get("prompt");

        console.log("state: ", state);
        console.log("code: ", code);
        console.log("prompt: ", prompt);

  // Exchange the authorization code for an access token
  const auth = new google.auth.OAuth2({
    clientId: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    redirectUri: `${process.env.NEXTAUTH_URL}/api/auth/callback/google`, // Ensure this matches the authorized redirect URI in your Google Developer Console
  });
  
  try {
    const { tokens } = await auth.getToken(code);

    // Set the access token in the authentication client
    auth.setCredentials(tokens);

    // Redirect the user to the /emails route after successful authentication
    return NextResponse.redirect("/emails");
  } catch (error) {
    console.error("Error exchanging authorization code for access token:", error);
    return NextResponse.json({msg: "Failed to exchange authorization code for access token"}, { status: 500 });
  }
}
