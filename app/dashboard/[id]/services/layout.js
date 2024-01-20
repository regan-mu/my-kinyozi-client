"use client";
import { ServiceContextProvider } from "@/app/context/ServicesContext";
export default function RootLayout({ children }) {
    return (
      <>
      <ServiceContextProvider>
        {children}
      </ServiceContextProvider>
      </>
    )
}