import { authOptions } from "../api/auth/[...nextauth]/authOptions"
import { getServerSession } from 'next-auth'
import getUserProfile from "@/libs/getUserProfile"
import { Divider } from "@mui/material"
import SignOutButton from "@/components/SignOutButton";
import ContactNumber from "@/components/ContactNumber";
import getAppointments from "@/libs/getAppointments";

export default async function profile(){

    // const session = await getServerSession(authOptions)
    // if(!session || !session.user.token) return null

    // const profile = await getUserProfile(session.user.token)
    // var createdAt = new Date(profile.data.createdAt);

    // const appointmentJson = await getAppointments()

    return(
        <main className="flex flex-row w-screen h-screen justify-center">
            <div className="flex flex-col w-[30%] pt-[10%] pl-20">
                <h1 className="text-8xl text-blue-500 font-bold">Hello!</h1>
                <h2 className="text-6xl text-gray-600 font-bold">USERNAME</h2>
                <div className="text-xl text-gray-600 font-bold mt-[50px]">Contact number:</div>
                <ContactNumber telProp="099-999-9999"/>
                <SignOutButton/>
            </div>
            <Divider orientation="vertical" variant="middle" flexItem sx={{ height: "80%", marginTop: "6.5%", borderRadius: "10px", borderWidth: "3px" }}/>

            <div className="w-[70%] pt-[100px]">
                <div className="flex flex-col items-center">
                    <div className="text-4xl text-blue-500 font-semibold">Your appointment</div>
                </div>
                <Divider orientation="horizontal" variant="middle" flexItem sx={{ marginY: "20px",borderRadius: "10px", borderWidth: "3px" }}/>
                <div className="flex flex-col items-center">
                    <div className="text-4xl text-blue-500 font-semibold">Your past appointment</div>
                </div>
            </div>
        </main>
    )
}