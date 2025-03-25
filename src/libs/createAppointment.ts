export default async function createAppointment(
  token: string,
  description: string,
  apptDate: string,
  dentistId: string,
  userId: string
) {
  const response = await fetch(
    `https://hiew-kaow-dentist.vercel.app/api/v1/dentists/${dentistId}/appointments/`,
    {
      method: "POST",
      headers: {
        authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        description: "sleep",
        apptDate: "2025-03-01",
        user: "67c4752b76ace7c3c8658267",
      }),
    }
  );

  if (!response.ok) {
    throw new Error("Failed to fetch user profile");
  }
  return await response.json();
}
