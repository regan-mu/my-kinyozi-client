import {useState, createContext} from "react";

export const ServiceContext = createContext();

export const ServiceContextProvider = ({children}) => {
    const [addService, setAddService] = useState(false);
    const [serviceActions, setServiceActions] = useState("");
    const [idToModify, setIdToModify] = useState("");
    const [modifySuccessful, setModifySuccessful] = useState(false); // Trigger when data changes: create, update, delete
    return <ServiceContext.Provider
        value={{
            addService,
            setAddService,
            serviceActions,
            setServiceActions,
            idToModify,
            setIdToModify,
            modifySuccessful,
            setModifySuccessful
        }}
    >
        {children}
    </ServiceContext.Provider>
}