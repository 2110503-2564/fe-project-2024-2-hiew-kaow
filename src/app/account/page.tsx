import { authOptions } from "../api/auth/[...nextauth]/authOptions"
import { getServerSession } from 'next-auth'
import getUserProfile from "@/libs/getUserProfile"

export default async function Acccount(){

    const session = await getServerSession(authOptions)
    if(!session || !session.user.token) return null

    const profile = await getUserProfile(session.user.token)
    var createdAt = new Date(profile.data.createdAt);

    return(
        <main className="bg-slate-100 m-5 p-5">
            <div className="text-2xl">{profile.data}</div>
        </main>
    )
}