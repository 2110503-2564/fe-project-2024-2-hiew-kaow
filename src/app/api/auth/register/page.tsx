'use client'
import { useState } from 'react';
import { registerUser } from '@/libs/registerUser';

export default function RegisterPage() {
  const [formData, setFormData] = useState({
    name: '',
    tel: '',
    email: '',
    password: '',
    role: 'user'
  });

  const [message, setMessage] = useState<string | null>(null);
  const [isError, setIsError] = useState(false); // New state to check for error

  // Handle form input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!formData.name || !formData.tel || !formData.email || !formData.password) {
      setMessage('All fields are required.');
      setIsError(true);
      return;
    }

    const result = await registerUser(formData);
    setMessage(result.message);
    setIsError(!result.success); // If success is false, set it as an error

    if (result.success) {
      setFormData({
        name: '',
        tel: '',
        email: '',
        password: '',
        role: 'user'
      });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 overflow-hidden">
      <div className="w-full max-w-sm">
        <h1 className="text-3xl font-bold text-center text-blue-500 mb-4">
          Register
        </h1>

        {message && (
          <p
            className={`text-center mb-3 ${
              isError ? 'text-red-500' : 'text-green-500'
            }`}
          >
            {message}
          </p>
        )}

        <form onSubmit={handleSubmit} className="bg-white shadow-md rounded-md p-6 space-y-3">
          <div>
            <label className="block text-gray-600 text-sm mb-1">Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              placeholder="Name Surname"
              className={`w-full px-3 py-2 border ${
                isError ? 'border-red-400' : 'border-gray-300'
              } rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-400`}
            />
          </div>

          <div>
            <label className="block text-gray-600 text-sm mb-1">Contact number</label>
            <input
              type="text"
              name="tel"
              value={formData.tel}
              onChange={handleChange}
              required
              placeholder="xxx-xxx-xxxx"
              className={`w-full px-3 py-2 border ${
                isError ? 'border-red-400' : 'border-gray-300'
              } rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-400`}
            />
          </div>

          <div>
            <label className="block text-gray-600 text-sm mb-1">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              placeholder="Email@email.com"
              className={`w-full px-3 py-2 border ${
                isError ? 'border-red-400' : 'border-gray-300'
              } rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-400`}
            />
          </div>

          <div>
            <label className="block text-gray-600 text-sm mb-1">Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              placeholder="********"
              className={`w-full px-3 py-2 border ${
                isError ? 'border-red-400' : 'border-gray-300'
              } rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-400`}
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-500 text-white px-3 py-2 rounded-md hover:bg-blue-600 transition duration-200 text-sm cursor-pointer"
          >
            Register
          </button>
        </form>

        <p className="text-center text-gray-500 text-sm mt-3">
          Already have an account?{' '}
          <a href="/login" className="text-blue-500 hover:underline">
            Login
          </a>
        </p>
      </div>
    </div>
  );
}
