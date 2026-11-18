import { createContext,useContext,useState, type ReactNode } from "react";

type usernameContexttype = {
    cfUsername:string,
    setCfUsername(cfUsername:string):void
}
export const usernameContext = createContext<usernameContexttype|null>(null);

export function UsernameProvider({children}:{
    children:ReactNode
}){
    const [cfUsername, setCfUsername] = useState(()=>localStorage.getItem('username')||"")

   return (
      <usernameContext.Provider value={{cfUsername,setCfUsername}}>
         {children}
      </usernameContext.Provider>
    

   )
}


export const useUsername = ()=>{
    const UsernameContext = useContext(usernameContext);
    if(!UsernameContext){
    throw new Error("useUsername must be used inside UsernameProvider");
  }
    return UsernameContext;
}