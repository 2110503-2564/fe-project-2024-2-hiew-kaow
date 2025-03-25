export default async function getAppointments(token:string) {
  const response = await fetch(
    `https://hiew-kaow-dentist.vercel.app/api/v1/appointments`,
    {
      method: "GET",
      headers: {
        authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    }
  );
  if (!response.ok) {
    throw new Error("Failed to get appointment");
  }

  return await response.json();
}
