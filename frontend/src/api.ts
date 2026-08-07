import axios from "axios";
export const getUserData = async (cfUsername:string)=>{ 
    let response;
    try{
        response = await axios.post('http://localhost:3000/user/enter',{
       cfUsername:cfUsername
    })
    }catch(err){
        console.log(err);
        alert(`Error occured try again later`);
        throw new Error("API call failure try again later")
    }

    return response?.data.userDetails;
} 
