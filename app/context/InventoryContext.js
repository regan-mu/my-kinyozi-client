import {useState, createContext} from "react";

export const InventoryContext = createContext();

export const InventoryContextProvider = ({children}) => {
    const [addInventory, setAddInventory] = useState(false);
    const [modifySuccessful, setModifySuccessful] = useState(false);
    const [inventoryActions, setInventoryActions] = useState("");
    const [idToModify, setIdToModify] = useState("");

    return <InventoryContext.Provider
        value={{
            addInventory,
            setAddInventory,
            modifySuccessful,
            setModifySuccessful,
            inventoryActions,
            setInventoryActions,
            idToModify,
            setIdToModify
        }}
    >
        {children}
    </InventoryContext.Provider>
}