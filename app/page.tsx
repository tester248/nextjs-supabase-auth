'use client';

import { useAuth } from './auth-provider';
import { redirect } from 'next/navigation';
import { useEffect } from 'react';

export default function Home() {
  const { user, loading, signOut } = useAuth();
  
  useEffect(() => {
    if (!loading && !user) {
      redirect('/login');
    }
  }, [user, loading]);

  if (loading || !user) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-8 text-center bg-gray-50 dark:bg-gray-900">
      <div className="p-10 bg-white dark:bg-gray-800 rounded-lg shadow-xl">
        <h1 className="text-3xl font-bold mb-4 text-gray-800 dark:text-gray-200">
          Hello, <span className="text-indigo-600 dark:text-indigo-400">{user.email}</span>!
        </h1>
        <p className="mb-6 text-gray-600 dark:text-gray-300">You are now logged in.</p>
        <div className="w-full max-w-md p-4 mb-6 text-left bg-gray-100 dark:bg-gray-700 rounded-md overflow-x-auto text-sm">
          <h3 className="font-semibold text-gray-700 dark:text-gray-300 mb-2">User Details:</h3>
          <pre className="text-gray-500 dark:text-gray-400">{JSON.stringify(user, null, 2)}</pre>
        </div>
        <button
          onClick={signOut}
          className="px-6 py-3 font-semibold text-white bg-red-600 rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
        >
          Sign Out
        </button>
      </div>

      <main className="flex flex-col gap-[32px] items-center sm:items-start mt-16 max-w-4xl w-full px-4">
        <ol className="list-inside list-decimal text-sm/6 text-center sm:text-left font-[family-name:var(--font-geist-mono)] text-gray-700 dark:text-gray-300 w-full bg-gray-100 dark:bg-gray-800 p-4 rounded-md">
          <li className="mb-2 tracking-[-.01em]">
            This is a POC for Next.js & Supabase Authentication.
          </li>
          <li className="mb-2 tracking-[-.01em]">
            You have successfully logged in using Supabase.
          </li>
          <li className="tracking-[-.01em]">
            Explore the authentication methods: Email/Password, Magic Link, Google Sign-In.
          </li>
        </ol>
      </main>
    </div>
  );
}
