import { authOptions } from "../api/auth/[...nextauth]/authOptions"
import { getServerSession } from 'next-auth'
import getUserProfile from "@/libs/getUserProfile"
import { Divider } from "@mui/material"
import SignOutButton from "@/components/SignOutButton";
import ContactNumber from "@/components/ContactNumber";
import { BookingItem } from "../../../interface";
import getAppointments from "@/libs/getAppointments";
import AppointmentTicket from "@/components/AppointmentTicket";

export default async function profile(){

    const session = await getServerSession(authOptions)
    if(!session || !session.user.token) return null

    const profile = await getUserProfile(session.user.token)
    const pastAppointment = profile.data.appointmentHistory
    console.log(profile.data._id)
  
    const appointmentJson = await getAppointments(session.user.token)
    // console.log(appointmentJson.data)



    return(
        <main className="flex flex-row w-screen h-screen justify-center">
            <div className="flex flex-col w-[30%] pt-[10%] pl-20">
                <h1 className="text-8xl text-blue-500 font-bold">Hello!</h1>
                <h2 className="text-6xl text-gray-600 font-bold">{profile.data.name}</h2>
                <div className="text-xl text-gray-600 font-bold mt-[50px]">Contact number:</div>
                <ContactNumber telProp={profile.data.tel} token={session.user.token} userId={profile.data._id}/>
                <SignOutButton/>
            </div>
            <Divider orientation="vertical" variant="middle" flexItem sx={{ height: "80%", marginTop: "6.5%", borderRadius: "10px", borderWidth: "3px" }}/>

            <div className="w-[70%] pt-[100px]">
                <div className="flex flex-col items-center">
                    {
                        (profile.data.role == "admin") ? <div className="text-4xl text-blue-500 font-semibold">All appointment</div> :
                                                        <div className="text-4xl text-blue-500 font-semibold">Your appointment</div>
                    }
                    {
                      (appointmentJson.data.length !== 0) ? appointmentJson.data.map((item:BookingItem) => (
                            <AppointmentTicket key={item._id} appt={item} token={session.user.token} isAdmin={(profile.data.role == "admin")}/>
                          )) : <div>No schedule appointment</div>
                    }
                </div>
                <Divider orientation="horizontal" variant="middle" flexItem sx={{ marginY: "20px",borderRadius: "10px", borderWidth: "3px" }}/>
                <div className="flex flex-col items-center">
                    <div className="text-4xl text-blue-500 font-semibold">Your past appointment</div>
                    {
                      (pastAppointment.length !== 0) ? pastAppointment.map((item:BookingItem) => (
                            <AppointmentTicket key={item._id} appt={item} token={session.user.token} isAdmin={(profile.data.role == "admin")}/>
                          )) : <div>No past appointment</div>
                    }
                </div>
            </div>
        </main>
    )
}
