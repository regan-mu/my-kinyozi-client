import { useState, createContext } from "react";

export const AdminContext = createContext()

export const AdminContextProvider = ({children}) => {
    const [accessToken, setAccessToken] = useState(false);
    const [isDashLoading, setIsDashLoading] = useState(true);
    const [activePage, setActivePage] = useState(false); // Setting the currently opened admin page
    const [equipments, setEquipments] = useState([]); // Shop Equipments
    const [sales, setSales] = useState([]); // Shop Sales
    const [expenses, setExpenses] = useState([]); // Shop Expenses
    const [services, setServices] = useState([]); // Shop Services
    const [accounts, setAccounts] = useState([]); // Shop Expense Accounts
    const [activeExpensesTab, setActiveExpensesTab] = useState("expenses"); // Sets the active tab in expenses page
    const [inventory, setInventory] = useState([]); // Shop inventory
    const [notifications, setNotifications] = useState([]);
    
    return <AdminContext.Provider
        value={{
            accessToken,
            setAccessToken,
            isDashLoading,
            setIsDashLoading,
            activePage,
            setActivePage,
            equipments,
            setEquipments,
            sales,
            setSales,
            expenses,
            setExpenses,
            services,
            setServices,
            activeExpensesTab,
            setActiveExpensesTab,
            accounts,
            setAccounts,
            inventory,
            setInventory,
            notifications,
            setNotifications
        }}
    >
        {children}
    </AdminContext.Provider>
}