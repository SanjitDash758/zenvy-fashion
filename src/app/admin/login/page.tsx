"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { FiUser, FiLock, FiEye, FiEyeOff, FiLoader } from "react-icons/fi";

export default function AdminLoginPage() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // If already logged in, redirect
  useEffect(() => {
    fetch("/api/admin/check")
      .then((r) => r.json())
      .then((data) => {
        if (data.authenticated) {
          router.push("/admin");
        }
      })
      .catch(() => {});
  }, [router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "লগইন ব্যর্থ");
        setLoading(false);
        return;
      }

      router.push("/admin");
      router.refresh();
    } catch (err) {
      console.error(err);
      setError("সার্ভারে সমস্যা");
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden bg-gradient-to-br from-indigo-500 via-violet-500 to-purple-400">
      {/* Animated blobs */}
      <div className="absolute top-0 -left-20 w-96 h-96 bg-white/20 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-0 -right-20 w-96 h-96 bg-violet-300/30 rounded-full blur-3xl animate-pulse delay-1000" />

      <div className="relative z-10 w-full max-w-md mx-4">
        <div
          className="backdrop-blur-xl bg-white/20 rounded-3xl p-8 shadow-2xl border border-white/30"
          style={{
            boxShadow:
              "0 20px 60px rgba(99, 102, 241, 0.4), inset 0 1px 0 rgba(255,255,255,0.3)",
          }}
        >
          {/* Logo */}
          <div className="text-center mb-8">
            <div className="w-20 h-20 mx-auto mb-4 rounded-2xl bg-white/30 backdrop-blur flex items-center justify-center border border-white/40">
              <FiLock className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-3xl font-bold text-white mb-2">Zenvy Admin</h1>
            <p className="text-white/80 text-sm">
              ড্যাশবোর্ডে প্রবেশ করতে লগইন করুন
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Username */}
            <div className="relative">
              <FiUser className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 w-5 h-5" />
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                autoFocus
                autoComplete="username"
                placeholder="ইউজারনেম"
                className="w-full pl-12 pr-5 py-4 rounded-2xl bg-white/90 backdrop-blur border-2 border-white/40 focus:border-white focus:outline-none text-gray-900 font-medium transition-all"
              />
            </div>

            {/* Password */}
            <div className="relative">
              <FiLock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 w-5 h-5" />
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                autoComplete="current-password"
                placeholder="পাসওয়ার্ড"
                className="w-full pl-12 pr-12 py-4 rounded-2xl bg-white/90 backdrop-blur border-2 border-white/40 focus:border-white focus:outline-none text-gray-900 font-medium transition-all"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 transition"
              >
                {showPassword ? <FiEyeOff size={20} /> : <FiEye size={20} />}
              </button>
            </div>

            {error && (
              <div className="px-4 py-3 rounded-xl bg-red-500/20 border border-red-300/40 text-white text-sm font-medium text-center">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full py-4 rounded-2xl bg-white text-indigo-600 font-bold text-lg shadow-lg hover:shadow-xl hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <FiLoader className="animate-spin" size={20} />
                  যাচাই করা হচ্ছে...
                </>
              ) : (
                "লগইন করুন"
              )}
            </button>
          </form>

          <p className="text-center text-white/70 text-xs mt-6">
            © 2026 Zenvy Fashion. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  );
}
