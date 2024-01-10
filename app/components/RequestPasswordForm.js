"use client";
import { useState } from "react";
import axios from "axios";

export default function RequestPasswordForm() {
    const [formLoading, setFormLoading] = useState(false);
    const [formError, setFormError] = useState("");
    const [successMessage, setSuccessMessage] = useState("");
    const [resetEmail, setResetEmail] = useState({email: ""});

    const handleChange = (e) => {
        const {name, value} = e.target
        setResetEmail({[name]: value});
    }

    const handleRequest = (e) => {
        const API_KEY = process.env.NEXT_PUBLIC_API_KEY;
        e.preventDefault();
        setFormLoading(true);
        setFormError("");
        setSuccessMessage("");
        const axiosConfig = {
            method: "post",
            url: "https://my-kinyozi-server.onrender.com/API/shop/password/request-reset",
            data: resetEmail,
            headers: {
                "Content-Type": "application/json",
                "X-API-TOKEN": API_KEY
            }
        }
        axios(axiosConfig).then(
            res => {
                setResetEmail({email: ""});
                setSuccessMessage(res?.data?.message);
                setFormLoading(false);
            }
        ).catch(
            err => {
                setFormLoading(false);
                setFormError(err.response.data.message);
            }
        );
    }
    
    return (
        <form onSubmit={handleRequest} className="flex flex-col gap-5 w-full h-full mt-5 relative">
            {
                formError && <div className="absolute bottom-full w-full px-2 py-2 mb-2 bg-red-200 text-red-700 text-sm font-semibold text-center rounded-lg border">{formError}</div>
            }
            {
                successMessage && <div className="absolute bottom-full w-full px-2 py-2 mb-2 bg-green-200 text-green-800 text-xs font-base text-center rounded-lg">{successMessage}</div>
            }
            <div className="flex flex-col gap-2 mb-4">
                <label htmlFor="email">Email</label>
                <input value={resetEmail.email} onChange={handleChange} className="h-10 border-[0.1px] border-gray-500 rounded-lg p-2 outline-none bg-accent" required id="email" name="email" type="email" />
            </div>
            <button disabled={formLoading} className="w-full bg-secondary py-2 rounded-lg cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed hover:text-gray-300" type="submit">{formLoading ? <>Pending...</> : <>Request Password Reset</>}</button>
        </form>
    )
}