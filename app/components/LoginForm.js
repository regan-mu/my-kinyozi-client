"use client";
import Link from "next/link";
import { useState } from "react";

export default function LoginForm() {
    const [loginError, setLoginError] = useState("");
    const [formLoading, setFormLoading] = useState(false);
    return (
        <form className="w-full h-full mt-3 relative">
            {
                loginError && <div className="absolute bottom-full w-full px-2 py-2 mb-2 bg-red-200 text-red-700 text-sm font-semibold text-center rounded-lg border">
                    {loginError}
                </div>
            }
            <div className="flex flex-col gap-1 mb-4">
                <label htmlFor="email">Email</label>
                <input className="h-10 border-[0.1px] border-gray-500 rounded-lg p-2 outline-none bg-accent" required type="email" id="email" name="email" />
            </div>
            <div className="flex flex-col gap-1 mb-4">
                <label htmlFor="password">Password</label>
                <input className="h-10 border-[0.1px] border-gray-500 rounded-lg p-2 outline-none bg-accent" required type="password" id="password" name="password" />
            </div>
            <div className="w-full mb-4 flex justify-end">
                <Link className="font-thin text-sm hover:text-gray-300" href="/" >Forgot password</Link>
            </div>
            <button disabled={formLoading} className="w-full bg-secondary py-2 rounded-sm cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed hover:text-gray-300" type="submit">Login</button>
            <div className="mt-5">
                <span className="text-sm flex gap-2 justify-center">
                    Don`t have an account? 
                    <Link className="text-secondary text-base underline" href="/signup">Signup</Link>
                </span>
            </div>
        </form>
    )
}