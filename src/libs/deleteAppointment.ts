export default async function deleteAppointment(
    token: string,
    appointment_id: string
  ) {
    const response = await fetch(
      `https://hiew-kaow-dentist.vercel.app/api/v1/appointments/${appointment_id}`,
      {
        method: "DELETE",
        headers: {
          authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        }
      }
    );
  
    if (!response.ok) {
      throw new Error("Failed to fetch user profile");
    }
    return await response.json();
  }
  