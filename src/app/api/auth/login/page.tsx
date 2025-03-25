'use client'

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import userLogIn from '@/libs/userLogIn';
import { signIn } from 'next-auth/react';
import Link from 'next/link';

export default function SignInPage() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  
    if (!formData.email || !formData.password) {
      setError('All fields are required.');
      return;
    }
  
    try {
      const result = await userLogIn(formData.email, formData.password);
      console.log('Login Successful:', result);
  
      const authResult = await signIn('credentials', {
        redirect: false,
        email: formData.email,
        password: formData.password,
      });
  
      if (authResult?.error) {
        setError(authResult.error);
      } else {
        router.push('/');
        setTimeout(() => {
          window.location.href = '/';
        }, 100);
      }
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message || 'Invalid email or password.');
      } else {
        setError('An unexpected error occurred.');
      }
    }
  };
  

  return (
    <div className="min-h-screen flex mt-50 justify-center bg-gray-50">
      <div className="w-full max-w-sm">
        <h1 className="text-3xl font-bold text-center text-blue-500 mb-6">
          Sign In
        </h1>

        {error && (
          <p className="text-center text-red-500 mb-4">
            {error}
          </p>
        )}

        <form onSubmit={handleSubmit} className="bg-white shadow-md rounded-lg p-6 space-y-4">
          <div>
            <label className="block text-gray-600 text-sm mb-1">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              placeholder="Email@email.com"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
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
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-500 text-white px-3 py-2 rounded-md hover:bg-blue-600 transition duration-200 cursor-pointer"
          >
            Sign In
          </button>
        </form>

        <p className="text-center text-gray-500 text-sm mt-4">
          Don’t have an account?{' '}
          <Link href="/api/auth/register" className="text-blue-500 hover:underline">
            Register
          </Link>
        </p>
      </div>
    </div>
  );
}
