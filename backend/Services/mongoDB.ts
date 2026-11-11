import mongoose, { Mongoose } from "mongoose";
import { MONGO_URI } from "../env.js";



// connecting 
export async function connectCache(){
    try{
       
        await mongoose.connect(MONGO_URI?MONGO_URI:"")
        console.log("MONGO-DB connected")
    }catch(err){
        console.log("Error Connecting MongoDB"+err)
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
        problemSet1:[[{problemScore:Number,problemRating:Number,problemName:String,tags:[String],contestId:Number,index:String,doneStatus:{type:Boolean,default:false}}]],
        problemSet2:[[{problemScore:Number,problemRating:Number,problemName:String,tags:[String],contestId:Number,index:String,doneStatus:{type:Boolean,default:false}}]],
        problemSet3:[[{problemScore:Number,problemRating:Number,problemName:String,tags:[String],contestId:Number,index:String,doneStatus:{type:Boolean,default:false}}]]
    },
    expiresAt:{
        type:Date,
        required:true
    }
})
cacheSchema.index({userId:1},
)
cacheSchema.index(
    {expiresAt:1},{
        expireAfterSeconds:0
    }
)

export const cacheModel =  mongoose.model('Cache',cacheSchema);
