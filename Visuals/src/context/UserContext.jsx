import React, { createContext, useContext, useState } from 'react'

const UserContext = createContext();

export const UserProvider = ({children})=>{
    const [apiUrl, setApiUrl] = useState('');
    const [review, setReview] = useState(false);
    const [user, setUser] = useState('');

    return (
        <UserContext.Provider value={{apiUrl, setApiUrl, user, setUser, review, setReview}}>
          {children}
        </UserContext.Provider>
      )
}

export function useUser() {
  return useContext(UserContext);
}
