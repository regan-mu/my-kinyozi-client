// Manage Context for Expenses and Expense Accounts.
import {createContext, useState} from "react";

export const ExpensesContext = createContext();

export const ExpensesContextProvider = ({children}) => {
    const [addExpense, setAddExpense] = useState(false);
    const [idToModify, setIdToModify] = useState("");
    const [expenseAccounts, setExpenseAccounts] = useState([]);
    const [expenseActions, setExpenseActions] = useState("");
    const [modifySuccessful, setModifySuccessful] = useState(false); // Trigger refetch expenses every time data is Deleted or Edited, 
    
    const [refetchAccounts, setRefetchAccounts] = useState(false); // Trigger accounts refetch everytime they are modified: Deleted, Edited
    const [addExpenseAccount, setAddExpenseAccount] = useState(false); // Expense Account
    return <ExpensesContext.Provider
        value={{
            addExpense,
            setAddExpense,
            idToModify,
            setIdToModify,
            expenseAccounts,
            setExpenseAccounts,
            expenseActions,
            setExpenseActions,
            modifySuccessful,
            setModifySuccessful,
            addExpenseAccount,
            setAddExpenseAccount,
            refetchAccounts,
            setRefetchAccounts
        }}
    >
        {children}
    </ExpensesContext.Provider>
}