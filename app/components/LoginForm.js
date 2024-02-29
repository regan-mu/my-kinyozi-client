"use client";
import Link from "next/link";
import { useState, useRef } from "react";
import axios from "axios";
import { useRouter } from 'next/navigation';
import Cookies from "universal-cookie";
import Image from "next/image";

export default function LoginForm() {
    const cookies = new Cookies();
    const router = useRouter()
    const [loginError, setLoginError] = useState("");
    const [formLoading, setFormLoading] = useState(false);
    const emailRef = useRef();
    const passwordRef = useRef();
    const [showPassword, setShowPassword] = useState(false);

   

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
                const email = res?.data?.email;
                const name = res?.data?.name;

                cookies.set("token", accessToken, {path: "/", sameSite: "None", secure:true});
                cookies.set("public_id", publicId, {path: "/", sameSite: "None", secure:true});
                cookies.set("name", name, {path: "/", sameSite: "None", secure:true});
                cookies.set("email", email, {path: "/", sameSite: "None", secure:true});

                router.push(`/dashboard/${publicId}`);
                setFormLoading(false);
            }
        ).catch(err => {
            if(![404, 401, 409].includes(err?.response?.status)) {
                setLoginError("Something went wrong. Try Again");
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
                <div className="relative h-10 w-full">
                    <div className="absolute flex items-center  h-full w-max right-0 px-2 hover:text-gray-300">
                        {
                            !showPassword ? <Image onClick={() => {setShowPassword(true)}}  className="w-[20px] cursor-pointer" src="/eye-open.png" alt="show password" width={24} height={24} /> : 
                            <Image onClick={() => {setShowPassword(false)}} className="w-[20px] cursor-pointer" src="/eye-closed.png" alt="show password" width={24} height={24} />
                        }
                    </div>
                    <input ref={passwordRef} className="h-full w-full border-[0.1px] border-gray-500 rounded-lg p-2 outline-none bg-accent" required type={!showPassword ? "password" : "text"} id="password" name="password" />
                </div>
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