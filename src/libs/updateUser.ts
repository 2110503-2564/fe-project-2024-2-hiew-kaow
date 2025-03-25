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

    if (!response.ok) {
        try {
            const errorData = await response.json();
            throw new Error(errorData.message || "Failed to update user");
        } catch {
            throw new Error("An unknown error occurred while updating the user");
        }
    }


    return await response.json();
}