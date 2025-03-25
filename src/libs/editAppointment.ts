export default async function editAppointment(token: string , appointmentId: string, { apptDate, desc }:{ apptDate:string, desc:string }) {
    const response = await fetch(`https://hiew-kaow-dentist.vercel.app/api/v1/appointments/${appointmentId}`, {
        method: "PUT",
        headers: {
            authorization: `Bearer ${token}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            apptDate: apptDate,
            description: desc
        })
    })

    if(!response.ok){
        throw new Error("Failed to update appointment")
    }

    return await response.json();
}