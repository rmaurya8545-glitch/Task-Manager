import { useState } from "react";

export default function RegisterPage({ onNavigate }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

    function handleSubmit(e) {
    e.preventDefault();
    setError("");

    if (!name.trim() || !email.trim() || !password.trim()) {
      setError("Please fill in all fields.");
      return;
    }
    if (!email.includes("@") || !email.includes(".")) {
      setError("Please enter a valid email address.");
      return;
    }
    if (password.length < 4) {
      setError("Password must be at least 4 characters long.");
      return;
    }

    fetch("http://localhost:8080/api/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, password })
    })
      .then((res) => {
        if (!res.ok) throw new Error("failed");
        return res.json();
      })
      .then(() => {
        onNavigate("login");
      })
      .catch(() => {
        setError("This email is already registered. Please log in instead.");
      });
  }

  return (
    <div className="max-w-sm mx-auto px-6 py-14">
      <h2 className="font-bold text-2xl mb-1 dark:text-white">Create your account</h2>
      <p className="text-gray-500 dark:text-gray-400 text-sm mb-6">Start organizing your tasks</p>

      {error && (
        <p className="text-sm text-red-600 bg-red-50 dark:bg-red-900/30 dark:text-red-400 border border-red-200 dark:border-red-800 rounded px-3 py-2 mb-4">
          {error}
        </p>
      )}

      <form onSubmit={handleSubmit}>
        <label className="block text-xs font-semibold text-gray-500 dark:text-gray-400 mb-1">Name</label>
        <input
          type="text"
          className="w-full border rounded px-3 py-2 text-sm mb-4 dark:bg-gray-800 dark:border-gray-600 dark:text-white"
          placeholder="e.g. Roshani Maurya"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <label className="block text-xs font-semibold text-gray-500 dark:text-gray-400 mb-1">Email</label>
        <input
          type="email"
          className="w-full border rounded px-3 py-2 text-sm mb-4 dark:bg-gray-800 dark:border-gray-600 dark:text-white"
          placeholder="you@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <label className="block text-xs font-semibold text-gray-500 dark:text-gray-400 mb-1">Password</label>
        <input
          type="password"
          className="w-full border rounded px-3 py-2 text-sm mb-6 dark:bg-gray-800 dark:border-gray-600 dark:text-white"
          placeholder="••••••••"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button type="submit" className="w-full bg-sky-600 text-white font-semibold py-2.5 rounded-lg mb-4">
          Create Account
        </button>
      </form>

      <p className="text-sm text-gray-500 dark:text-gray-400 text-center">
        Already have an account?{" "}
        <button className="text-sky-600 font-semibold" onClick={() => onNavigate("login")}>
          Log In
        </button>
      </p>
    </div>
  );
}