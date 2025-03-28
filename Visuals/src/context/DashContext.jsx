import { createContext, useContext, useState } from "react";

const DashContext = createContext();

export const DashProvider = ({children})=>{

    const [animalData, setAnimalData] = useState('');
    
    return(
        <DashContext.Provider value={{animalData, setAnimalData}} >
            {children}
        </DashContext.Provider>
    )
}

export function useDash(){
    return useContext(DashContext);
}