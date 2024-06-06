import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
import { google } from "googleapis";

export async function GET(req: NextRequest) {
  const token: any = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

  if (!token) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const auth = new google.auth.OAuth2();
  auth.setCredentials({ 
    access_token: token.accessToken 
  });

  const gmail = google.gmail({ version: "v1", auth });
  try {
    const response = await gmail.users.messages.list({
      userId: "me",
      maxResults: 100,
    });

    return NextResponse.json(response.data, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch emails" }, { status: 500 });
  }
}
