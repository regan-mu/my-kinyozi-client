"use client";
import { SalesContextProvider } from "@/app/context/SalesContext"
export default function RootLayout({ children }) {
    return (
      <>
        <SalesContextProvider>
          {children}
        </SalesContextProvider>
      </>
    )
}