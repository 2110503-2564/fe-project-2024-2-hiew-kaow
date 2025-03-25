export const registerUser = async (formData: {
    name: string;
    tel: string;
    email: string;
    password: string;
    role: string
  }) => {
    try {
      const response = await fetch('https://hiew-kaow-dentist.vercel.app/api/v1/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      console.log(JSON.stringify(formData))
      console.log(response)
      if (response.ok) {
        const data = await response.json();
        return { success: true, message: data.message || 'Registration successful!' };
      } else {
        const data = await response.json();
        return { success: false, message: data.error || 'Registration failed.' };
      }
    } catch (error) {
      return { success: false, message: 'An error occurred. Please try again.' };
    }
  };
  
  