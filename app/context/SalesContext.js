import {useState, createContext} from "react";

export const SalesContext = createContext();

export const SalesContextProvider = ({children}) => {
    const [addSale, setAddSale] = useState(false);
    const [saleActions, setSaleActions] = useState(false);
    const [saleIdToDelete, setSaleIdToDelete] = useState("");
    const [modifySuccessful, setModifySuccessful] = useState(false); // Trigger data refect everytime new sale is added
    const [services, setServices] = useState([]);
    return <SalesContext.Provider
        value = {{
            addSale,
            setAddSale,
            saleActions,
            setSaleActions,
            saleIdToDelete,
            setSaleIdToDelete,
            services,
            setServices,
            modifySuccessful, setModifySuccessful
        }}
    >
        {children}
    </SalesContext.Provider>
}


