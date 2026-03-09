import React, { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { registerUser } from "../config/authApi";

export default function Register() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    agree: false,
  });
  

  const mutation = useMutation({
    mutationFn: registerUser,
    onSuccess: (data) => {
      console.log("Registration successful:", data);
      alert("Account created successfully! Please login.");
      // Optionally redirect to login page
      // navigate("/login");
    },
    onError: (error) => {
      console.error("Registration failed:", error.response?.data?.message || error.message);
      alert(error.response?.data?.message || "Registration failed");
    },
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm({
      ...form,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (form.password !== form.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }
    if (!form.agree) {
      alert("You must agree to the terms!");
      return;
    }

    // Call the API via React Query
    mutation.mutate({
      name: form.name,
      email: form.email,
      password: form.password,
    });
    setForm({
      name: "",
    email: "",
    password: "",
    confirmPassword: "",
    agree: false,
    })
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="max-w-md w-full bg-white shadow-lg rounded-xl p-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">
          Create an Account
        </h2>
        <p className="text-sm text-gray-500 mb-8 text-center">
          Fill in your details to register.
        </p>

        <form onSubmit={handleSubmit} className="space-y-6">
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Full Name"
            required
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
          />
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            placeholder="Email"
            required
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
          />
          <input
            type="password"
            name="password"
            value={form.password}
            onChange={handleChange}
            placeholder="Password"
            required
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
          />
          <input
            type="password"
            name="confirmPassword"
            value={form.confirmPassword}
            onChange={handleChange}
            placeholder="Confirm Password"
            required
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
          />

          <div className="flex items-center text-sm">
            <input
              type="checkbox"
              name="agree"
              checked={form.agree}
              onChange={handleChange}
              className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
            />
            <label className="ml-2 text-gray-700">
              I agree to the{" "}
              <a href="#" className="text-indigo-600 hover:text-indigo-700">
                Terms & Conditions
              </a>
            </label>
          </div>

          <button
            type="submit"
            disabled={mutation.isLoading}
            className="w-full py-3 bg-indigo-600 text-white font-medium rounded-lg hover:bg-indigo-700 transition"
          >
            {mutation.isLoading ? "Registering..." : "Register"}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-gray-500">
          Already have an account?{" "}
          <a href="login" className="text-indigo-600 hover:text-indigo-700 font-medium">
            Login
          </a>
        </p>
      </div>
    </div>
  );
}