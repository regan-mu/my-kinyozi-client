import { useEffect, useState } from "react";
import axios from "axios";
import axiosConfig from "@/app/Utils/axiosRequestConfig";

export default function ShopProfile({id}) {
    const [formInput, setFormInput] = useState({
        shop_name: "",
        email: "",
        phone: "",
        county: "",
        city: ""
    });
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const [pending, setPending] = useState(false);

    const handleInputChange = (e) => {
        const {name, value} = e.target;
        setError("");
        setFormInput({...formInput, [name]: value});
    }
    
    useEffect(() => {
        const fetchData = async () => {
            axios(axiosConfig("get", `https://my-kinyozi-server.onrender.com/API/shop/${id}`, null)).then(
                res => {
                    setFormInput(res?.data?.shopInfo);
                }
            ).catch(
                err => {
                    if(![404, 401].includes(err?.response?.status)) {
                        setError("Something went wrong. Try Again");
                    } else {
                        setError(err?.response?.data?.message);
                    }
                }
            )
        };
        fetchData();
    }, [success]);

    const updateInfo = (e) => {
        e.preventDefault();
        setPending(true);
        axios(axiosConfig("post", `https://my-kinyozi-server.onrender.com/API/shop/update/${id}`, formInput)).then(
            res => {
                setSuccess(res?.data?.message);
                setPending(false);
            }
        ).catch(err => {
            if(![404, 401].includes(err?.response?.status)) {
                setError("Something went wrong. Try Again");
            } else {
                setError(err?.response?.data?.message);
            }
            setPending(false);
        });
    }

    return (
        <div className="w-full h-auto flex flex-col gap-5">
            <h3 className="text-xl font-semibold">Update Profile Information</h3>
            <form onSubmit={updateInfo} className="h-auto w-1/2 flex flex-col gap-3 relative">
                <div className="flex flex-col gap-1">
                    {error && <div className="w-full h-10 absolute text-sm left-0 -top-5 rounded-md flex items-center justify-center font-semibold bg-red-200 text-red-600">{error}</div> }
                    {success && <div className="w-full h-10 text-sm left-0 -top-5 rounded-md flex items-center justify-center font-semibold bg-green-200 text-green-800">{success}</div>}
                </div>
                <div className="flex flex-col gap-1">
                    <label className="text-sm" htmlFor="name">Barbershop Name</label>
                    <input value={formInput?.shop_name} onChange={handleInputChange} className="md:h-10 text-gray-400 h-12 border-[0.1px] border-gray-500 rounded-lg p-2 outline-none bg-accent" required id="name" name="shop_name" type="text" />
                </div>
                <div className="flex flex-col gap-1">
                    <label className="text-sm" htmlFor="email">Email</label>
                    <input value={formInput?.email} onChange={handleInputChange} className="md:h-9 text-gray-400 h-12 border-[0.1px] border-gray-500 rounded-lg p-2 outline-none bg-accent" required id="email" name="email" type="email" />
                </div>
                <div className="flex flex-col gap-1">
                    <label className="text-sm" htmlFor="phone">Phone</label>
                    <input value={formInput?.phone} onChange={handleInputChange} className="md:h-9 h-12 text-gray-400 border-[0.1px] border-gray-500 rounded-lg p-2 outline-none bg-accent" required id="phone" name="phone" type="text" />
                </div>
                <div className="flex flex-col gap-1">
                    <label className="text-sm" htmlFor="county">County</label>
                    <input value={formInput?.county} onChange={handleInputChange} className="md:h-9 text-gray-400 h-12 border-[0.1px] border-gray-500 rounded-lg p-2 outline-none bg-accent" required id="county" name="county" type="text" />
                </div>
                <div className="flex flex-col gap-1">
                    <label className="text-sm" htmlFor="city">City/Town</label>
                    <input value={formInput?.city} onChange={handleInputChange} className="md:h-9 text-gray-400 h-12 border-[0.1px] border-gray-500 rounded-lg p-2 outline-none bg-accent" required id="city" name="city" type="text" />
                </div>
                <button disabled={pending} type="submit" className="w-full bg-secondary py-2 rounded-lg cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed hover:text-gray-300">{pending ? <>Saving...</> : <>Save Changes</>}</button>
            </form>
        </div>
    )
}