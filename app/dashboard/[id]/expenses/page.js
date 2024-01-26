"use client";
import Image from "next/image";
import { useContext, useEffect, useState } from "react";
import Cookies from "universal-cookie";
import uniqid from "uniqid";
import { ExpensesContext } from "@/app/context/ExpensesContext";
import AddExpense from "@/app/components/adminlists/Expenses/AddExpense";
import { AdminContext } from "@/app/context/AdminContext";
import ExpenseList from "@/app/components/adminlists/Expenses/ExpensesList";
import DeleteExpense from "@/app/components/adminlists/Expenses/DeleteExpense";
import EditExpense from "@/app/components/adminlists/Expenses/EditExpense";
import AccountsPage from "@/app/components/adminlists/ExpenseAccounts/AccountsPage";

export default function Expenses ({params}) {
    const {addExpense, setAddExpense, expenseActions, setExpenseAccounts, modifySuccessful} = useContext(ExpensesContext);
    const { expenses, setExpenses, setActivePage, activeExpensesTab} = useContext(AdminContext);
    const cookies = new Cookies();
    const token = cookies.get("token");
    const [years, setYears] = useState([]);
    const [queryMonth, setQueryMonth] = useState("all");
    const [queryYear, setQueryYear] = useState("all");

    // Handle Month Dropdown
    const handleMonth = (e) => {
        const {value} = e.target;
        setQueryMonth(value);
    }

    // Handle Year Dropdown
    const handleYear = (e) => {
        const {value} = e.target;
        setQueryYear(value);
    }

    // Filter Data By Yr and Month
    const filteredData = expenses?.filter(item => {
        const monthCondition = queryMonth !== "all" ? item.month === Number(queryMonth) : true;
        const yearCondition = queryYear !== "all" ? item.year === Number(queryYear) : true;
        return yearCondition && monthCondition;
    });

    useEffect(() => {
        setActivePage("Expenses");
        const fetchData = async () => {
            const API_KEY = process.env.NEXT_PUBLIC_API_KEY;
            try {
            const response = await fetch(`https://www.mykinyozi.com/API/expenses/fetch/${params.id}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'X-API-KEY': API_KEY,
                    'x-access-token': token
                },
                next: { tags: ["expenses"] }
            });
    
            const data = await response.json();
            setExpenses(data.expenses);
            setYears(data.years);
            setExpenseAccounts(data.accounts);
            } catch (error) {
            console.log(error);
            }
        };
        fetchData();
    }, [modifySuccessful]);

    return (
        <>
        { activeExpensesTab === "expenses" ?
            <div className="flex flex-col text-white p-5 pt-0">
                {addExpense && <AddExpense id={params.id} token={token} />}
                {expenseActions === "delete" && <DeleteExpense token={token} />}
                {expenseActions === "edit" && <EditExpense token={token} />}
                <div className="w-full h-20 flex justify-between items-center border-b-[0.1px] border-gray-800">
                    <h3 className="font-extralight text-4xl">Expenses</h3>
                    <div className="flex gap-5 h-full items-center">
                        <div className="flex flex-col gap-2">
                            <select value={queryMonth} onChange={handleMonth} className="bg-accent text-sm h-10 border-[0.1px] outline-none border-secondary text-secondary px-5 rounded-md" id="monthSelector" name="month">
                                <option value="all">All</option>
                                <option value="1">January</option>
                                <option value="2">February</option>
                                <option value="3">March</option>
                                <option value="4">April</option>
                                <option value="5">May</option>
                                <option value="6">June</option>
                                <option value="7">July</option>
                                <option value="8">August</option>
                                <option value="9">September</option>
                                <option value="10">October</option>
                                <option value="11">November</option>
                                <option value="12">December</option>
                            </select>
                        </div>
                        <div className="flex flex-col gap-2 h-full justify-center">
                            <select value={queryYear} onChange={handleYear} className="bg-accent h-10 border-[0.1px] outline-none border-secondary text-secondary px-5 rounded-md" id="yearSelector" name="year">
                                <option value="all">All</option>
                                {years && years.map(yr => <option key={uniqid()} value={yr}>{yr}</option>)}
                            </select>
                        </div>
                        <button onClick={() => {setAddExpense(true)}} type="button" className="flex gap-2 bg-secondary w-max h-10 items-center px-6 rounded-3xl">
                            <Image src="/plus.svg" alt="plus icon" width={12} height={12} />
                            New Expense
                        </button>
                    </div>
                </div>
                <div className="h-full rounded-2xl overflow-hidden p-1 relative">
                    <ExpenseList data={filteredData} />
                </div>
            </div>:
            <AccountsPage token={token} id={params.id} />
        }
        </>
    )
}