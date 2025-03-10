import React, { createContext, useContext, useState } from 'react'

const UserContext = createContext();

export const UserProvider = ({children})=>{
    const [apiUrl, setApiUrl] = useState('');
    const [user, setUser] = useState('');

    return (
        <UserContext.Provider value={{apiUrl, setApiUrl, user, setUser}}>
          {children}
        </UserContext.Provider>
      )
}

export function useUser() {
  return useContext(UserContext);
}
