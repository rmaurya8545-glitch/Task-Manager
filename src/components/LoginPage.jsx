// import { useState } from "react";

// export default function LoginPage({ onNavigate, onLoginSuccess }) {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");

//   function handleSubmit(e) {
//     e.preventDefault();
//     fetch("http://localhost:8080/api/login", {
//       method:"POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({ email, password })
//     })
//     .then((res) => {
//       if(!res.ok) throw new Error("Login failed");
//       return res.json();
//     })
//     .then((user) => {
//       onLoginSuccess(user);
//     })
//     .catch(() => {
//       alert("Invalid email or password");
//     });
//   }

//   return (
//     <div className="max-w-sm mx-auto px-6 py-14">
//       <h2 className="font-bold text-2xl mb-1 dark:text-white">Welcome back</h2>
//       <p className="text-gray-500 dark:text-gray-400 text-sm mb-6">Log in to your Kanban board</p>

//       <form onSubmit={handleSubmit}>
//         <label className="block text-xs font-semibold text-gray-500 dark:text-gray-400 mb-1">Email</label>
//         <input
//           type="email"
//           className="w-full border rounded px-3 py-2 text-sm mb-4 dark:bg-gray-800 dark:border-gray-600 dark:text-white"
//           placeholder="you@example.com"
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//         />

//         <label className="block text-xs font-semibold text-gray-500 dark:text-gray-400 mb-1">Password</label>
//         <input
//           type="password"
//           className="w-full border rounded px-3 py-2 text-sm mb-6 dark:bg-gray-800 dark:border-gray-600 dark:text-white"
//           placeholder="••••••••"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//         />

//         <button type="submit" className="w-full bg-sky-600 text-white font-semibold py-2.5 rounded-lg mb-4">
//           Log In
//         </button>
//       </form>

//       <p className="text-sm text-gray-500 dark:text-gray-400 text-center">
//         Don't have an account?{" "}
//         <button className="text-sky-600 font-semibold" onClick={() => onNavigate("register")}>
//           Register
//         </button>
//       </p>
//     </div>
//   );
// }

import { useState } from "react";

export default function LoginPage({ onNavigate, onLoginSuccess }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    setError("");
    fetch("http://localhost:8080/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password })
    })
      .then((res) => {
        if (!res.ok) throw new Error("failed");
        return res.json();
      })
      .then((user) => {
        onLoginSuccess(user);
      })
      .catch(() => {
        setError("Incorrect email or password. Please try again.");
      });
  }

  return (
    <div className="max-w-sm mx-auto px-6 py-14">
      <h2 className="font-bold text-2xl mb-1 dark:text-white">Welcome back</h2>
      <p className="text-gray-500 dark:text-gray-400 text-sm mb-6">Log in to your Kanban board</p>

      {error && (
        <p className="text-sm text-red-600 bg-red-50 dark:bg-red-900/30 dark:text-red-400 border border-red-200 dark:border-red-800 rounded px-3 py-2 mb-4">
          {error}
        </p>
      )}

      <form onSubmit={handleSubmit}>
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
          Log In
        </button>
      </form>

      <p className="text-sm text-gray-500 dark:text-gray-400 text-center">
        Don't have an account?{" "}
        <button className="text-sky-600 font-semibold" onClick={() => onNavigate("register")}>
          Register
        </button>
      </p>
    </div>
  );
}