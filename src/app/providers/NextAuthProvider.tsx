"use client"

import { SessionProvider } from "next-auth/react"
import { Session } from "next-auth"

interface NextAuthProviderProps {
    children: React.ReactNode
    session: Session | null
}

const NextAuthProvider: React.FC<NextAuthProviderProps> = ({ children, session }) => {
    return (
        <SessionProvider session={session}>
            {children}
        </SessionProvider>
    )
}

export default NextAuthProvider;
