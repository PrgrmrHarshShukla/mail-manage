"use client";

import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function Login() {
    const router = useRouter();

    const handleClick = async () => {
        await signIn("google", { callbackUrl: "/emails" });
        // router.push("/emails");
    }





  return (
    <button
        onClick={handleClick}
        className="rounded-[5px] border-[4px] border-white flex flex-col justify-center items-center px-20 py-4">
        <div>
            Login with Google
        </div>
    </button>
  );
}