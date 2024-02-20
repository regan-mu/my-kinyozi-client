// Manage context for the staff page on the Admin page
import {useState, createContext} from "react";

export const StaffContext = createContext()

export const StaffContextProvider = ({children}) => {
    const [staffActions, setStaffActions] = useState(""); // Open and close the add/update staff popup
    const [staffMutation, setStaffMutation] = useState(false); // Trigger for when staff mutation happens; new staff, update, delete
    const [idToMutate, setIdToMutate] = useState(""); // ID of the staff being mutated above
    const [changeBarberStatus, setChangeBarberStatus] = useState(false); // Trigger when barber status changes
    return <StaffContext.Provider
        value={{
            staffActions,
            setStaffActions,
            staffMutation,
            setStaffMutation,
            idToMutate,
            setIdToMutate,
            changeBarberStatus,
            setChangeBarberStatus
        }}
    >
        {children}
    </StaffContext.Provider>

} 