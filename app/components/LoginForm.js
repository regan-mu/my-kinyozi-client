"use client";
import Link from "next/link";
import { useState, useRef } from "react";
import axios from "axios";
import { useRouter } from 'next/navigation';
import Cookies from "universal-cookie";

export default function LoginForm() {
    const cookies = new Cookies();
    const router = useRouter()
    const [loginError, setLoginError] = useState("");
    const [formLoading, setFormLoading] = useState(false);
    const emailRef = useRef();
    const passwordRef = useRef();

    // Nav to prev protected path otherwise home
   

    const handleLogin = (e) => {
        const API_KEY = process.env.NEXT_PUBLIC_API_KEY;
        e.preventDefault();
        setFormLoading(true);
        setLoginError("");
        const axiosConfig = {
            method: "post",
            url: "https://my-kinyozi-server.onrender.com/API/login/shop",
            auth: {
                username: emailRef.current.value,
                password: passwordRef.current.value
            },
            headers: {
                "Content-Type": "application/json",
                "X-API-KEY": API_KEY
            }
        }

        if (!emailRef.current.value || !passwordRef.current.value) {
            return
        }

        axios(axiosConfig).then(
            res => {
                const accessToken = res?.data?.Token;
                const publicId = res?.data?.public_id;

                cookies.set("token", accessToken, {path: "/", sameSite: "None", secure:true});
                cookies.set("public_id", publicId, {path: "/", sameSite: "None", secure:true});

                router.push("/");
                setFormLoading(false);
            }
        ).catch(err => {
            if (!err?.response?.status) {
                setLoginError("Can't login. Please try again");
            } else {
                setLoginError(err?.response?.data);
            }
            setFormLoading(false);
        }
        );

    }

    return (
        <form onSubmit={handleLogin} className="w-full h-full mt-3 relative">
            {
                loginError && <div className="absolute bottom-full w-full px-2 py-2 mb-2 bg-red-200 text-red-700 text-sm font-semibold text-center rounded-lg border">
                    {loginError}
                </div>
            }
            <div className="flex flex-col gap-1 mb-4">
                <label htmlFor="email">Email</label>
                <input ref={emailRef}  className="h-10 border-[0.1px] border-gray-500 rounded-lg p-2 outline-none bg-accent" required type="email" id="email" name="email" />
            </div>
            <div className="flex flex-col gap-1 mb-4">
                <label htmlFor="password">Password</label>
                <input ref={passwordRef} className="h-10 border-[0.1px] border-gray-500 rounded-lg p-2 outline-none bg-accent" required type="password" id="password" name="password" />
            </div>
            <div className="w-full mb-4 flex justify-end">
                <Link className="font-thin text-sm hover:text-gray-300" href="/request-password-reset" >Forgot password</Link>
            </div>
            <button disabled={formLoading} className="w-full bg-secondary py-2 rounded-lg cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed hover:text-gray-300" type="submit">{formLoading ? <>Logging in</> : <>Login</>}</button>
            <div className="mt-5">
                <span className="text-sm flex gap-2 justify-center">
                    Don`t have an account? 
                    <Link className="text-secondary text-base underline" href="/signup">Signup</Link>
                </span>
            </div>
        </form>
    )
}