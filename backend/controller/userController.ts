import { type Response,type Request } from "express"
import axios, { Axios } from "axios";
import type { db, userCredentials } from "../typesAndInterfaces/type.js";
import {prisma} from '../lib/prisma.js'
import { ai } from "./ai.js";





export const getUser = async (req:Request,res:Response)=>{
  const cfUsername:string = req.body.cfUsername;
  
  if(!cfUsername){
    return res.status(400).send({
        message:"enter a valid codeforces username",
    
    })
  }
   
  let result;
  try{
     result = await axios.get(`https://codeforces.com/api/user.info?handles=${cfUsername}`)
    
  }catch(err){
    console.log("error related to axios req-"+err);
  }
 
 let stat;
 try{
  stat = await axios.get(`https://codeforces.com/api/user.status?handle=${cfUsername}`)
 } catch(err){
  console.log("status request error-"+ err);
 }
 //stat.data.result[i].problem.tag[i]/rating
 //stat.data.result[i].verdict

 
 const userDetails:userCredentials = {
    username:cfUsername,
    rating:result?.data.result[0].rating,
    maxRating:result?.data.result[0].maxRating,
    rank:result?.data.result[0].rank
 }
 let totalProblemSolved:number = 0;
 let wrongAnswers:number = 0;
 let i:number;
 for(i=0;i<stat?.data.result.length;i++){
    if(stat?.data.result[i].verdict=='OK'){
      totalProblemSolved++;
    }
    else{
      wrongAnswers++;
    }
 }
 let acceptanceRate = (totalProblemSolved/wrongAnswers)*100;
 
 userDetails.totalProblemSolved = totalProblemSolved;
 userDetails.wrongAnswers = wrongAnswers;
 userDetails.acceptanceRate = acceptanceRate;


const user = await prisma.users.findUnique({
  where : {
    cfUsername:userDetails.username,
  }
})
if(user){
  const query = await prisma.users.update({
    where:{
      cfUsername:userDetails.username
    },
    data:{
      loginTime:new Date(),
    }
  })
}else{
  const query = await prisma.users.create({
    data:{
      cfUsername:userDetails.username,
      loginTime:new Date(),
    userRating:userDetails.rating,
    problemsSolved:userDetails.totalProblemSolved

    }
  })
}
const mpTaggedQuestions = await getTagCount(cfUsername);
const mpRatingQuestions = await getRatingCount(cfUsername);
let aiQuery;
try{
 aiQuery = await ai.models.generateContent({
  model:"gemini-2.5-flash",
  contents:`I am providing you user rating , rating wise solved problems by the user and tag wise solved problems(one problem can have multiple tags) , acceptance rate of the user , total problem solved by the user till now . You have to analyze the given data and tell the user some actionable insights to improve their rating and become good at competitive programming and also give some tips to the user that can help him reach to his next rating tier. these are some ideas you can refer to to give tips - 

1.  may be user is practicing the questions that are not good for this rating
2.  may be user is not solving questions more than his current rating
3. may be user has not solved good amount of questions yet on platform 
4. may be he is making a lot of small mistaked / minor mistaked in implementation

analyze users data as per your inteligence and give some advice to him to improve and make sure you give only important and crisp information.
userDetails:
1. rating - ${userDetails.rating}
2. rank - ${userDetails.rank}
3. total Problems Solved-${userDetails.totalProblemSolved}
4. acceptance rate - ${userDetails.acceptanceRate}
5. tag wise solved problems- ${mpTaggedQuestions}
6. rating wise solved problem - ${mpRatingQuestions}`
 })
 console.log(aiQuery.text)
}catch(err){
  console.log("gemini request failed - "+err);

}
 return res.status(200).json({
    message:"user entered",
    userDetails:userDetails,
    verdict:true
  })
}


export const getTagCount=async(cfUsername:string):Promise<Map<string, number>>=>{

    let stat;
 try{
  stat = await axios.get(`https://codeforces.com/api/user.status?handle=${cfUsername}`)
 } catch(err){
  console.log("status request error-"+ err);
 }
 
 const tagMp = new Map();

 let i:number;
 for(i=0;i<stat?.data.result.length;i++){
  let arr = stat?.data.result;
  let j:number ;
   for( j=0;j<arr[i].problem.tags.length;j++){
      if(tagMp.has(arr[i].problem.tags[j])){
        tagMp.set(arr[i].problem.tags[j],tagMp.get(arr[i].problem.tags[j])+1);
      }
      else{
        tagMp.set(arr[i].problem.tags[j],1);
      }
   }
 }
return tagMp;

}

export const getRatingCount = async (cfUsername:string)=>{
 

 const ratingMp = new Map();
   let stat;
 try{
  stat = await axios.get(`https://codeforces.com/api/user.status?handle=${cfUsername}`)
 } catch(err){
  console.log("status request error-"+ err);
  return err;
 }

 const arr = stat?.data.result;
 let i:number;
 for(i=0;i<arr.length;i++){
  if(arr[i].verdict=='OK'){
     if(ratingMp.has(arr[i].problem.rating)){
    ratingMp.set(arr[i].problem.rating,ratingMp.get(arr[i].problem.rating)+1);
   }
   else{
    ratingMp.set(arr[i].problem.rating,1);
   }
  }
   
 }
 return ratingMp;


}



