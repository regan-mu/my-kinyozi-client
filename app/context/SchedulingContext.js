import {useState, createContext} from "react";

export const ScheduleContext = createContext();

export const ScheduleContextProvider = ({children}) => {
    return (
        <ScheduleContext.Provider
            value={{
                
            }}
        >
            {children}
        </ScheduleContext.Provider>
    )
}