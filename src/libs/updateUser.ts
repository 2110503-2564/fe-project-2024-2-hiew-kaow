export default async function editUser( token: string , userId: string, tel:string ) {
    const response = await fetch(`https://hiew-kaow-dentist.vercel.app/api/v1/user/${userId}`, {
        method: "PUT",
        headers: {
            authorization: `Bearer ${token}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            tel: tel
        })
    })

    if(!response.ok){
        throw new Error("Failed to update user")
    }

    return await response.json();
}