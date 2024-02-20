import { useState, createContext } from "react";

// Manage context for the whole Admin Dashboard
export const AdminContext = createContext()

export const AdminContextProvider = ({children}) => {
    const [accessToken, setAccessToken] = useState(false);
    const [isDashLoading, setIsDashLoading] = useState(true);
    const [activePage, setActivePage] = useState(false); // Setting the currently opened admin page.
    const [equipments, setEquipments] = useState([]); // Shop Equipments.
    const [sales, setSales] = useState([]); // Shop Sales.
    const [expenses, setExpenses] = useState([]); // Shop Expenses.
    const [services, setServices] = useState([]); // Shop Services.
    const [accounts, setAccounts] = useState([]); // Shop Expense Accounts.
    const [activeExpensesTab, setActiveExpensesTab] = useState("expenses"); // Sets the active tab in expenses page.
    const [inventory, setInventory] = useState([]); // Shop inventory.
    const [notifications, setNotifications] = useState([]); // Notifications.
    const [homeData, setHomeData] = useState({}); // Data for the Admin Home Visualization.
    const [staff, setStaff] = useState([]); // Staff members
    const [activeStaffTab, setActiveStaffTab] = useState("barbers"); // Active tab on the staff page
    const [barbers, setBarbers] = useState([]); // Barbers Data
    const [appointments, setAppointments] = useState([]); // Scheduled appointments for the shop
    
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
            setNotifications,
            homeData,
            setHomeData,
            staff,
            setStaff,
            activeStaffTab,
            setActiveStaffTab,
            barbers,
            setBarbers,
            appointments,
            setAppointments
        }}
    >
        {children}
    </AdminContext.Provider>
}