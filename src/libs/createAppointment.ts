export default async function createAppointment(token:string, description:string, apptDate:string, dentistId:string){
    const response = await fetch (`https://hiew-kaow-dentist.vercel.app/api/v1/dentists/${dentistId}/appointments/`, {
        method: "POST",
        headers: {
            authorization: `Bearer ${token}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            description: description,
            apptDate: apptDate
        })
    })

    if(!response.ok){
        throw new Error("Failed to fetch user profile")
    }
    return await response.json();
}