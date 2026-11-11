import mongoose from "mongoose"
import { cacheModel } from "../Services/mongoDB.js"

export const queryCache = async (userID:string)=>{
    const query = await cacheModel.find({
        userId:userID
    });
    

    if(query.length===0){
        return {
            state:false,
            message:"data not found in cache , system will try to call API end points to get data now ..",
            data:[]
        }
    }
   
    return {
        state:true,
        message:"got the data from the cached storage ",
        data:query
    }


}