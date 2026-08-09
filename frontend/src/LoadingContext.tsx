
import { useContext,createContext,useState,  type ReactNode } from "react";


type LoadingContextType ={
    loading:boolean,
    setLoading(loading:boolean|((prev:boolean)=>boolean)):void
}

export const loadingState = createContext<LoadingContextType|null>(null);


export  function LoadingProvider({children}:{children:ReactNode}){
   const [loading, setLoading] = useState(false);


   return(
    <loadingState.Provider value={{loading,setLoading}}>
          {children}
    </loadingState.Provider>
   )
}


export const useLoading = ()=>{
  const context = useContext(loadingState);
  if(!context){
    throw new Error("useLoading must be used inside loadingProvider");
  }
  const {loading,setLoading} = context

  return {loading,setLoading}

}