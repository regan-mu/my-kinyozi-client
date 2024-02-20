"use client";
import { useState } from "react";
import axios from "axios";
import axiosConfig from "@/app/Utils/axiosRequestConfig";
import { useRouter } from "next/navigation";

export default function SetupAccount() {
    const router = useRouter();
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const [pending, setPending] = useState(false);
    const [formData, setFormData] = useState({
        email: "",
        password: "",
        confirmPassword: ""
    });

    const handleChange = (e) => {
        const {name, value} = e.target;
        setError("");
        setFormData({...formData, [name]: value})
    }

    const submitSetup = (e) => {
        e.preventDefault();
        if (formData.password !== formData.confirmPassword) {
            setError("Passwords don't match");
            return
        }
        setPending(true);
        axios(axiosConfig("put", "https://my-kinyozi-server.onrender.com/API/employees/setup", formData)).then(
            res => {
                setSuccess(res?.data?.message);
                setPending(false);
                setTimeout(() => {router.push("/staff/login")}, 2000);
            }
        ).catch(
            err => {
                setPending(false);
                if(![404, 401, 409].includes(err?.response?.status)) {
                    setError("Something went wrong. Try Again");
                } else {
                    setError(err?.response?.data?.message);
                }
            }
        );
    }

    return (
        <div className="h-screen w-screen bg-dark-blue text-white flex justify-center items-center md:p-0 p-5">
            <div className="w-screen md:w-96 h-96 flex flex-col gap-5 relative bg-accent p-5 rounded-md">
                {error && <div className="w-full h-10 text-sm absolute left-0 bottom-full rounded-md flex items-center justify-center font-semibold bg-red-200 text-red-600">{error}</div> }
                {success && <div className="w-full h-10 text-sm absolute left-0 bottom-full rounded-md flex items-center justify-center font-semibold bg-green-200 text-green-800">{success}</div>}
                <div className="text-center">
                    <h3>Password Setup</h3>
                </div>
                <form onSubmit={submitSetup} className="flex flex-col gap-3 text-gray-300">
                    <div className="flex flex-col gap-2">
                        <label className="text-sm font-semibold" htmlFor="email">Email</label>
                        <input value={formData.email} onChange={handleChange} className="w-full bg-dark-blue text-sm border-[0.1px] border-gray-700 h-10 p-3 rounded-md" required type="email" id="email" name="email" />
                    </div>
                    <div className="flex flex-col gap-2">
                        <label className="text-sm font-semibold" htmlFor="password">Password</label>
                        <input value={formData.password} onChange={handleChange} className="w-full bg-dark-blue text-sm border-[0.1px] border-gray-700 h-10 p-3 rounded-md" required type="password" id="password" name="password" />
                    </div>
                    <div className="flex flex-col gap-2">
                        <label className="text-sm font-semibold" htmlFor="confirm_password">Confirm Password</label>
                        <input value={formData.confirmPassword} onChange={handleChange} className="w-full bg-dark-blue text-sm border-[0.1px] border-gray-700 h-10 p-3 rounded-md" required type="password" id="confirm_password" name="confirmPassword" />
                    </div>
                    <button disabled={pending} type="submit" className="w-full h-10 bg-secondary rounded-md cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed">{pending? <>Submitting...</>: <>Submit</>}</button>
                </form>
            </div>
        </div>
    )
}