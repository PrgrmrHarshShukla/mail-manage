import GoogleProvider from "next-auth/providers/google";
import { NextAuthOptions } from "next-auth";
import NextAuth from "next-auth";
import { prisma } from "../../../lib/prisma";

const GOOGLE_CLIENT_ID: any = process.env.GOOGLE_CLIENT_ID;
const GOOGLE_CLIENT_SECRET: any = process.env.GOOGLE_CLIENT_SECRET;


export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: GOOGLE_CLIENT_ID,
      clientSecret: GOOGLE_CLIENT_SECRET,
      authorization: {
        params: {
          scope: "openid email profile https://www.googleapis.com/auth/gmail.readonly",
        },
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  // debug: true,
  callbacks: {
  //   async signIn({ user, account, profile, email, credentials }) {
  //     console.log('signIn callback:', { user, account, profile, email, credentials });
  //     return "/emails";
  //   },
  //   async redirect({ url, baseUrl }) {
  //     console.log('redirect callback:', { url, baseUrl });
  //     return baseUrl;
  //   },
  async jwt({ token, user, account, profile }) {
    // console.log('jwt callback:', { token, user, account, profile });
      if(account) token.accessToken = account.access_token;
      return token;
    },
    async session({ session, user, token }: {session: any, user: any, token: any}) {
      // console.log('session callback:', { session, user, token });
      session.accessToken = token.accessToken;
      return session;
    },
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };








// const authOption: NextAuthOptions = {
//     session: {
//         strategy: "jwt",
//     },
//     providers: [
//         GoogleProvider({
//             clientId: GOOGLE_CLIENT_ID,
//             clientSecret: GOOGLE_CLIENT_SECRET,
//         }),
//     ],
//     callbacks: {
//         async signIn({ account, profile }) {
//             if(!profile?.email){
//                 throw new Error("No profile")
//             }

//             await prisma.Mailuser.upsert({
//                 where: {
//                     email: profile.email,
//                 },
//                 create: {
//                     email: profile.email,
//                     name: profile.name,
//                 },
//                 update: {
//                     name: profile.name,
//                 }
//             })

//             return true;

//         },
//         // session,
//         async jwt({ token, user, account, profile }) {
//             if(profile) {
//                 const user = await prisma.Mailuser.findUnique({
//                     where: {
//                         email: profile.email,
//                     }
//                 })
//                 if(!user){
//                     throw new Error("No user found")
//                 }
//                 token.id = user.id
//             }
//             return token;
//         }
//     }
// }


// const handler = NextAuth(authOption);
// export { handler as GET, handler as POST };