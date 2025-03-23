import NextAuth from 'next-auth'

declare module "next-auth" {
    interface Session {
        user: {
            _id: string,
            name: string,
            tel: string,
            email: string,
            password: string,
            role: string,
            token: string
        }
    }
}