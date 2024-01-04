"use client";
import useMultipleStepForm from "../hooks/useMutliStepForm";
import uniqid from "uniqid";
import {RiArrowLeftCircleFill, RiArrowRightCircleFill} from "react-icons/ri";
import Link from "next/link";

export default function SignupForm() {
    const submitForm = (e) => {
        e.preventDefault();
        if (!isLast) {
            next();
        }
    }


    const {next, back, step, isFirst, isLast} = useMultipleStepForm(
        [
            <div key={uniqid()} className="flex flex-col gap-2">
                <div className="flex flex-col gap-1">
                    <label className="" htmlFor="shop_name">Barbershop Name</label>
                    <input className="md:h-9 h-12 border-[0.1px] border-gray-500 rounded-lg p-2 outline-none bg-accent" required id="shop_name" name="name" type="text" />
                </div>
                <div className="flex flex-col gap-1">
                    <label className="" htmlFor="email">Email</label>
                    <input className="md:h-9 h-12 border-[0.1px] border-gray-500 rounded-lg p-2 outline-none bg-accent" required id="email" name="email" type="email" />
                </div>
                <div className="flex flex-col gap-1">
                    <label className="" htmlFor="phone">Phone</label>
                    <input className="md:h-9 h-12 border-[0.1px] border-gray-500 rounded-lg p-2 outline-none bg-accent" required id="phone" name="phone" type="text" />
                </div>
            </div>,
            <div key={uniqid()} className="flex flex-col gap-2">
                <div className="flex flex-col gap-1">
                    <label className="" htmlFor="county">County</label>
                    <input className="md:h-9 h-12 border-[0.1px] border-gray-500 rounded-lg p-2 outline-none bg-accent" required id="county" name="county" type="text" />
                </div>
                <div className="flex flex-col gap-1">
                    <label className="" htmlFor="city">City/Town</label>
                    <input className="md:h-9 h-12 border-[0.1px] border-gray-500 rounded-lg p-2 outline-none bg-accent" required id="city" name="city" type="text" />
                </div>
            </div>,
            <div key={uniqid()} className="flex flex-col gap-2">
                <div className="flex flex-col gap-1">
                    <label className="" htmlFor="password">Password</label>
                    <input className="md:h-9 h-12 border-[0.1px] border-gray-500 rounded-lg p-2 outline-none bg-accent" required id="password" name="password" type="password" />
                </div>
                <div className="flex flex-col gap-1">
                    <label className="" htmlFor="confirm_password">Confirm Password</label>
                    <input className="md:h-9 h-12 border-[0.1px] border-gray-500 rounded-lg p-2 outline-none bg-accent" required id="confirm_password" name="confirmPassword" type="password" />
                </div>
            </div>
        ]
    )
    return (
        <form onSubmit={submitForm} className="w-full h-full mt-3 flex flex-col gap-10 md:gap-0 md:justify-between relative">
            {/* <div className="absolute bottom-full w-full px-2 py-2 mb-2 bg-red-200 text-red-700 text-sm font-semibold text-center rounded-lg border">error</div> */}
            {step}
            <div className="flex flex-col gap-6">
                <div className="w-full flex justify-between items-center h-10 mt-5">
                    <button onClick={back} type="button" className="flex gap-3 items-center py-2 px-6 rounded-full border-[0.1px] bg-gray-500 border-gray-300">    
                        <RiArrowLeftCircleFill/> Previous
                    </button>
                    <button className="flex items-center gap-3 bg-secondary py-2 px-6 rounded-full">
                        {!isLast ? <>Next <RiArrowRightCircleFill /></> : "Signup"}
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