import {useState, createContext} from "react";

export const NotificationsContext = createContext();

export const NotificationsContextProvider = ({children}) => {
    const [openNotification, setOpenNotification] = useState(false); // Notifications view Popup
    const [currentNotification, setCurrentNotification] = useState({}); // Notification being viewed in Popup above
    return <NotificationsContext.Provider
        value={{
            openNotification,
            setOpenNotification,
            currentNotification,
            setCurrentNotification
        }}
    >
        {children}
    </NotificationsContext.Provider>
}