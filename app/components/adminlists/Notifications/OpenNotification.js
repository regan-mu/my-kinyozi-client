import Image from "next/image";
import { useState, useContext } from "react";
import { NotificationsContext } from "@/app/context/NotificationsContext";

export default function OpenNotification() {
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const {setOpenNotification, currentNotification, setCurrentNotification} = useContext(NotificationsContext);

    const handleRead = () => {
        // Include the function in the 
        setCurrentNotification(prev => {return {...prev, read: true}});
    }
    
    return (
        <div className="bg-black bg-opacity-70 py-10 fixed w-full h-screen top-0 left-0 z-20 flex justify-center items-center">
            <div className="bg-dark-blue border-[0.1px] border-accent  flex flex-col gap-5 w-96 h-96 p-5 rounded-xl text-white relative">
                <div className="w-full flex justify-between items-center h-auto pb-5 border-b-[0.1px] border-gray-800">
                    {error && <div className="w-full h-10 text-sm absolute left-0 -top-5 rounded-md flex items-center justify-center font-semibold bg-red-200 text-red-600">{error}</div> }
                    {success && <div className="w-full h-10 text-sm absolute left-0 -top-5 rounded-md flex items-center justify-center font-semibold bg-green-200 text-green-800">{success}</div>}
                    <h3 className="font-light text-sm">Notification</h3>
                    <Image onClick={() => {setOpenNotification(false)}} className="w-[16px] h-[16px] cursor-pointer" src="/open-menu.svg" alt="close" width={16} height={16} />
                </div>
                <div className="h-full flex flex-col gap-3">
                    <h3 className="font-semibold text-xl">{currentNotification?.title}</h3>
                    <p className="text-base font-extralight text-gray-400 h-full">{currentNotification?.message}</p>
                    <p className="text-xs font-thin"><span className="text-secondary font-semibold">Sent on: </span>{currentNotification?.created_at}</p>
                </div>
                <div className="w-full h-20 flex justify-between items-center">
                    <button className="px-8 text-sm py-2 rounded-full cursor-pointer bg-red-700">Delete</button>
                    {!currentNotification.read && <button onClick={handleRead} className="px-8 text-sm py-2 rounded-full bg-gray-700 cursor-pointer">Mark as Read</button>}
                </div>
            </div>
        </div>
    )
}