import React, { createContext, useContext, useEffect, useState } from 'react'

const UserContext = createContext();

export const UserProvider = ({children})=>{
    const [apiUrl, setApiUrl] = useState('');
    const [review, setReview] = useState(false);
    const [user, setUser] = useState(()=>{
      return localStorage.getItem("user") || "";
    });
    

    useEffect(() => {
      if (user) {
        localStorage.setItem("user", user);
      } else {
        localStorage.removeItem("user");
      }
    }, [user]);

    return (
        <UserContext.Provider value={{apiUrl, setApiUrl, user, setUser, review, setReview}}>
          {children}
        </UserContext.Provider>
      )
}

export function useUser() {
  return useContext(UserContext);
}
