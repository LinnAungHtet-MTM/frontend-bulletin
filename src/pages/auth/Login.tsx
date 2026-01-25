import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useLogin } from "@/hooks/useAuth";
import { Eye, EyeOff, Loader, LockKeyhole } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    onSubmit,
    isLoading,
  } = useLogin();

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden bg-[#f5f7fa]">
      <div className="absolute top-8 left-8 flex items-center space-x-3 z-10">
        <div
          className="flex h-10 w-10 items-center justify-center rounded-md font-bold text-white
            bg-linear-to-r from-indigo-500 via-sky-400 to-emerald-500 shadow-[0_0_12px_rgba(99,102,241,0.8)] bg-size-[200%_200%] animate-[gradient_2s_ease_infinite]"
        >
          B
        </div>
        <span className="text-xl font-bold text-slate-700 tracking-tight">
          Bulletin Board
        </span>
      </div>
      {/* Liquid Glass Background */}
      <div
        className="absolute inset-0 bg-linear-to-br
        from-white via-sky-100/70 to-slate-200/60"
      />

      {/* Light reflection layers */}
      <div
        className="absolute -top-32 -left-32 w-[500px] h-[500px]
        bg-white/70 rounded-full blur-[120px]"
      />

      <div
        className="absolute bottom-0 right-0 w-[500px] h-[500px]
        bg-sky-200/40 rounded-full blur-[120px]"
      />
      {/* Glass Card */}
      <div
        className="relative w-100 rounded-3xl
        bg-white/20 backdrop-blur-3xl border border-white shadow-[0_20px_50px_rgba(0,0,0,0.1)] p-8"
      >
        {/* Logo */}
        <div className="flex justify-center mb-8">
          <div
            className="w-16 h-16 rounded-full
            bg-white/60 backdrop-blur
            flex items-center justify-center shadow-2xl"
          >
            <span className="font-bold text-gray-700">
              <LockKeyhole />
            </span>
          </div>
        </div>

        {/* Title */}
        <div className="flex items-center space-x-3 mb-8">
          {/* Logo */}
          <div
            className="flex h-10 w-10 items-center justify-center rounded-md font-bold text-white
            bg-linear-to-r from-indigo-500 via-sky-400 to-emerald-500 shadow-[0_0_12px_rgba(99,102,241,0.8)] bg-size-[200%_200%] animate-[gradient_2s_ease_infinite]"
          >
            B
          </div>

          {/* Animated Text */}
          <span
            className="text-2xl font-semibold bg-linear-to-r from-indigo-500 via-sky-400 to-emerald-500
            bg-size-[200%_200%] bg-clip-text text-transparent drop-shadow-[0_0_2px_rgba(99,102,241,0.8)] animate-[gradient_2s_ease_infinite] italic"
          >
            SignIn to Bulletin Board
          </span>
        </div>

        <form onSubmit={handleSubmit(onSubmit)}>
          {/* Email */}
          <div className="mb-4">
            <Input
              {...register("email")}
              placeholder="Email Address"
              className="rounded-lg bg-white/70 placeholder:text-gray-400 border-none shadow-2xl
              focus:outline-none focus:ring-0 focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-offset-0"
            />
            {errors.email && (
              <p className="text-sm text-red-500 ms-2 mt-1 font-semibold">
                {errors.email.message}
              </p>
            )}
          </div>

          {/* Password */}
          <div className="relative">
            <Input
              {...register("password")}
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              className="rounded-lg bg-white/70 placeholder:text-gray-400 border-none shadow-2xl
              focus:outline-none focus:ring-0 focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-offset-0"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 cursor-pointer hover:text-gray-700"
            >
              {showPassword ? (
                <EyeOff className="w-4 h-4" />
              ) : (
                <Eye className="w-4 h-4" />
              )}
            </button>
          </div>
          {errors.password && (
            <p className="text-sm text-red-500 ms-2 mt-1 font-semibold">
              {errors.password.message}
            </p>
          )}

          <div className="flex items-center justify-between my-4">
            <div className="flex items-center gap-2">
              <Checkbox id="remember" />
              <Label htmlFor="remember" className="text-gray-500">
                Remember Me
              </Label>
            </div>
            <Link
              to="/forgot-password"
              className="text-blue-600 font-semibold text-sm hover:text-blue-400 transition-colors duration-300"
            >
              Forgot Password?
            </Link>
          </div>

          {/* Login Button */}
          <Button
            disabled={isLoading}
            className="relative w-full rounded-lg text-white font-medium cursor-pointer bg-sky-500 hover:bg-sky-600
            transition-all duration-300 hover:scale-[1.02] shadow-[0_4px_14px_0_rgba(14,165,233,0.39)] hover:shadow-sky-500/50"
          >
            {isLoading ? (
              <>
                <Loader className="mr-2 h-4 w-4 animate-spin" />
                Processing...
              </>
            ) : (
              "Login"
            )}
          </Button>
        </form>
      </div>
    </div>
  );
};

export default Login;
