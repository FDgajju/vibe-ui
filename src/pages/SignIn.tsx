import React from 'react';

const SignIn: React.FC = () => {
  return (
    <div className="mx-auto max-w-7xl">
      <div className="mx-auto max-w-md bg-white rounded-xl shadow-sm ring-1 ring-gray-200 p-6 sm:p-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 text-center mb-6">Sign In</h1>
        <form className="space-y-5">
          <div className="space-y-2">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email address</label>
            <input
              type="email"
              id="email"
              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500 py-2.5 px-3"
              placeholder="you@example.com"
            />
          </div>
          <div className="space-y-2">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
            <input
              type="password"
              id="password"
              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500 py-2.5 px-3"
              placeholder="********"
            />
          </div>
          <button
            type="submit"
            className="w-full inline-flex justify-center items-center rounded-md bg-purple-600 px-4 py-2.5 text-white font-semibold shadow-sm hover:bg-purple-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-purple-600 transition"
          >
            Sign In
          </button>
          <p className="text-sm text-gray-600 text-center">Don't have an account? <a href="/signup" className="font-semibold text-purple-700 hover:underline">Sign up</a></p>
        </form>
      </div>
    </div>
  );
};

export default SignIn;