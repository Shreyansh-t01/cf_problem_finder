import { type Response,type Request, application } from "express"
import axios, { Axios } from "axios";
import type { db, userCredentials } from "../typesAndInterfaces/type.js";
import {prisma} from '../lib/prisma.js'
import { ai } from "./ai.js";
import {z}  from 'zod'
import { aiResponse } from "./aiQuery.js";
import { queryCache } from "./CacheDataController.js";
import { problemSetHandler, workHandler } from "./problemsHandler.js";
import { cacheModel } from "../Services/mongoDB.js";


interface problemType{
   problemScore:number,
      problemRating:number,
      problemName:string,
      tags:string[],
      contestId:number,
      index:number
}

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
 let acceptanceRate = (totalProblemSolved/(wrongAnswers+totalProblemSolved))*100;
 
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
const taggedQuestionobj =   Object.fromEntries(mpTaggedQuestions)
const ratingQuestionObj = Object.fromEntries(mpRatingQuestions)
let arrayRating:[number,number][] = [];
let arrayTagged:[string,number][]= [];
mpTaggedQuestions.forEach((value,key)=>{
   arrayTagged = [...arrayTagged,[key,value]];
})
mpRatingQuestions.forEach((value,key)=>{
  arrayRating = [...arrayRating,[key,value]]
})
userDetails.arrayRating = arrayRating;
userDetails.arrayTagged = arrayTagged;
const prompt = `I am providing you user rating , rating wise solved problems by the user and tag wise solved problems(one problem can have multiple tags) , acceptance rate of the user , total problem solved by the user till now . You have to analyze the given data and tell the user some actionable insights to improve their rating and become good at competitive programming and also give some tips to the user that can help him reach to his next rating tier. these are some ideas you can refer to to give tips - 

1.  may be user is practicing the questions that are not good for this rating
2.  may be user is not solving questions more than his current rating
3. may be user has not solved good amount of questions yet on platform 
4. may be he is making a lot of small mistaked / minor mistaked in implementation

analyze users data as per your inteligence and give some advice to him to improve and make sure you give only important and crisp information.
user details are given blow:-
userDetails:${JSON.stringify({
  rating:userDetails.rating,
  problemSolved:userDetails.totalProblemSolved,
  acceptanceRate:userDetails.acceptanceRate,
  maxRating:userDetails.maxRating,
  tagWisePracticedProblems:taggedQuestionobj,
  ratingWisePracticedProblems:ratingQuestionObj

})} and these are the user's submission detail for you to understand his submission pattern and heat map - ${stat}
the response should be in the format given to you
{analysisOfUser:["first line","second line" ...],
 mistakesUserMade:["first line","second line"...],
 adviceUser:["first line","second line"..]
}
dont add on heading in data present inside any of the three fields . Make sure you don't give general advices or general stuff only give relevant short important stuff to the user as response . make sure before saying anything you say should be proven by the data and submission history of the user you can give reference of what you analyzed and came to conclusion. suggestions should not be generic one they should very user specific.
`
const analysisSchema = z.string().describe(`analysis and insights related to user profile`);
const mistakesSchema = z.string().describe(`mistake made by user in doing competitve programming`);
const adviceSchema = z.string().describe(`advice to user that will help him improve his competitve programming tier or performance`);
const responseSchema = z.object({
  analysisOfUser:z.array(analysisSchema).describe(`what are the insights you got by analyzing the given user details`),
  mistakesUserMade:z.array(mistakesSchema).describe(`mistakes that are made by user till now in practising competitive programming through his given data`),
  adviceUser:z.array(adviceSchema).describe(`help user reach their next rating tier or improve in competitve programming by giving him some personalized actionable tips based on his current userDetails.`)

})
const jsonFormatOfSchema = z.toJSONSchema(responseSchema,{
  target:"draft-07"
})

let responseCached = await queryCache(userDetails.username)
console.log("cached data is comming "+responseCached.data[0] )
if((responseCached.state===false) || (responseCached.data.length<=0)){
  // means we need to run now the LLM call 
 const aiQuery = await aiResponse(prompt,jsonFormatOfSchema);
if (!aiQuery?.text) {
  throw new Error("Model did not return any text");
}
else{
const texti = aiQuery.text?aiQuery.text:"";
const answer = JSON.parse(texti);
// at this time I am thinking to cache problems also along side with the ai response because user will definetely visit the problem set page we can show him cached set  
// let problemSet;
// try{
//   //  problemSet = await workHandler(userDetails.username)
// }catch(err){
//   console.log(err,"could not cache problem statements ");
// }
// userDetails.aiResponse = answer;

// const questionsArr1 = problemSet?.problemSet1?problemSet.problemSet1.map((e:problemType)=>{
//  return {name:e.problemName,contestID:e.contestId,index:e.index};
// }):[];
// const questionsArr2 = problemSet?.problemSet2?problemSet.problemSet2.map((e:problemType)=>{
//  return {name:e.problemName,contestID:e.contestId,index:e.index};
// }):[];
// const questionsArr3 = problemSet?.problemSet3?problemSet.problemSet3.map((e:problemType)=>{
//  return {name:e.problemName,contestID:e.contestId,index:e.index};
// }):[];
const query = await cacheModel.create({
   userId:userDetails.username,
   analysis:answer.analysisOfUser,
   mistakes:answer.mistakesUserMade,
   tips:answer.adviceUser,
   problemSets:{
    // problemSet1:[...questionsArr1],
    // problemSet2:[...questionsArr2],
    // problemSet3:[...questionsArr3]
   }
})
}

}
else {
  const answer = {
     analysisOfUser:responseCached.data[0]?.analysis?responseCached.data[0]?.analysis:[""],
     mistakesUserMade:responseCached.data[0]?.mistakes?responseCached.data[0]?.mistakes:[""],
     adviceUser:responseCached.data[0]?.tips?responseCached.data[0]?.tips:[""]
  }
  userDetails.aiResponse = answer;
}



  console.log(userDetails)
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
  if(arr[i].verdict=='OK'){
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
  return new Map();
  
 }

 const arr = stat?.data.result;
 let i:number;
 for(i=0;i<arr.length;i++){
  if(arr[i].verdict=='OK'){
    if(arr[i].problem.rating==='undefined'){
      continue;
    }
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



