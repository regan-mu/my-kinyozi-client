import { useState, createContext } from "react";

export const EquipmentContext = createContext();

export const EquipmentContextProvider = ({children}) => {
    const [addEquipment, setAddEquipment] = useState(false);
    const [equipmentActions, setEquipmentActions] = useState(false);
    const [idToModify, setIdToModify] = useState("");
    const [modifySuccess, setModifySuccess] = useState(false);
    return <EquipmentContext.Provider
        value={{
            addEquipment,
            setAddEquipment,
            equipmentActions,
            setEquipmentActions,
            idToModify,
            setIdToModify,
            modifySuccess,
            setModifySuccess
        }}
    >
        {children}
    </EquipmentContext.Provider>
}