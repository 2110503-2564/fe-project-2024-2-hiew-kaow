'use client'
import DateBooking from "@/components/DateBooking"
import { useSearchParams, useRouter } from "next/navigation"
import getDentist from "@/libs/getDentist"
import Image from "next/image"
import { useEffect, useState } from "react"
import { DentistJson } from "../../../interface"
import createAppointment from "@/libs/createAppointment"
import { TextField } from "@mui/material"
import { useSession } from "next-auth/react"
import getUserProfile from "@/libs/getUserProfile"

export default function booking() {

    const { data: session } = useSession();
    const urlParams = useSearchParams()
    const id = urlParams.get('id')
    const router = useRouter();

    if (!id) {
        return <main className="text-red-500 text-center mt-[150px] text-4xl font-bold"> Please select dentist before booking </main>
    }

    if(!session){
        return <main className="text-red-500 text-center mt-[150px] text-4xl font-bold"> Please login before booking </main>
    }


    const [dentist, setDentist] = useState<DentistJson | null>(null);
    const [apptDate, setApptDate] = useState<string | null>(null);
    const [userId, setUserId] = useState<string | null>(null);
    const [description, setDescription] = useState("")

    useEffect(()=>{
        const fetchDentist = async (id:string) => {
            const data = await getDentist(id)
            setDentist(data)
        }
        const fetchUser = async () => {
            const data = await getUserProfile(session?.user.token)
            setUserId(data.data._id)
        }
        fetchDentist(id)
        fetchUser()
    }, [])

    if (!dentist) return (<main className="text-4xl text-center mt-[150px] font-bold text-blue-600">Loading...</main>)

    const handleScheduleAppointment = async () => {
        try {
            if (apptDate == null) {
                alert("Please select appointment date");
                return;
            }
            if(!session) return null;
            if(!userId) return null;
            console.log("token : " + session?.user.token);
            console.log("description : " + description);
            console.log("apptDate : " + apptDate);
            console.log("id : " + id);
            console.log("UserID : " + userId);
            await createAppointment(session?.user.token, description, apptDate, id, userId); 
            alert("Appointment scheduled successfully!");
            router.push("/profile");
        } catch (error) {
            console.error("Failed to schedule appointment:", error);
            alert("Failed to schedule appointment. Please try again.");
        }
    };

    return (
        <main>
            <div className="flex flex-col w-screen h-screen items-center justify-center space-y-5">
                <div className="text-4xl font-bold text-blue-600">Booking appointment</div>
                <div className="flex flex-row items-center justify-center space-x-5">
                    <div className="block w-fit h-full bg-gray-200 rounded-lg p-5">
                        <Image 
                            src="https://example.com/image.jpg"
                            alt="Remote image"
                            width={0}
                            height={0}
                            className="w-full h-auto mb-4"
                        />
                        <div className="text-2xl font-bold text-blue-600">Dr.{dentist.data.name}</div>
                        <div className="text-2xl font-bold text-blue-600">Area(s) of expertise: </div>
                        <ul className="text-xl font-bold text-gray-600">
                            {dentist.data.areasOfExpertise.map((area:string, index:number) => (
                            <li key={index}>{area}</li>
                            ))}
                        </ul>
                        <div className="text-2xl font-bold text-blue-600">Year(s) of experience: {dentist.data.yearsOfExperience}</div>
                    </div>
                    <div className="flex flex-col h-full items-center w-fit bg-gray-200 rounded-lg p-5 space-y-5">
                        <DateBooking onApptDateChange={setApptDate}/>
                        <TextField 
                            label="Appointment description" 
                            variant="standard" 
                            value={description}
                            onChange={(event)=>{setDescription(event.target.value)}}
                            className="w-full"
                            sx={{
                                marginBottom: "20px"
                            }}/>
                        <button className="w-2/3 rounded-md bg-blue-600 hover:bg-sky-600 py-3 text-white text-xl cursor-pointer"
                        onClick={handleScheduleAppointment}>
                            Schedule Appointment
                        </button>
                    </div>
                </div>
            </div>
        </main>
    )
}