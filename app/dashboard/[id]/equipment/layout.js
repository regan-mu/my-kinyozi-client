"use client";
import { EquipmentContextProvider } from "@/app/context/EquipmentContext";

export default function RootLayout({children}) {
    return (
        <EquipmentContextProvider>
            {children}
        </EquipmentContextProvider>
    )
}