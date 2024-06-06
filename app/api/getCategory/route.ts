import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
import { google } from "googleapis";
import { getSession } from "next-auth/react";
import OpenAI from "openai";


export async function POST(req: NextRequest) {
    try{
        
        // const link = new URL(req.url);
        // const message: any = link.searchParams.get("msg");
        // const key: any = link.searchParams.get("key");
        const body: any = await req.json();
        const { key, message } = body;

        // console.log("Key: ", key);
        // console.log("Message: ", message);

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
        model: "gpt-3.5-turbo",
        });

        console.log("Completion: ", completion.choices[0].message["content"]);
        
        const responseContent: any = completion.choices[0].message["content"];
        if (!responseContent) {
            throw new Error("No content in completion response");
        }

        // console.log("Response content: ", responseContent);
        

        return NextResponse.json({
            msg: responseContent
        }, { status: 200 });
  } 
  catch (error: any) {
    return NextResponse.json({ msg: "General" }, { status: 500 });
  }
}
