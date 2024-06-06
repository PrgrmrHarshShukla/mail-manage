

import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
import { google } from "googleapis";

export async function GET(req: NextRequest) {
    // Extract the authorization code from the request query parameters
    const link = new URL(req.url);
    console.log("\n\n\n######\nlink: \n######\n", link);

    const code: any = link.searchParams.get("code");

    console.log("code: ", code);

    const auth = new google.auth.OAuth2({
        clientId: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        redirectUri: `${process.env.NEXTAUTH_URL}/api/auth/callback/google`,
    });
    
    try {
        const { tokens } = await auth.getToken(code);

        // Set the access token in the authentication client
        auth.setCredentials(tokens);

        // Redirect the user to the /emails route after successful authentication
        return NextResponse.redirect("/emails");
    } 
    catch (error: any) {
        console.error("Error exchanging authorization code for access token:", error);
        return NextResponse.json({msg: "Failed to exchange authorization code for access token"}, { status: 500 });
    }
}
