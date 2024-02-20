import {useState, createContext} from "react";

export const NotificationsContext = createContext();

export const NotificationsContextProvider = ({children}) => {
    const [openNotification, setOpenNotification] = useState(false); // Notifications view Popup
    const [currentNotification, setCurrentNotification] = useState({}); // Notification being viewed in Popup above
    const [notificationMutation, setNotificationMutation] = useState(false); // Flag for when then notification is read or deleted
    return <NotificationsContext.Provider
        value={{
            openNotification,
            setOpenNotification,
            currentNotification,
            setCurrentNotification,
            notificationMutation,
            setNotificationMutation
        }}
    >
        {children}
    </NotificationsContext.Provider>
}