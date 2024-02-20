import { useState } from "react";
import axios from "axios";
import axiosConfig from "@/app/Utils/axiosRequestConfig";

export default function ChangePassword({id}) {
    const [formData, setFormData] = useState({
        oldPassword: "",
        newPassword: "",
        confirmPassword: ""
    });
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const [pending, setPending] = useState(false);

    const handleInputChange = (e) => {
        setError("");
        const {name, value} = e.target;
        setFormData({...formData, [name]: value});
    }

    const submitPasswordChange = (e) => {
        const API_KEY = process.env.NEXT_PUBLIC_API_KEY;
        e.preventDefault();

        // Check if the new Password field and confirm password fields match each other.
        if (formData.newPassword !== formData.confirmPassword) {
            setError("New Password does not MATCH!");
            return;
        }

        setPending(true);
        axios(axiosConfig(
            "post", 
            `https://my-kinyozi-server.onrender.com/API/shop/password/change/${id}`,
            formData
        )).then(
            res => {
                setSuccess(res?.data?.message);
                setPending(false);
                setFormData({
                    oldPassword: "",
                    newPassword: "",
                    confirmPassword: ""
                });
            }
        ).catch(
            err => {
                if (![404, 401].includes(err?.response?.status)) {
                    setError("Something went wrong. Try Again");
                } else {
                    setError(err?.response?.data?.message);
                }
                setPending(false);
            }
        )

    }
    return (
        <div className="w-full h-auto flex flex-col gap-5">
            <h3 className="text-xl font-semibold">Change Password</h3>
            <form onSubmit={submitPasswordChange} className="h-auto w-1/2 flex flex-col gap-3">
                <div className="flex flex-col gap-1">
                    {error && <div className="w-full h-10 text-sm left-0 -top-5 rounded-md flex items-center justify-center font-semibold bg-red-200 text-red-600">{error}</div> }
                    {success && <div className="w-full h-10 text-sm left-0 -top-5 rounded-md flex items-center justify-center font-semibold bg-green-200 text-green-800">{success}</div>}
                </div>
                <div className="flex flex-col gap-1">
                    <label className="text-sm" htmlFor="oldpassword">Old Password</label>
                    <input onChange={handleInputChange} value={formData.oldPassword} className="md:h-10 text-gray-300 h-12 border-[0.1px] border-gray-500 rounded-lg p-2 outline-none bg-accent" required id="oldpassword" name="oldPassword" type="password" />
                </div>
                <div className="flex flex-col gap-1">
                    <label className="text-sm" htmlFor="newpassword">New Password</label>
                    <input onChange={handleInputChange}  value={formData.newPassword} className="md:h-10 text-gray-300 h-12 border-[0.1px] border-gray-500 rounded-lg p-2 outline-none bg-accent" required id="newpassword" name="newPassword" type="password" />
                </div>
                <div className="flex flex-col gap-1">
                    <label className="text-sm" htmlFor="confirmpassword">Confirm Password</label>
                    <input onChange={handleInputChange}  value={formData.confirmPassword} className="md:h-10 text-gray-300 h-12 border-[0.1px] border-gray-500 rounded-lg p-2 outline-none bg-accent" required id="confirmpassword" name="confirmPassword" type="password" />
                </div>
                <button disabled={pending} type="submit" className="w-full bg-secondary py-2 rounded-lg cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed hover:text-gray-300">{pending ? <>Saving...</>:<>Save Changes</>}</button>
            </form>
        </div>
    )
}