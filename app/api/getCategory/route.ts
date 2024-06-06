import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
import { google } from "googleapis";
import { getSession } from "next-auth/react";
import OpenAI from "openai";


export async function GET(req: NextRequest) {
    try{
        
        const link = new URL(req.url);
        const message: any = link.searchParams.get("msg");
        const key: any = link.searchParams.get("key");


        const openai = new OpenAI({ apiKey: key });

        const completion = await openai.chat.completions.create({
        messages: [
            {
            role: "assistant",
            content: `${message}\n This is a part of an email. Determine to which of the following categories this email belongs to:
                - Important: Emails that are personal or work-related and require immediate attention.
                - Promotions: Emails related to sales, discounts, and marketing campaigns.
                - Social: Emails from social networks, friends, and family.
                - Marketing: Emails related to marketing, newsletters, and notifications.
                - Spam: Unwanted or unsolicited emails.
                - General: If none of the above are matched, use General.
                Please reply with just the Category name.`,
            },
        ],
        model: "gpt-4o",
        });

        const responseContent: any = completion.choices[0].message["content"];

        console.log("Response content: ", responseContent);
        

        return NextResponse.json({
            msg: "Hello!"
        }, { status: 200 });
  } 
  catch (error: any) {
    return NextResponse.json({ error: "Failed to get label!" }, { status: 500 });
  }
}
