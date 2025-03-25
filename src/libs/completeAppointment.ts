export default async function completeAppointment(token: string , appointmentId: string) {
    const response = await fetch(`https://hiew-kaow-dentist.vercel.app/api/v1/appointments/${appointmentId}/complete`, {
        method: "PUT",
        headers: {
            authorization: `Bearer ${token}`,
            "Content-Type": "application/json"
        }
    })

    if(!response.ok){
        throw new Error("Failed to complete appointment")
    }

    return await response.json();
}