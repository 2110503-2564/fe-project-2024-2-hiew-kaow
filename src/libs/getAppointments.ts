export default async function getAppointments() {
    
    const response = await fetch(`https://hiew-kaow-dentist.vercel.app/api/v1/appointments`)
    if (!response.ok) {
        throw new Error("Failed to get appointment")
    }

    return await response.json()
}