import mongoose, { Mongoose } from "mongoose";
import { MONGO_URI } from "../env.js";



// connecting 
export async function connectCache(){
    try{
       
         mongoose.connect(MONGO_URI?MONGO_URI:"")
        console.log("MONGO-DB connected")
    }catch(err){
        console.log("Error Connecting MongoDB")
    }
}

// Schema needed for the catches system 
// 1. userID(indexed)
// 2. analysis : written Text in points (array of strings )
// 3  Mistakes = array 
// 4  Tips to Improve  
// 5 problem set--> array containging two elements 


const cacheSchema = new mongoose.Schema({
    userId:String,
    analysis:[String],
    mistakes:[String],
    tips:[String],
    problemSets:{
        problemSet1:[{name:String,contestID:String,index:Number}],
        problemSet2:[{name:String,contestID:String,index:Number}],
        problemSet3:[{name:String,contestID:String,index:Number}]
    }
})
cacheSchema.index({userID:1})

export const cacheModel =  mongoose.model('Cache',cacheSchema);
