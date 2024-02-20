// Context manager for the Staff account page.
import {useState, createContext} from "react";

export const StaffAccountContext = createContext()

export const StaffAccountContextProvider = ({children}) => {
    const [updateInventory, setUpdateInventory] = useState(false); // Open and close the update Inventory Popup.
    const [itemToUpdate, setItemToUpdate] = useState({id: "", item: ""}); // Inventory item to be Updated.
    const [inventoryUpdateSuccess, setInventoryUpdateSuccess] = useState(false) //Update when update is successfull for daa refetch
    const [inventoryData, setInventoryData] = useState([]); // Inventory associated with this staff's shop
    const [staffData, setStaffData] = useState({}); // Logged in Staff Data
    const [servicesData, setServicesData] = useState([]); // Services associated with this staff's shop
    const [error, setError] = useState(""); // Errors
    const [success, setSuccess] = useState(""); // Success
    const [filteredBy, setFilteredBy] = useState(1); // Set the filter for product level
    return <StaffAccountContext.Provider
        value={{
            updateInventory,
            setUpdateInventory,
            itemToUpdate,
            setItemToUpdate,
            inventoryUpdateSuccess,
            setInventoryUpdateSuccess,
            inventoryData,
            setInventoryData,
            staffData,
            setStaffData,
            servicesData,
            setServicesData,
            error, setError,
            success, setSuccess,
            filteredBy, setFilteredBy
        }}
    >
        {children}
    </StaffAccountContext.Provider>
}