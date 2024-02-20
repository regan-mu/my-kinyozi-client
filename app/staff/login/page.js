// Login for employees only page
"use client";
import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import axiosConfig from "@/app/Utils/axiosRequestConfig";
import Cookies from "universal-cookie";

export default function StaffLogin() {
    const cookies = new Cookies();
    const router = useRouter();
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const [pending, setPending] = useState(false);
    const [formData, setFormData] = useState({
        username: "",
        password: "",
    });

    // Handle Input changes
    const handleChange = (e) => {
        const {name, value} = e.target;
        setError("");
        setFormData({...formData, [name]: value})
    }

    // Submit Login
    const submitLogin = (e) => {
        e.preventDefault();
        setPending(true);

        axios(axiosConfig("post", "https://my-kinyozi-server.onrender.com/API/employees/login", formData)).then(
            res => {
                // Store the Employee info in a cookie
                const accessToken = res?.data?.Token;
                const publicId = res?.data?.public_id;
                const role = res?.data?.role;
                const shopId = res?.data?.shop_id;

                cookies.set("token", accessToken, {path: "/", sameSite: "None", secure:true});
                cookies.set("public_id", publicId, {path: "/", sameSite: "None", secure:true});
                cookies.set("role", role, {path: "/", sameSite: "None", secure:true});
                cookies.set("shopId", shopId, {path: "/", sameSite: "None", secure:true});

                setSuccess("Login Successfull");
                setPending(false);
                setTimeout(() => {router.push(`/staff/${publicId}`)}, 2000);
            }
        ).catch(
            err => {
                setPending(false);
                if(![404, 401, 409].includes(err?.response?.status)) {
                    setError("Something went wrong. Try Again");
                } else {
                    setError(err?.response?.data);
                }
            }
        );
    }

    return (
        <div className="h-screen w-screen bg-dark-blue text-white flex justify-center items-center md:p-0 p-5">
            <div className="w-screen md:w-96 h-80 flex flex-col gap-5 relative bg-accent p-5 rounded-md">
                {error && <div className="w-full h-10 text-sm absolute left-0 bottom-full rounded-md flex items-center justify-center font-semibold bg-red-200 text-red-600">{error}</div> }
                {success && <div className="w-full h-10 text-sm absolute left-0 bottom-full rounded-md flex items-center justify-center font-semibold bg-green-200 text-green-800">{success}</div>}
                <div className="text-center">
                    <h3 className="text-xl font-bold">Login</h3>
                </div>
                <form onSubmit={submitLogin} className="flex flex-col gap-3 text-gray-300">
                    <div className="flex flex-col gap-2">
                        <label className="text-sm font-semibold" htmlFor="email">Email</label>
                        <input value={formData.email} onChange={handleChange} className="w-full bg-dark-blue text-sm border-[0.1px] border-gray-700 h-10 p-3 rounded-md" required type="email" id="email" name="username" />
                    </div>
                    <div className="flex flex-col gap-2">
                        <label className="text-sm font-semibold" htmlFor="password">Password</label>
                        <input value={formData.password} onChange={handleChange} className="w-full bg-dark-blue text-sm border-[0.1px] border-gray-700 h-10 p-3 rounded-md" required type="password" id="password" name="password" />
                    </div>
                    <button disabled={pending} type="submit" className="w-full h-10 bg-secondary rounded-md cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed">{pending? <>Loading...</>: <>Login</>}</button>
                </form>
            </div>
        </div>
    )
}