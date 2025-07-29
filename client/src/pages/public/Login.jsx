
import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from '../../App';


export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { setToken } = useContext(AuthContext);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    if (!form.email || !form.password) {
      setError("Please enter your email and password."); return;
    }
    try {
      // Example API call:
      // const { data } = await api.post("/auth/login", form);
      // localStorage.setItem("token", data.accessToken);
      // setToken(data.accessToken);
      // navigate("/dashboard");
      // Placeholder: simulate login
      localStorage.setItem("token", "FAKE_JWT_TOKEN");
      setToken("FAKE_JWT_TOKEN");
      navigate("/dashboard");
    } catch (err) {
      setError("Invalid credentials. Please try again.");
    }
  };

  return (
    <main className="min-h-screen flex items-center justify-center py-8">
      <form
        className="bg-white shadow-xl rounded-2xl p-10 w-full max-w-md space-y-6"
        onSubmit={handleSubmit}
      >
        <h2 className="text-3xl font-bold mb-2 text-navyblue">Sign In</h2>
        <p className="mb-5 text-gray-500">Log into your Stratify account</p>
        <input
          type="email"
          name="email"
          value={form.email}
          onChange={handleChange}
          className="w-full rounded border px-4 py-3 text-lg mb-2 bg-gray-100"
          placeholder="Email Address"
          autoFocus
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

        <button
          type="submit"
          className="w-full mt-2 bg-calmblue hover:bg-navyblue text-white text-lg font-bold py-3 rounded-xl"
        >
          Log In
        </button>
        <div className="text-sm text-center mt-3 text-gray-700">
          No account?{" "}
          <a href="/register" className="text-calmblue underline">
            Register
          </a>
        </div>
      </form>
    </main>
  );
}
