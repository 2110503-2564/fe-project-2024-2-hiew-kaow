export default async function getDentist(id:string) {
    
    const response = await fetch(`https://hiew-kaow-dentist.vercel.app/api/v1/dentists/${id}`)
    if (!response.ok) {
        throw new Error("Failed to get dentist with id:" + id)
    }

    return await response.json()
}