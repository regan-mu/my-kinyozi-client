import Image from "next/image";
import AccountList from "./AccountsList";
import { ExpensesContext } from "@/app/context/ExpensesContext";
import { useContext, useEffect } from "react";
import AddExpenseAccount from "./AddAccount";
import { AdminContext } from "@/app/context/AdminContext";
import DeleteAccount from "./DeleteExpenseAcount";


export default function AccountsPage({token, id}) {
    const {addExpenseAccount, expenseActions, setAddExpenseAccount, refetchAccounts} = useContext(ExpensesContext);
    const {setAccounts} = useContext(AdminContext);

    useEffect(() => {
        const fetchData = async () => {
            const API_KEY = process.env.NEXT_PUBLIC_API_KEY;
            try {
            const response = await fetch(`https://www.mykinyozi.com/API/expense-accounts/fetch/${id}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'X-API-KEY': API_KEY,
                    'x-access-token': token
                },
                next: { tags: ["expenses"] }
            });
    
            const data = await response.json();
            setAccounts(data.accounts);
            } catch (error) {
            console.log(error);
            }
        };
        fetchData();
    }, [refetchAccounts]);

    return (
        <div className="flex flex-col text-white p-5 pt-0">
            {addExpenseAccount && <AddExpenseAccount token={token} id={id} />}
            {expenseActions === "accounts" && <DeleteAccount token={token} />}
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