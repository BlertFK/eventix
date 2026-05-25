"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { motion } from "framer-motion";
import Link from "next/link";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

interface LoginForm {
  email: string;
  password: string;
}

export default function LoginPage() {
  const router = useRouter();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginForm>();

  const onSubmit = async (data: LoginForm) => {
    setLoading(true);
    setError("");
    const res = await signIn("credentials", {
      email: data.email,
      password: data.password,
      redirect: false,
    });
    setLoading(false);
    if (res?.error) {
      setError("Invalid email or password");
    } else {
      router.push("/dashboard");
    }
  };

  return (
    <>
      <Navbar />
      <main className="min-h-screen flex items-center justify-center px-4 pt-20 pb-12 relative overflow-hidden">
        {/* Background orbs */}
        <div
          className="absolute top-20 -right-32 w-80 h-80 rounded-full bg-purple/15 blur-[120px]"
          style={{ animation: "float 15s ease-in-out infinite" }}
        />
        <div
          className="absolute -bottom-20 -left-32 w-80 h-80 rounded-full bg-pink/15 blur-[120px]"
          style={{ animation: "float 18s ease-in-out infinite reverse" }}
        />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="relative w-full max-w-[450px] p-8 rounded-2xl bg-glass/50 border border-glass-border backdrop-blur-md"
        >
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-light to-pink bg-clip-text text-transparent mb-2">
              Welcome Back
            </h1>
            <p className="text-gray-400 text-sm">
              Sign in to access your tickets and events.
            </p>
          </div>

          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-4 p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-sm text-center"
            >
              {error}
            </motion.div>
          )}

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <Input
              label="Email"
              type="email"
              placeholder="you@example.com"
              error={errors.email?.message}
              {...register("email", {
                required: "Email is required",
                pattern: { value: /^\S+@\S+$/i, message: "Invalid email format" },
              })}
            />
            <Input
              label="Password"
              type="password"
              placeholder="Enter your password"
              error={errors.password?.message}
              {...register("password", {
                required: "Password is required",
                minLength: { value: 6, message: "Minimum 6 characters" },
              })}
            />

            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center gap-2 text-gray-400 cursor-pointer">
                <input type="checkbox" className="rounded border-glass-border bg-glass accent-purple" />
                Remember me
              </label>
              <Link href="#" className="text-purple-light hover:text-white transition-colors">
                Forgot password?
              </Link>
            </div>

            <Button type="submit" fullWidth disabled={loading}>
              {loading ? "Signing in..." : "Sign In"}
            </Button>
          </form>

          {/* Divider */}
          <div className="flex items-center gap-3 my-6">
            <div className="flex-1 h-px bg-glass-border" />
            <span className="text-xs text-gray-500">or continue with</span>
            <div className="flex-1 h-px bg-glass-border" />
          </div>

          {/* OAuth buttons */}
          <div className="grid grid-cols-2 gap-3">
            <button
              onClick={() => signIn("google", { callbackUrl: "/dashboard" })}
              className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl border border-glass-border text-gray-300 text-sm font-medium hover:bg-glass hover:border-purple/20 transition-all duration-300 cursor-pointer"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
              </svg>
              Google
            </button>
            <button
              onClick={() => signIn("facebook", { callbackUrl: "/dashboard" })}
              className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl border border-glass-border text-gray-300 text-sm font-medium hover:bg-glass hover:border-purple/20 transition-all duration-300 cursor-pointer"
            >
              <svg className="w-4 h-4" fill="#1877F2" viewBox="0 0 24 24">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
              </svg>
              Facebook
            </button>
          </div>

          <p className="text-center text-sm text-gray-500 mt-6">
            Don&apos;t have an account?{" "}
            <Link href="/register" className="text-transparent bg-gradient-to-r from-purple-light to-pink bg-clip-text font-medium hover:underline">
              Register
            </Link>
          </p>
        </motion.div>
      </main>
      <Footer />
    </>
  );
}
