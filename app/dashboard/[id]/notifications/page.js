"use client";
import { useEffect, useContext } from "react";
import { AdminContext } from "@/app/context/AdminContext";
import NotificationsList from "@/app/components/adminlists/Notifications/NotificationsList";
import Cookies from "universal-cookie";
import { NotificationsContext } from "@/app/context/NotificationsContext";
import OpenNotification from "@/app/components/adminlists/Notifications/OpenNotification";

export default function Notifications({params}) {
    const cookies = new Cookies();
    const token = cookies.get("token");
    const {setActivePage, setNotifications} = useContext(AdminContext);
    const {openNotification} = useContext(NotificationsContext);

    useEffect(() => {
        setActivePage("Notifications");
        const fetchData = async () => {
            const API_KEY = process.env.NEXT_PUBLIC_API_KEY;
            try {
            const response = await fetch(`https://my-kinyozi-server.onrender.com/API/notifications/fetch/all/${params.id}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'X-API-KEY': API_KEY,
                    'x-access-token': token
                },
                next: { tags: ["inventory"] }
            });
    
            const data = await response.json();
            setNotifications(data.notifications);
            } catch (error) {
            console.log(error);
            }
        };
        fetchData();
    }, []);

    return (
        <div className="flex flex-col text-white md:p-5">
            {openNotification && <OpenNotification />}
            <div className="w-full h-20 flex justify-between items-center border-b-[0.1px] border-gray-800">
                <h3 className="font-extralight text-4xl">Notifications</h3>
            </div>
            <div className="h-full rounded-2xl overflow-hidden p-1 relative">
                <NotificationsList />
            </div>
        </div>
    )
}