"use client";
import { ScheduleContextProvider } from "@/app/context/SchedulingContext";
export default function RootLayout({ children }) {
    return (
        <>
            <ScheduleContextProvider>
                {children}
            </ScheduleContextProvider>
        </>
    )
}