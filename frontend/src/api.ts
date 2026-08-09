import axios from "axios";
export const getUserData = async (cfUsername:string)=>{ 
    let response;
    try{
        console.log(import.meta.env.VITE_API_URL);
        response = await axios.post(`${import.meta.env.VITE_API_URL}`,{
       cfUsername:cfUsername
    })
    }catch(err){
        console.log(err);
        alert(`Error occured try again later`);
        throw new Error("API call failure try again later")
    }

    return response?.data.userDetails;
} 
