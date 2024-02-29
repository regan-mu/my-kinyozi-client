// Set new Password
"use client";
import axios from "axios";
import { useState } from "react";
import { useRouter } from "next/navigation";
import axiosConfig from "../Utils/axiosRequestConfig";

export default function PasswordResetForm({token}) {
    const [resetError, setResetError] = useState("");
    const [formLoading, setFormLoading] = useState(false);
    const [successMessage, setSuccessMessage] = useState("")
    const [passwords, setPasswords] = useState({
        password: "",
        confirmPassword: ""
    });
    const router = useRouter();

    const handleChange = (e) => {
        const {name, value} = e.target;
        setPasswords(prev => {return {...prev, [name]: value}});
        setResetError("");
    }

    const submitForm = (e) => {
        const API_KEY = process.env.NEXT_PUBLIC_API_KEY;
        e.preventDefault();
        setResetError("");
        if (passwords.password !== passwords.confirmPassword) {
            setResetError("Passwords do not MATCH!");
            return
        } else {
            setFormLoading(true);
            axios(axiosConfig("post", `https://my-kinyozi-server.onrender.com/API/shop/password/reset/${token}`, passwords)).then(
                res => {
                    setSuccessMessage(res.data.message);
                    setFormLoading(false);
                    setTimeout(() => {router.push("/login");}, 2000);
                }
            ).catch(
                err => {
                    setFormLoading(false);
                    if(![404, 401, 409].includes(err?.response?.status)) {
                        setLoginError("Something went wrong. Try Again");
                    } else {
                        setLoginError(err?.response?.data?.message);
                    }
                }
            )
        }

    }

    return (
        <form onSubmit={submitForm} className="w-full h-full mt-3 relative">
            {resetError && <div className="w-full px-2 py-2 mb-2 bg-red-200 text-red-700 text-sm font-semibold text-center rounded-lg border">{resetError}</div>}
            {successMessage && <div className="w-full px-2 py-2 mb-2 bg-green-200 text-green-800 text-xs font-base text-center rounded-lg">{successMessage}</div>}
            <div className="flex flex-col gap-1 mb-4">
                <label htmlFor="password">Password</label>
                <input value={passwords.password} onChange={handleChange} className="h-10 border-[0.1px] border-gray-500 rounded-lg p-2 outline-none bg-accent" required type="password" id="password" name="password" />
            </div>
            <div className="flex flex-col gap-1 mb-4">
                <label htmlFor="confirm_password">Confirm Password</label>
                <input value={passwords.confirmPassword} onChange={handleChange} className="h-10 border-[0.1px] border-gray-500 rounded-lg p-2 outline-none bg-accent" required type="password" id="confirm_password" name="confirmPassword" />
            </div>
            <button disabled={formLoading} className="w-full bg-secondary py-2 rounded-lg cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed hover:text-gray-300" type="submit">{formLoading ? <>Pending...</> : <>Reset</>}</button>
        </form>
    )
}