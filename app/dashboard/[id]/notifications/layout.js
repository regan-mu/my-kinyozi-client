"use client";
import { NotificationsContextProvider } from "@/app/context/NotificationsContext";

export default function RootLayout({ children }) {
    return (
      <NotificationsContextProvider>
        {children}
      </NotificationsContextProvider>
    )
}