import { AdminContext } from "@/app/context/AdminContext";
import { NotificationsContext } from "@/app/context/NotificationsContext";
import { useContext } from "react";
import DataTable from "../../DataTable";

export default function NotificationsList() {
    const {notifications} = useContext(AdminContext);
    const {setOpenNotification, setCurrentNotification} = useContext(NotificationsContext);

    const handleNotificationView = (id) => {
        setOpenNotification(true);
        const notificationClicked = notifications.filter(item => item.id === id)[0];
        setCurrentNotification(notificationClicked);
    }

    const notificationColumns = [
        {
            field: "id",
            headerName: "id", 
            width: 75, 
            headerAlign: "center",
            editable:false,
        },
        {
            field: "title",
            headerName: "Title", 
            width: 250, 
            headerAlign: "center",
            editable:false,
        },
        {
            field: "read",
            headerName: "Read", 
            width: 100, 
            headerAlign: "center",
            editable:false,
        },
        {
            field: "created_at",
            headerName: "Date", 
            width: 250, 
            headerAlign: "center",
            editable:false,
        },
        {
            field: "actions",
            headerName: "Actions", 
            width: 200, 
            headerAlign: "center",
            editable:false,
            renderCell: (params) => {
                return (
                    <div>
                        {
                            !params?.row?.read ? 
                                <button onClick={() => (handleNotificationView(params?.row?.id))} className="px-5 py-1 bg-secondary text-xm rounded-md" type="button">Open</button> : 
                                <p onClick={() => (handleNotificationView(params?.row?.id))} className="text-gray-400 underline cursor-pointer">[ Read ]</p>
                        }
                    </div>
                )
            }
        },
    ]
    return (
        <DataTable columns={notificationColumns} rows={notifications} />
    )
}