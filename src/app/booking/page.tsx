'use client'
import DateBooking from "@/components/DateBooking"
import { useSearchParams } from "next/navigation"
import getDentist from "@/libs/getDentist"
import Image from "next/image"
import { useEffect, useState } from "react"
import { DentistJson } from "../../../interface"

export default function booking() {

    const urlParams = useSearchParams()
    const id = urlParams.get('id')

    if (!id) {
        return <main className="text-red-500 text-center mt-[150px] text-4xl font-bold"> Please select dentist before booking </main> // Handle the error appropriately
    }

    const [dentist, setDentist] = useState<DentistJson | null>(null);
    const [apptDate, setApptDate] = useState<string | null>(null)

    useEffect(()=>{
        const fetchDentist = async (id:string) => {
            const data = await getDentist(id)
            setDentist(data)
            console.log(data)
            console.log(dentist)
        }
        fetchDentist(id)
    }, [])

    if (!dentist) return (<main className="text-4xl text-center mt-[150px] font-bold text-blue-600">Loading...</main>)

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
                        <div>Dr.{dentist.data.name}</div>
                        <div>Area(s) of expertise: </div>
                        <ul>
                            {dentist.data.areasOfExpertise.map((area, index) => (
                            <li key={index}>{area}</li>
                            ))}
                        </ul>
                        <div>Year(s) of experience: {dentist.data.yearsOfExperience}</div>
                    </div>
                    <div className="flex flex-col h-full items-center w-fit bg-gray-200 rounded-lg p-5 space-y-5">
                        <DateBooking onApptDateChange={setApptDate}/>
                        <button className="w-2/3 rounded-md bg-blue-600 hover:bg-sky-600 py-3 text-white text-xl" onClick={()=>console.log(apptDate)}>Schedule Appointment</button>
                    </div>
                </div>
            </div>
        </main>
    )
}