"use client";

import { signIn, signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function Login() {
    const router = useRouter();
    const session = useSession();
    console.log("session in login: ", session);

    // if(session.status === "loading") return (
    //     <div className="text-green-500 font-bold text-xl">
    //         Loading...
    //     </div>
    // )

    // if(session.status === "unauthenticated") return (
    //     <div className="text-red-500 font-bold text-xl">
    //         User is not authenticated
    //     </div>
    // )

    if(session.status === "authenticated") {
        // router.push("/emails");
        return (
            <div className="flex flex-row justify-center items-center gap-4">
                <button
                    onClick={() => router.push("/emails")}
                    className="rounded-[5px] border-[4px] min-w-[350px] border-white flex flex-col justify-center items-center px-20 py-4">
                    <div>
                        Go to Emails
                    </div>
                </button>
                <button
                    onClick={() => signOut()}
                    className="rounded-[5px] border-[4px]  min-w-[350px] border-white flex flex-col justify-center items-center px-20 py-4">
                    <div>
                        Logout
                    </div>
                </button>
            </div>
        )
    }
    

    const handleClick = async () => {
        await signIn("google");
        // router.push("/emails");
    }





  return (
    <button
        onClick={() => signIn("google")}
        className="rounded-[5px] border-[4px] border-white flex flex-col justify-center items-center px-20 py-4">
        <div>
            Login with Google
        </div>
    </button>
  );
}