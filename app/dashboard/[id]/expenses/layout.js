"use client";
import { ExpensesContextProvider } from "@/app/context/ExpensesContext";
import { AdminContext } from "@/app/context/AdminContext";
import { useContext } from "react";
export default function RootLayout({ children }) {
    const {activeExpensesTab, setActiveExpensesTab} = useContext(AdminContext);
    return (
      <div className="w-full h-full flex flex-col">
        <div className="w-full h-auto flex gap-10 justify-start items-center text-white p-5">
          <h3 onClick={(() => {setActiveExpensesTab("expenses")})} className={`cursor-pointer font-semibold text-lg ${activeExpensesTab === 'expenses' && "border-secondary border-b-4 text-secondary"} pb-1 px-2`}>Expenses</h3>
          <h3 onClick={() => {setActiveExpensesTab("accounts")}} className={`cursor-pointer font-semibold text-lg ${activeExpensesTab === 'accounts' && "border-secondary border-b-4 text-secondary"} pb-1 px-2`}>Expense Accounts</h3>
        </div>
        <ExpensesContextProvider>
          {children}
        </ExpensesContextProvider>
      </div>
    )
}