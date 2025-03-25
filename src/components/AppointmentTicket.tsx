import { BookingItem } from "../../interface"
export default function AppointmentTicket({appt} : {appt:BookingItem}) {
    return (
        <div className="bg-slate-200 w-[80%] h-auto m-5 p-5 rounded shadow-md">
            <div><strong>Dentist</strong> : {appt.dentist.name}</div>
            <div><strong>Date</strong> : {appt.apptDate}</div>
            <div><strong>Description</strong> : {appt.description}</div>
        </div>
    )
}