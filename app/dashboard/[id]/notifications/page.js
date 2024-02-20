"use client";
import { useEffect, useContext, useState } from "react";
import { AdminContext } from "@/app/context/AdminContext";
import NotificationsList from "@/app/components/adminlists/Notifications/NotificationsList";
import { NotificationsContext } from "@/app/context/NotificationsContext";
import OpenNotification from "@/app/components/adminlists/Notifications/OpenNotification";
import axios from "axios";
import axiosConfig from "@/app/Utils/axiosRequestConfig";

export default function Notifications({params}) {
    const {setActivePage, setNotifications} = useContext(AdminContext);
    const {openNotification, notificationMutation} = useContext(NotificationsContext);
    const [error, setError] = useState("");

    useEffect(() => {
        setActivePage("Notifications");
        const fetchData = async () => {
            axios(axiosConfig("get", `https://my-kinyozi-server.onrender.com/API/notifications/fetch/all/${params.id}`, null)).then(
                res => {
                    setNotifications(res?.data?.notifications);
                }
            ).catch(err => {
                if (![404, 401].includes(err?.response?.status)) {
                    setError("Something went wrong. Try Again");
                } else {
                    setError(err?.response?.data?.message);
                }
            });
        };
        fetchData();
    }, [notificationMutation]);

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