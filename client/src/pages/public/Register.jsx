import React, { useState } from "react";
// import api from "../../services/api"; // add for live backend

export default function Register() {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(""); setSuccess(false);
    // TODO: connect to backend
    if (!form.name || !form.email || !form.password) {
      setError("Please fill in all fields."); return;
    }
    try {
      // Example API call
      // await api.post("/auth/register", form);
      setSuccess(true);
    } catch (err) {
      setError("Registration failed. Try again.");
    }
  };

  return (
    <main className="min-h-screen flex items-center justify-center py-8">
      <form
        className="bg-white shadow-xl rounded-2xl p-10 w-full max-w-md space-y-5"
        onSubmit={handleSubmit}
      >
        <h2 className="text-3xl font-bold mb-2 text-navyblue">Get Started</h2>
        <p className="mb-5 text-gray-500">Create your Stratify account</p>

        <input
          type="text"
          name="name"
          value={form.name}
          onChange={handleChange}
          className="w-full rounded border px-4 py-3 text-lg mb-2 bg-gray-100"
          placeholder="Your Name"
          autoFocus
        />
        <input
          type="email"
          name="email"
          value={form.email}
          onChange={handleChange}
          className="w-full rounded border px-4 py-3 text-lg mb-2 bg-gray-100"
          placeholder="Email Address"
        />
        <input
          type="password"
          name="password"
          value={form.password}
          onChange={handleChange}
          className="w-full rounded border px-4 py-3 text-lg mb-2 bg-gray-100"
          placeholder="Password"
        />

        {error && <div className="text-red-600">{error}</div>}
        {success && (
          <div className="text-green-600">Registration successful! You can <a href="/login" className="underline text-calmblue">log in</a> now.</div>
        )}

        <button
          type="submit"
          className="w-full mt-2 bg-calmblue hover:bg-navyblue text-white text-lg font-bold py-3 rounded-xl"
        >
          Register
        </button>
        <div className="text-sm text-center mt-3 text-gray-700">
          Have an account? <a href="/login" className="text-calmblue underline">Sign in</a>
        </div>
      </form>
    </main>
  );
}
