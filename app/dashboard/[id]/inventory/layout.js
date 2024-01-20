"use client";
import { InventoryContextProvider } from "@/app/context/InventoryContext";

export default function RootLayout({ children }) {
    return (
        <InventoryContextProvider>
            {children}
        </InventoryContextProvider>
    )
}