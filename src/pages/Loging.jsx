import { useState } from "react";
import { useSignup } from "./useSignUp";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useLognig } from "./useLognig";

export default function AuthForm() {
  const { signup, isLoading } = useSignup();
  const { logning, isLoading: isLoadingL } = useLognig();
  const [currentState, setCurrentState] = useState("sign up"); // "loging" or "sign up"

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  // Form submit
  const onSubmit = ({ fullName, email, password }) => {
    if (currentState === "sign up") {
      // Call signup mutation
      signup(
        { fullName, email, password },
        {
          onSuccess: () => {},
          onError: (err) => {
            toast.error(err.message || "Failed to create account");
          },
          onSettled: () => reset(),
        },
      );
    } else {
      // Login logic here (if you implement login mutation)
      logning(
        { email, password },
        {
          onSuccess: () => {},
          onError: (err) => {
            toast.error(err.message || "Failed to create account");
          },
          onSettled: () => reset(),
        },
      );
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col items-center w-[90%] sm:max-w-96 m-auto mt-14 gap-4 text-gray-800"
    >
      {/* Header */}
      <div className="inline-flex items-center gap-2 mb-2 mt-10">
        <p className="prata-regular text-4xl">{currentState}</p>
        <hr className="border-none h-[1.5px] w-8 bg-gray-800" />
      </div>

      {/* Full Name (only for signup) */}
      {currentState !== "loging" && (
        <div className="w-full">
          <input
            type="text"
            placeholder="Name"
            disabled={isLoading}
            className={`w-full px-3 py-2 border ${
              errors.fullName ? "border-red-500" : "border-gray-800"
            }`}
            {...register("fullName", {
              required: "Full Name is required",
            })}
          />
          {errors.fullName && (
            <p className="text-red-500 text-sm mt-1">
              {errors.fullName.message}
            </p>
          )}
        </div>
      )}

      {/* Email */}
      <div className="w-full">
        <input
          type="email"
          placeholder="Email"
          disabled={isLoading}
          className={`w-full px-3 py-2 border ${
            errors.email ? "border-red-500" : "border-gray-800"
          }`}
          {...register("email", {
            required: "Email is required",
            pattern: {
              value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
              message: "Invalid email address",
            },
          })}
        />
        {errors.email && (
          <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
        )}
      </div>

      {/* Password */}
      <div className="w-full">
        <input
          type="password"
          placeholder="Password"
          disabled={isLoading}
          className={`w-full px-3 py-2 border ${
            errors.password ? "border-red-500" : "border-gray-800"
          }`}
          {...register("password", {
            required: "Password is required",
            minLength: {
              value: 6,
              message: "Password must be at least 6 chars",
            },
          })}
        />
        {errors.password && (
          <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>
        )}
      </div>

      {/* Toggle login/signup */}
      <div className="w-full flex justify-between text-sm mt-[-8px]">
        {currentState === "loging" ? (
          <p
            onClick={() => setCurrentState("sign up")}
            className="cursor-pointer text-blue-600 hover:underline"
          >
            Create an account
          </p>
        ) : (
          <p
            onClick={() => setCurrentState("loging")}
            className="cursor-pointer text-blue-600 hover:underline"
          >
            Login Here
          </p>
        )}
      </div>

      {/* Submit button */}
      <button
        type="submit"
        disabled={isLoading}
        className="bg-black text-white font-light px-8 py-2 mt-4 cursor-pointer disabled:opacity-50"
      >
        {isLoading
          ? currentState === "loging"
            ? "Signing in..."
            : "Signing up..."
          : currentState === "loging"
            ? "Sign In"
            : "Sign Up"}
      </button>
    </form>
  );
}
