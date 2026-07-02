import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";

export default function Login() {
  const [data, setData] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post("/login", data);
      localStorage.setItem("token", res.data.access_token);
      navigate("/dashboard");
    } catch (err) {
      console.error(err);
      alert("Login gagal, periksa kembali email dan password Anda.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-100 p-4">
      <form
        onSubmit={handleLogin}
        className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md"
      >
        <h2 className="text-2xl font-bold text-center text-slate-800 mb-6">
          Login Admin RT
        </h2>

        <div className="mb-4">
          <input
            type="email"
            placeholder="Email"
            onChange={(e) => setData({ ...data, email: e.target.value })}
            required
            className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-slate-50"
          />
        </div>

        <div className="mb-6">
          <input
            type="password"
            placeholder="Password"
            onChange={(e) => setData({ ...data, password: e.target.value })}
            required
            className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-slate-50"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-slate-800 text-white font-bold py-3 rounded-lg hover:bg-slate-700 transition duration-300"
        >
          Masuk
        </button>
      </form>
    </div>
  );
}
