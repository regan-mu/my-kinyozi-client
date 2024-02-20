import Image from "next/image";
import AccountList from "./AccountsList";
import { ExpensesContext } from "@/app/context/ExpensesContext";
import { useContext, useEffect } from "react";
import AddExpenseAccount from "./AddAccount";
import { AdminContext } from "@/app/context/AdminContext";
import DeleteAccount from "./DeleteExpenseAcount";
import axios from "axios";
import axiosConfig from "@/app/Utils/axiosRequestConfig";


export default function AccountsPage({id}) {
    const {addExpenseAccount, expenseActions, setAddExpenseAccount, refetchAccounts} = useContext(ExpensesContext);
    const {setAccounts} = useContext(AdminContext);

    useEffect(() => {
        const fetchData = async () => {
            axios(axiosConfig("GET", `https://my-kinyozi-server.onrender.com/API/expense-accounts/fetch/${id}`, null)).then(
                res => {
                    setAccounts(res?.data?.accounts);
                }
            ).catch(
                err => {
                    if (![404, 401].includes(err?.response?.status)) {
                        setError("Failed. Please try again");
                    } else {
                        setError(err?.response?.data?.message);
                    }
                }
            )
        };
        fetchData();
    }, [refetchAccounts]);

    return (
        <div className="flex flex-col text-white p-5 pt-0">
            {addExpenseAccount && <AddExpenseAccount id={id} />}
            {expenseActions === "accounts" && <DeleteAccount />}
            <div className="w-full h-20 flex justify-between items-center border-b-[0.1px] border-gray-800">
                <h3 className="font-extralight text-4xl">Expense Accounts</h3>
                <div className="flex h-full items-center">
                    <button onClick={() => {setAddExpenseAccount(true)}} type="button" className="flex gap-2 bg-secondary w-max h-10 items-center px-6 rounded-3xl">
                        <Image src="/plus.svg" alt="plus-icon" width={12} height={12} />
                        New Account
                    </button>
                </div>
            </div>
            <div className="h-full rounded-2xl overflow-hidden p-1 relative">
                <AccountList  />
            </div>
        </div>
    )
}