import Image from "next/image";
import { useState, useContext } from "react";
import { ExpensesContext } from "@/app/context/ExpensesContext";
import uniqid from "uniqid";
import axios from "axios";

export default function AddExpense({id, token}) {
    const {setAddExpense, expenseAccounts, setModifySuccessful} = useContext(ExpensesContext);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const [pending, setPending] = useState(false);

    // Form Data State
    const [formData, setFormData] = useState({
        expenseName: '',
        expenseAmount: '',
        expenseDescription: '',
        expenseAccount: ''
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

    // Close the Expense Form Popup
    const closeAddForm = () => {
        setAddExpense(false);
    }

    //Post New Sale
    const recordExpense = (e) => {
        const API_KEY = process.env.NEXT_PUBLIC_API_KEY;
        e.preventDefault();
        if (formData.expenseAccount == "") {
            setError("Payment Method is Empty");
        } else {
            setPending(true);
            const axiosConfig = {
                method: "post",
                url: `http://127.0.0.1:5000/API/expense/create/${id}`,
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
                        expenseName: '',
                        expenseAmount: '',
                        expenseDescription: '',
                        expenseAccount: ''
                    });
                    setPending(false);
                    setModifySuccessful(prev => !prev);
                }
            ).catch(
                err => {
                    if (!err?.response?.status) {
                        setError("Failed. Please try again");
                    } else {
                        setError(err?.response?.data?.message);
                    }
                    setPending(false);
                }
            )
        }
    }
    
    return (
        <div className="bg-black bg-opacity-70 py-10 fixed w-full h-screen top-0 left-0 z-20 flex justify-center items-center">
            <div className="bg-dark-blue border-[0.1px] border-accent  flex flex-col gap-5 w-96 h-full p-5 rounded-xl text-white relative">
                <div className="w-full h-auto flex justify-between items-center">
                {error && <div className="w-full h-10 text-sm absolute left-0 -top-5 rounded-md flex items-center justify-center font-semibold bg-red-200 text-red-600">{error}</div> }
                {success && <div className="w-full h-10 text-sm absolute left-0 -top-5 rounded-md flex items-center justify-center font-semibold bg-green-200 text-green-800">{success}</div>}
                    <h3 className="font-semibold text-lg">New Expense</h3>
                    <Image onClick={closeAddForm} className="w-[16px] h-[16px] cursor-pointer" src="/open-menu.svg" alt="close" width={16} height={16} />
                </div>
                <form onSubmit={recordExpense} className="flex flex-col gap-3 text-gray-300">
                    <div className="flex flex-col gap-2">
                        <label className="text-sm font-semibold" htmlFor="expenseName">Expense</label>
                        <input className="outline-none w-full bg-dark-blue text-sm border-[0.1px] border-gray-700 h-10 p-3 rounded-md" required type="text" id="expenseName" name="expenseName" value={formData.expenseName} onChange={handleChange} />
                    </div>

                    <div className="flex flex-col gap-2">
                        <label className="text-sm font-semibold" htmlFor="expenseAmount">Amount</label>
                        <input className="outline-none w-full bg-dark-blue text-sm border-[0.1px] border-gray-700 h-10 p-3 rounded-md" required type="number" id="expenseAmount" name="expenseAmount" value={formData.expenseAmount} onChange={handleChange} />
                    </div>
                    <div className="flex flex-col gap-2">
                        <label className="text-sm font-semibold" htmlFor="expenseDescription">Description</label>
                        <input className="outline-none w-full bg-dark-blue text-sm border-[0.1px] border-gray-700 h-10 p-3 rounded-md" required type="text" id="expenseDescription" name="expenseDescription" value={formData.expenseDescription} onChange={handleChange} />
                    </div>
                    <div className="flex flex-col gap-2">
                        <label className="text-sm font-semibold" htmlFor="account">Expense Account</label>
                        <select className="outline-none bg-dark-blue text-sm border-[0.1px] border-gray-700 h-10 p-1 rounded-md" id="account" name="expenseAccount" value={formData.expenseAccount}  onChange={handleChange} >
                            <option value="">--Select--</option>
                            {expenseAccounts ? expenseAccounts.map(account => <option key={uniqid()} value={account.accountId}>{account.account}</option>): []}
                        </select>
                    </div>
                    <button disabled={pending} type="submit" className="w-full h-10 bg-secondary rounded-md cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed">{pending ? <>Adding...</>: <>Add Expense</>}</button>
                </form>
            </div>
        </div>
    )
}