import axios from "axios";
export const getUserData = async (cfUsername:string)=>{ 
    let response;
    try{
        console.log(import.meta.env.VITE_API_URL);
        response = await axios.post(`${import.meta.env.VITE_API_URL}/user/enter`,{
       cfUsername:cfUsername
    })
    }catch(err){
        console.log(err);
        alert(`Error occured try again later`);
        throw new Error("API call failure try again later")
    }

    return response?.data.userDetails;
} 

export const getProblemSet = async(userId:string)=>{
   let response;
   try{
     response = await axios.get(`${import.meta.env.VITE_API_URL}/problemset/${userId}`)
   }catch(err){
    console.log("error occured while finding problem set", err)
   }
   console.log(response?.data)
   return response?.data;

 
}

export const updateProblemDoneStatus = async(userId:string, contestId:number, index:string, doneStatus:boolean)=>{
   const response = await axios.patch(`${import.meta.env.VITE_API_URL}/problemset/changeState`,{
      userId,
      contestId,
      index,
      doneStatus
   })
   return response.data;
}
