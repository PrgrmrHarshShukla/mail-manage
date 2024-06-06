"use client";

import { SessionProvider } from "next-auth/react";

const AuthProvider = ({ children }: { children: any }) => {
    return (
        <div>
            <SessionProvider>
                {children}
            </SessionProvider>
        </div>
    )
}

export default AuthProvider;