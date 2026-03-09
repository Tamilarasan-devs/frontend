// src/pages/LoginPage.jsx
import React, { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { loginUser } from "../config/authApi";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);

  // React Query mutation
  const mutation = useMutation({
    mutationFn: loginUser, // <- must be inside mutationFn
    onSuccess: (data) => {
      console.log("Login successful:", data);
      localStorage.setItem("token", data?.token);
    },
    onError: (error) => {
      console.error("Login failed:", error.response?.data?.message || error.message);
      alert(error.response?.data?.message || "Login failed");
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    mutation.mutate({ email, password });
    setEmail("");
    setPassword("");
    setRemember(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="max-w-md w-full bg-white shadow-lg rounded-xl p-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">
          Login to Your Account
        </h2>
        <p className="text-sm text-gray-500 mb-8 text-center">
          Enter your credentials to access your account.
        </p>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="you@example.com"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="********"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>

          <div className="flex items-center justify-between text-sm">
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={remember}
                onChange={() => setRemember(!remember)}
                className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
              />
              Remember me
            </label>
            <a href="#" className="text-indigo-600 hover:text-indigo-700">
              Forgot password?
            </a>
          </div>

          <button
            type="submit"
            disabled={mutation.isLoading}
            className="w-full py-3 bg-indigo-600 text-white font-medium rounded-lg hover:bg-indigo-700 transition"
          >
            {mutation.isLoading ? "Logging in..." : "Login"}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-gray-500">
          Don’t have an account?{" "}
          <a href="register" className="text-indigo-600 hover:text-indigo-700 font-medium">
            Sign Up
          </a>
        </p>
      </div>
    </div>
  );
}