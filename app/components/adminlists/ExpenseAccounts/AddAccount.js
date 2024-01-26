import Image from "next/image";
import { ExpensesContext } from "@/app/context/ExpensesContext";
import { useContext, useState } from "react";
import axios from "axios";

export default function AddExpenseAccount({token, id}) {
    const {setAddExpenseAccount, setRefetchAccounts} = useContext(ExpensesContext);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const [pending, setPending] = useState(false);

    const closeAddForm = () => {
        setAddExpenseAccount(false);
    }

    // Form Data State
    const [formData, setFormData] = useState({
        accountName: '',
        accountDescription: ''
    });
    
    // Handle form field Changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value.trimStart(),
        });
        setError("");
        setSuccess("");
    };

    const createAccount = (e) => {
        const API_KEY = process.env.NEXT_PUBLIC_API_KEY;
        e.preventDefault();
        setPending(true);
        const axiosConfig = {
            method: "post",
            url: `https://www.mykinyozi.com/API/expense-account/create/${id}`,
            data: formData,
            headers: {
                "Content-Type": "application/json",
                "X-API-KEY": API_KEY,
                "x-access-token": token
            }
        }
        axios(axiosConfig).then(
            res => {
                setSuccess(res?.data?.message);
                setFormData({
                    accountName: '',
                    accountDescription: ''
                });
                setPending(false);
                setRefetchAccounts(prev => !prev);
            }
        ).catch(
            err => {
                if (![404, 401, 409].includes(err?.response?.status)) {
                    setError("Failed. Please try again");
                } else {
                    setError(err?.response?.data?.message);
                }
                setPending(false);
            }
        )
        
    }

    return (
        <div className="bg-black bg-opacity-70 py-10 fixed w-full h-screen top-0 left-0 z-20 flex justify-center items-center">
            <div className="bg-dark-blue border-[0.1px] border-accent  flex flex-col gap-5 w-96 h-80 p-5 rounded-xl text-white relative">
                <div className="w-full h-auto flex justify-between items-center">
                {error && <div className="w-full h-10 text-sm absolute left-0 -top-5 rounded-md flex items-center justify-center font-semibold bg-red-200 text-red-600">{error}</div> }
                {success && <div className="w-full h-10 text-sm absolute left-0 -top-5 rounded-md flex items-center justify-center font-semibold bg-green-200 text-green-800">{success}</div>}
                    <h3 className="font-semibold text-lg">New Expense Account</h3>
                    <Image onClick={closeAddForm} className="w-[16px] h-[16px] cursor-pointer" src="/open-menu.svg" alt="close" width={16} height={16} />
                </div>
                <form onSubmit={createAccount} className="flex flex-col gap-3 text-gray-300">
                    <div className="flex flex-col gap-2">
                        <label className="text-sm font-semibold" htmlFor="accountName">Account</label>
                        <input className="outline-none w-full bg-dark-blue text-sm border-[0.1px] border-gray-700 h-10 p-3 rounded-md" required type="text" id="accountName" name="accountName" value={formData.accountName} onChange={handleChange} />
                    </div>
                    <div className="flex flex-col gap-2">
                        <label className="text-sm font-semibold" htmlFor="accountDescription">Description</label>
                        <input className="outline-none w-full bg-dark-blue text-sm border-[0.1px] border-gray-700 h-10 p-3 rounded-md" required type="text" id="accountDescription" name="accountDescription" value={formData.accountDescription} onChange={handleChange} />
                    </div>
                    <button disabled={pending} type="submit" className="w-full h-10 bg-secondary rounded-md cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed">{pending ? <>Adding...</>: <>Add Account</>}</button>
                </form>
            </div>
        </div>
    )
}