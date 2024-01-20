import { useState, useContext } from "react";
import Image from "next/image";
import { ExpensesContext } from "@/app/context/ExpensesContext";
import { AdminContext } from "@/app/context/AdminContext";
import axios from "axios";

export default function EditExpense ({token}) {
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const [pending, setPending] = useState(false);
    const {setExpenseActions, idToModify, setModifySuccessful} = useContext(ExpensesContext);
    const {expenses} = useContext(AdminContext);

    // Fetch the initial form State from the Selected Expense value
    const [formData, setFormData] = useState(
        {
            expenseName: expenses.filter(item => item.id === idToModify)[0]?.expense,
            expenseAmount: expenses.filter(item => item.id === idToModify)[0]?.amount,
            expenseDescription: expenses.filter(item => item.id === idToModify)[0]?.description
        }
    );

    // Handle Form Change
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    // Handle Expense Edit
    const editExpense = (e) => {
        e.preventDefault();
        const API_KEY = process.env.NEXT_PUBLIC_API_KEY;
        setPending(true);
        const axiosConfig = {
            method: "put",
            url: `http://127.0.0.1:5000/API/expense/update/${idToModify}`,
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
                setPending(false);
                setModifySuccessful(prev => !prev);
                setTimeout(() => {setExpenseActions("")}, 2000);
            }
        ).catch(
            err => {
                if (![404, 401].includes(err?.response?.status)) {
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
            <div className="bg-dark-blue border-[0.1px] border-accent  flex flex-col gap-5 w-80 h-96 p-5 rounded-xl text-white relative">
                <div className="w-full h-auto flex justify-between items-center">
                {error && <div className="w-full h-10 text-sm absolute left-0 -top-5 rounded-md flex items-center justify-center font-semibold bg-red-200 text-red-600">{error}</div> }
                {success && <div className="w-full h-10 text-sm absolute left-0 -top-5 rounded-md flex items-center justify-center font-semibold bg-green-200 text-green-800">{success}</div>}
                    <h3 className="font-semibold text-lg">Edit Expense</h3>
                    <Image onClick={() => {setExpenseActions("")}} className="w-[16px] h-[16px] cursor-pointer" src="/open-menu.svg" alt="close" width={16} height={16} />
                </div>
                <form onSubmit={editExpense} className="flex flex-col gap-3 text-gray-300">
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
                    <button disabled={pending} type="submit" className="w-full h-10 bg-secondary rounded-md cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed">{pending ? <>Updating...</>: <>Edit Expense</>}</button>
                </form>
            </div>
        </div>
    )
}