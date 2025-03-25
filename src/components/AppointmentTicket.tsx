'use client'

import { useEffect, useState } from "react"
import { BookingItem } from "../../interface"
import { TextField } from "@mui/material"
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers"
import dayjs from "dayjs"
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs"
import deleteAppointment from "@/libs/deleteAppointment"
import editAppointment from "@/libs/editAppointment"
import completeAppointment from "@/libs/completeAppointment"
export default function AppointmentTicket({appt, token, isPast, isAdmin} : {appt:BookingItem, token:string, isPast:boolean, isAdmin:boolean}) {

    const [isEditing, setEditing] = useState(false)
    const [apptDate, setApptDate] = useState(appt.apptDate)
    const [desc, setDesc] = useState(appt.description)
    const [dentist, setDentist] = useState("")

    useEffect(()=>{
        if (isPast) setDentist(appt.dentist)
        else setDentist(appt.dentist.name)
    }, [])

    const handleEdit = async () => {
        const confirmed = window.confirm("Edit this appointment?");
        if (!confirmed) return;
    
        try {
            document.body.style.cursor = "wait";
            await editAppointment(token, appt._id, {apptDate:apptDate, desc:desc});
            
            alert("Appointment updated successfully!");
        } catch (error) {
            console.error("Failed to updated appointment:", error);
            alert("Failed to updated the appointment. Please try again.");
        } finally {
            // Reset the cursor to default after the operation
            document.body.style.cursor = "default";
        }    
    }

    const handleDelete = async () => {
        const confirmed = window.confirm("Are you sure you want to delete this appointment?");
        if (!confirmed) return;
    
        try {
            document.body.style.cursor = "wait";
            await deleteAppointment(token, appt._id);
            
            alert("Appointment deleted successfully!");
            window.location.reload();
        } catch (error) {
            console.error("Failed to delete appointment:", error);
            alert("Failed to delete the appointment. Please try again.");
        } finally {
            // Reset the cursor to default after the operation
            document.body.style.cursor = "default";
        }
    
    };

    const handleComplete = async () => {
        const confirmed = window.confirm("Complete this appointment?");
        if (!confirmed) return;
    
        try {
            document.body.style.cursor = "wait";
            await completeAppointment(token, appt._id);
            
            alert("Appointment completed successfully!");
            window.location.reload();
        } catch (error) {
            console.error("Failed to completed appointment:", error);
            alert("Failed to completed the appointment. Please try again.");
        } finally {
            // Reset the cursor to default after the operation
            document.body.style.cursor = "default";
        }    
    }
    
    return (
        <div className="flex flex-row bg-slate-200 w-[80%] h-auto m-5 p-5 rounded shadow-md">
            <div className="w-[40%] space-y-[20px]">
                <div><strong>Dentist</strong> : {dentist}</div>
                <div className="flex flex-row items-center space-x-2">
                <strong>Date</strong> :
                {
                    isEditing ?
                     <LocalizationProvider dateAdapter={AdapterDayjs}>
                         <DatePicker
                         value={dayjs(apptDate)} // Convert date to dayjs object
                         onChange={(newDate) => {if (newDate) setApptDate(newDate.format("YYYY-MM-DD"))}}
                         disablePast
                         maxDate={dayjs().add(3, "month")}
                         /> 
                     </LocalizationProvider>
                    :
                    <div className="ml-2"> {apptDate.slice(0,10)}</div>
                 }
                </div>
                {
                    isEditing ?
                        <div className="flex flex-row items-center">
                        <strong>Description</strong> :
                            <TextField
                                value={desc}
                                onChange={(event) => setDesc(event.target.value)} // Update description state
                                variant="standard"
                                fullWidth
                                
                            />
                        </div>
                    : 
                        <div className="flex flex-row items-center space-x-2">
                        <strong>Description</strong> : {desc}</div>
                }

                {
                    (isAdmin&&!isPast) ? <div><strong>User</strong> : {appt.user.name}</div> : null
                }
            </div>
            <div className="flex flex-row-reverse w-[60%] items-center p-5 space-x-reverse space-x-5">
                {
                    isPast ? null :
                    <div 
                        className="text-xl text-red-800 hover:text-red-200 bg-red-200 hover:bg-red-600 rounded px-3 py-2 w-fit border-2 border-red-400 select-none hover:cursor-pointer"
                        onClick={handleDelete}
                        >
                        Delete
                    </div>}
                {
                    isPast ? null :
                    <div 
                    className="text-xl text-blue-800 hover:text-blue-200 bg-blue-200 hover:bg-blue-600 rounded px-3 py-2 w-fit border-2 border-blue-400 select-none hover:cursor-pointer"
                    onClick={()=>{
                        if(isEditing) {
                            handleEdit();
                            setEditing(false)
                        } else {
                            setEditing(true)
                        }
                    }}
                    >
                    {isEditing? "Save":"Edit"}
                </div>}
                {
                    (isAdmin&&!isPast) ? 
                    <div 
                        className="text-xl text-amber-800 hover:text-yellow-100 bg-yellow-200 hover:bg-yellow-500 rounded px-3 py-2 w-fit border-2 border-yellow-600 select-none hover:cursor-pointer"
                        onClick={handleComplete}
                        >
                        Complete this appointment
                    </div>
                    :
                    null
                }
            </div>
        </div>
    )
}