'use client';

import { useState } from 'react';
import { createClient } from '@/lib/supabase/client'; // Ensure this path is correct
import { useRouter } from 'next/navigation';

export default function AuthForm() {
  const supabase = createClient();
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSignIn = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);
    setMessage('');
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) {
      setMessage(`Error: ${error.message}`);
    } else {
      setMessage('Logged in successfully! Redirecting...');
      router.push('/'); // Redirect to home or dashboard
      router.refresh(); // Refresh server components
    }
    setIsLoading(false);
  };

  const handleSignUp = async () => {
    setIsLoading(true);
    setMessage('');
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: `${window.location.origin}/auth/callback`,
      },
    });
    if (error) {
      setMessage(`Error: ${error.message}`);
    } else if (data.session) {
      setMessage('Signed up and logged in! Redirecting...');
      router.push('/');
      router.refresh();
    } else if (data.user && !data.session) {
      setMessage('Sign up successful! Please check your email to verify your account.');
    } else {
      setMessage('Sign up successful! Please check your email to verify your account or login if already verified.');
    }
    setIsLoading(false);
  };

  const handleMagicLinkSignIn = async () => {
    if (!email) {
      setMessage("Please enter your email address first.");
      return;
    }
    setIsLoading(true);
    setMessage('');
    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: {
        emailRedirectTo: `${window.location.origin}/auth/callback`,
      },
    });
    if (error) {
      setMessage(`Error: ${error.message}`);
    } else {
      setMessage('Magic link sent! Check your email.');
    }
    setIsLoading(false);
  };

  const handleGoogleSignIn = async () => {
    setIsLoading(true);
    setMessage('');
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${window.location.origin}/auth/callback`,
      },
    });
    if (error) {
      setMessage(`Error: ${error.message}`);
    }
    // No need to setIsLoading(false) here as the page will redirect
  };

  return (
    <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-center text-gray-900">Authenticate</h2>
      <form onSubmit={handleSignIn} className="space-y-4">
        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700"
          >
            Email address
          </label>
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="block w-full px-3 py-2 mt-1 text-gray-900 placeholder-gray-500 border border-gray-300 rounded-md shadow-sm appearance-none focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            disabled={isLoading}
          />
        </div>

        <div>
          <label
            htmlFor="password"
            className="block text-sm font-medium text-gray-700"
          >
            Password
          </label>
          <input
            id="password"
            name="password"
            type="password"
            autoComplete="current-password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="block w-full px-3 py-2 mt-1 text-gray-900 placeholder-gray-500 border border-gray-300 rounded-md shadow-sm appearance-none focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            disabled={isLoading}
          />
        </div>

        <button
          type="submit"
          disabled={isLoading || !email || !password}
          className="w-full px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
        >
          {isLoading ? 'Processing...' : 'Sign In with Email'}
        </button>
      </form>
      <button
        onClick={handleSignUp}
        disabled={isLoading || !email || !password}
        className="w-full px-4 py-2 mt-2 text-sm font-medium text-white bg-green-600 border border-transparent rounded-md shadow-sm hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:opacity-50"
      >
        {isLoading ? 'Processing...' : 'Sign Up with Email'}
      </button>

      <div className="relative mt-4">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-gray-300" />
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="px-2 text-gray-500 bg-white">Or continue with</span>
        </div>
      </div>

      <div className="mt-4 space-y-4">
        <button
          onClick={handleMagicLinkSignIn}
          disabled={isLoading || !email}
          className="w-full px-4 py-2 text-sm font-medium text-indigo-600 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
        >
          {isLoading ? 'Processing...' : 'Sign in with Magic Link'}
        </button>
        <button
          onClick={handleGoogleSignIn}
          disabled={isLoading}
          className="w-full flex items-center justify-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
        >
          <svg
            className="w-5 h-5 mr-2 -ml-1"
            aria-hidden="true"
            focusable="false"
            data-prefix="fab"
            data-icon="google"
            role="img"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 488 512"
          >
            <path
              fill="currentColor"
              d="M488 261.8C488 403.3 381.5 512 244 512 118.3 512 0 398.9 0 256S118.3 0 244 0c69.8 0 130.8 28.9 172.4 78.6L383.1 127.4c-27.8-26.2-63.5-42.4-101.4-42.4-83.2 0-151.8 68.6-151.8 153.2s68.6 153.2 151.8 153.2c53.5 0 98.4-22.7 127.7-59.8L488 261.8z"
            ></path>
          </svg>
          {isLoading ? 'Processing...' : 'Sign in with Google'}
        </button>
      </div>
      {message && (
        <p className={`mt-4 text-sm text-center ${message.startsWith('Error:') ? 'text-red-600' : 'text-green-600'}`}>{message}</p>
      )}
    </div>
  );
}