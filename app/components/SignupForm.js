"use client";
import useMultipleStepForm from "../hooks/useMutliStepForm";
import {RiArrowLeftCircleFill, RiArrowRightCircleFill} from "react-icons/ri";
import Link from "next/link";
import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

export default function SignupForm() {
    const [formError, setFormError] = useState("");
    const [formLoading, setFormLoading] = useState(false);
    const [successMessage, setSuccessMessage] = useState("");
    const router = useRouter();
    const [formInput, setFormInput] = useState({
        name: "",
        email: "",
        phone: "",
        county: "",
        city: "",
        password: "",
        confirmPassword: ""
    });

    const handleInputChange = (e) => {
        const {name, value} = e.target;
        setFormError("");
        setFormInput((prev) => {
            return { ...prev, [name]: value }
        });
    }

    const submitForm = (e) => {
        e.preventDefault();
        if (!isLast) {
            next();
        } else {
            
            if (formInput.password !== formInput.confirmPassword) {
                setFormError("Passwords do not MATCH!")
            } else {
                setFormLoading(true);
                const axiosConfig = {
                    method: "post",
                    url: "https://my-kinyozi-server.onrender.com/API/create/shop",
                    data: formInput,
                    headers: {
                        "Content-Type": "application/json"
                    }
                }
                axios(axiosConfig).then(
                    res => {
                        setFormLoading(false);
                        setSuccessMessage(res.data.message);
                        router.push("/login");
                    }
                ).catch(err => {
                    setFormError(err.response.data.message);
                    setFormLoading(false);
                });
            }
        }

    }


    const {next, back, step, isFirst, isLast} = useMultipleStepForm(
        [
            <>
                <div className="flex flex-col gap-1">
                    <label className="" htmlFor="name">Barbershop Name</label>
                    <input value={formInput.name} onChange={handleInputChange} className="md:h-9 h-12 border-[0.1px] border-gray-500 rounded-lg p-2 outline-none bg-accent" required id="name" name="name" type="text" />
                </div>
                <div className="flex flex-col gap-1">
                    <label className="" htmlFor="email">Email</label>
                    <input value={formInput.email} onChange={handleInputChange} className="md:h-9 h-12 border-[0.1px] border-gray-500 rounded-lg p-2 outline-none bg-accent" required id="email" name="email" type="email" />
                </div>
                <div className="flex flex-col gap-1">
                    <label className="" htmlFor="phone">Phone</label>
                    <input value={formInput.phone} onChange={handleInputChange} className="md:h-9 h-12 border-[0.1px] border-gray-500 rounded-lg p-2 outline-none bg-accent" required id="phone" name="phone" type="text" />
                </div>
            </>,
            <>
                <div className="flex flex-col gap-1">
                    <label className="" htmlFor="county">County</label>
                    <input value={formInput.county} onChange={handleInputChange} className="md:h-9 h-12 border-[0.1px] border-gray-500 rounded-lg p-2 outline-none bg-accent" required id="county" name="county" type="text" />
                </div>
                <div className="flex flex-col gap-1">
                    <label className="" htmlFor="city">City/Town</label>
                    <input value={formInput.city} onChange={handleInputChange} className="md:h-9 h-12 border-[0.1px] border-gray-500 rounded-lg p-2 outline-none bg-accent" required id="city" name="city" type="text" />
                </div>
            </>,
            <>
                <div className="flex flex-col gap-1">
                    <label className="" htmlFor="password">Password</label>
                    <input value={formInput.password} onChange={handleInputChange} className="md:h-9 h-12 border-[0.1px] border-gray-500 rounded-lg p-2 outline-none bg-accent" required id="password" name="password" type="password" />
                </div>
                <div className="flex flex-col gap-1">
                    <label className="" htmlFor="confirm_password">Confirm Password</label>
                    <input value={formInput.confirmPassword} onChange={handleInputChange} className="md:h-9 h-12 border-[0.1px] border-gray-500 rounded-lg p-2 outline-none bg-accent" required id="confirm_password" name="confirmPassword" type="password" />
                </div>
            </>
        ]
    )
    return (
        <form onSubmit={submitForm} className="w-full h-full mt-3 flex flex-col gap-10 md:gap-0 md:justify-between relative">
            {formError && <div className="absolute bottom-full w-full px-2 py-2 mb-2 bg-red-200 text-red-700 text-sm font-semibold text-center rounded-lg border">{formError}</div>}
            {successMessage && <div className="absolute bottom-full w-full px-2 py-2 mb-2 bg-green-200 text-green-800 text-xs font-base text-center rounded-lg">Signup Successfull</div>}
            <div className="flex flex-col gap-2">
                {step}
            </div>
            <div className="flex flex-col gap-6">
                <div className={`w-full flex ${isFirst ? 'justify-end': 'justify-between'} items-center h-10 mt-5`}>
                    {!isFirst && <button onClick={back} type="button" className="flex gap-3 items-center py-2 px-6 rounded-full border-[0.1px] bg-gray-500 border-gray-300">    
                        <RiArrowLeftCircleFill/> Previous
                    </button>}
                    <button type="submit" disabled={formLoading} className="flex items-center gap-3 bg-secondary py-2 px-6 rounded-full disabled:opacity-50 disabled:cursor-not-allowed">
                        {!isLast ? <>Next <RiArrowRightCircleFill /></> : formLoading ? "Pending...":  "Signup"}
                    </button>
                </div>
                
                <div className="">
                    <span className="text-sm flex gap-2 items-center h-5">
                        Already have an account? 
                        <Link className="text-secondary text-base underline" href="/login">Login</Link>
                    </span>
                </div>
            </div>
        </form>
    )
}