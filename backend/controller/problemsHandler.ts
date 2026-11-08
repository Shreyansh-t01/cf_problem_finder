import {type Request,type Response} from 'express';   
import axios from 'axios'
import { TAG_PEAK_RATINGS as tagRating } from '../dataMaps/tagsRating.js';
import { problemSet } from '../dataMaps/problemSet.js';
import { globalScore } from './globalScore.js';
import { string } from 'zod';
import { cacheModel } from '../Services/mongoDB.js';

interface submissionType{

  status: string,
  result: {
      id: Number,
      contestId: Number,
      creationTimeSeconds:Number,
      relativeTimeSeconds:Number,
      problem: {
        contestId: 2244,
        index: string,
        name: string,
        type: string,
        rating: Number,
        tags: string[]
      },
      author: {
        contestId: Number,
        participantId: Number,
        members: {
            handle:string
          }[]
        ,
        participantType: string,
        ghost: boolean,
        startTimeSeconds:Number
      }
}[]
}

interface submissionType{
  verdict:string,
  creationTimeSeconds:number,
  problem:{
    rating?:number;
    tags:string[];
  }
}
interface problemType{
    contestId: string,
    index: string,
    name: string,
    type:string,
    tags:string[],
    rating?:number,
    points?:number,
    solvedCount:number
}
 export interface problemScoreObj{
  problemScore:number,
  problemRating:number,
  problemName:string
  contestId: number,
  index:string,
  tags:string[]
}

function problemFilter(
  targetTag:string,
  minRating:number,
  maxRating:number,
  slotsNeeded:number,
  userWeakTags:Set<string>,
  excludedId:Set<string>,
  userRating:number,
){
  
  const validProblems = problemSet.filter((problem:problemType)=>{
    const problemIdentity = `${problem.contestId}-${problem.index}`
    if(excludedId.has(problemIdentity)){
      return false;
    }
    if(!problem.rating || minRating>problem.rating || maxRating>problem.rating) {
      return false;
    }
    if(!problem.tags.includes(targetTag)){
      return false;
    }

   return true;
  })

  const problemsWithScore = validProblems.map((problem:problemType)=>{ 
    let score = 0;
    if(!problem.rating) return false;
    const ratingDiff = Math.abs(problem.rating-userRating) ; 
     score += Math.max(0,1000-(ratingDiff*5));
     score+=problem.solvedCount/100;
     // we weak tags combine in a perticular problem that is wow moment for us 
     for(const tg of problem.tags){
      if(tg!==targetTag && userWeakTags.has(tg)){
        score+=2000;
      }
     }
     const identity =  `${problem.contestId}-${problem.index}`

     excludedId.add(identity)
     const obj = {
      problemScore:score,
      problemRating:problem.rating,
      problemName:problem.name,
      tags:problem.tags,
      contestId:problem.contestId,
      index:problem.index
     }
     
     return obj;
  })
  
  problemsWithScore.sort((a:problemScoreObj,b:problemScoreObj)=> b.problemScore-a.problemScore)
  
  const reqProblems = problemsWithScore.slice(0,slotsNeeded)
  
  return reqProblems;

}
export const problemSetHandler = async (req:Request ,res:Response)=>{

  const userId= req.params.userId;
   if(typeof userId!== 'string'){
     return res.status(400).send({
        message:"Invalid Username"
      })
   }
  // user submissions 
  let response ;
  // db call first 
  try{
   
     const result = await cacheModel.findOne({userId:userId});
     if(!result){ throw new Error("DB query failed")}

     response ={
      message:"problem set generated",
      problemSet1:result.problemSets?.problemSet1?result.problemSets?.problemSet1:[],
      problemSet2:result.problemSets?.problemSet2?result.problemSets?.problemSet2:[],
      problemSet3:result.problemSets?.problemSet3?result.problemSets?.problemSet3:[]
     }      
  }catch(err){
    try{
      response  = await workHandler(userId)
    }catch(error){
        return res.status(400).send({
          message:"error occured",
          status:false
        })
    }
  }

  res.status(200).send(response);
  
}

export const workHandler = async (userId:string)=>{
   let stat;
  try{
    stat = await axios.get(`https://codeforces.com/api/user.status?handle=${userId}`)
    console.log("user stats received")
  }catch(err){
    throw new Error("CF api failure")
  }

  // segregating the entire submissions into accepted and attempted category
  const arr = stat?.data.result;
  console.log("arr formed in between")
  let cfSubmissions = [];
  const excludedId  = new Set<string>();  // storing questions id which are already solved or excluded 
  for(const ele of arr){
    const obj = {
      verdict:ele.verdict,
      creationTimeSeconds:ele.creationTimeSeconds,
      problem:{
        rating: (ele.problem.rating? ele.problem.rating:-1),
        tags:ele.problem.tags
      }
    }
    if(ele.verdict==='OK' || !ele.problem.rating){
      excludedId.add(`${ele.problem.contestId}-${ele.problem.index}`)
    }
  
      cfSubmissions.push(obj);
  } 
  // this is holding the questions solved successfully by the user 
  const accSubmissions = cfSubmissions.filter((e)=> e.verdict=='OK' && e.problem.rating!=="")
  // getting user information
  let userInfo;
  try{
    userInfo = await axios.get(`https://codeforces.com/api/user.info?handles=${userId}`)
    
  }catch(err){
    throw new Error("user information not found")
  }
  
  // getting user rating 
  let Ru = userInfo?.data.result[0].rating

  // now calculating expectation values using gaussian central theorem
  // e = exp(1/2*(Ru - Rt)/sigma)  for each tag we will have to calculate this thing  
  
 let valueMap = [];
  let zeroPracticed = [];
  for(const obj of tagRating){
    // calculating expectation value 
     const Rt = obj.rating;
     const delta = Ru-Rt;  // delta can be negative also 
     let sigma = 100;
     if(Ru>=Rt) sigma = 450;
     const val = (delta/sigma);
     
     const expectation = Math.exp(-(1/2)*(val*val));
      // expectation score 
       
     const tag = obj.tag;  //problem tag 
    let proficiencyScore = 0; 
     for(const ac of accSubmissions){
       for(const tg of ac.problem.tags){
        if(tg===tag){
          // score calculation 
          // finalScore = finalscore+ ()
          const currentTime = Math.round(Date.now()/1000);
          const secondsAgo  = currentTime - ac.creationTimeSeconds; 
          const daysAgo = secondsAgo/86400 ; 
          const DECAY_CONSTANT = 0.0077; 
          const recencyWeight = Math.exp(-DECAY_CONSTANT*daysAgo);
        const ratingDelta = ac.problem.rating - Ru; 
          // tag ka rating difference from the user rating 
          const diffWeight = Math.max(0.1,1+(ratingDelta/400));  // user rating se kitna close rating ka tag hai uska score 
         
          const problemScore = recencyWeight*diffWeight ;  
         

          proficiencyScore+=problemScore;
        }
       }
     }
     if(proficiencyScore===0){  // if proff score is zero means this perticular tag is never practiced by the user we here we need to take case of the fact that the tag we are examining is relevant to the user or not 
     zeroPracticed.push({
      expectationScore: expectation,
      tag:tag
     })
     }
    
    const globalImportance = globalScore(Ru,tag) // get it from the global tag mapping point table  
    // calculating wt score for each tag and storing in proficiency map 
     const tagValue = (expectation*(globalImportance))/(0.1 + proficiencyScore); // don't you think zero practiced tag are examined here only 
    valueMap.push({
      tag:tag,
      tagValue:tagValue
    })
  }
    const rem = Ru%100;
    Ru = Ru-rem;
   const topRange = [Ru,Ru+100];
   const midRange = [Ru+100,Ru+200];
   const lastRange = [Ru-100,Ru];
  // now we need to sort this value map and get most important tags for the user
 

  valueMap.sort((a,b)=> b.tagValue-a.tagValue)
   // this allocation array now holds top 4 tags and their slots out of 18
  const topTags = valueMap.slice(0,4);
  const totalSlots = 18;  // this is slot one for higher rating problems to strengthen user rating 
   // adding up the tags value 
   let totalWeight = 0;
   for(const tg of topTags){
    totalWeight+=tg.tagValue
   }

  let allocated = 0;
    const weakAllocations  = topTags.map((e,i)=>{     
     if(i===topTags.length-1){
      return { tag:e.tag , slots: totalSlots-allocated };
     }
    
     const slots = Math.round(totalSlots*(e.tagValue/totalWeight));
     console.log(slots)
     allocated+=slots;
     return {tag:e.tag,slots:slots}
  })  


   const problemSet1 = weakAllocations.map((e)=>{
    console.log(e);
    const targetTag = e.tag;
    const minRating  = topRange[0];
    const maxRating = topRange[1];
    const slotNeeded = e.slots;
   const userWeakTags = new Set(weakAllocations.map(({tag,slots})=> tag))
   const arr = problemFilter(targetTag,minRating,maxRating,slotNeeded,userWeakTags,excludedId,Ru) 
   return arr;
  })

  // allocating secondslot 
  const midTags = valueMap.slice(4,7);
  const slotsTotal = 9;
  const totalWeight2 = midTags.reduce((sum,item)=> sum+item.tagValue,0);
  let allocatedSlots = 0;


  const midAllocations = midTags.map((e,i)=>{
    if(i===midTags.length-1){
      return {tag:e.tag , slots:slotsTotal-allocatedSlots}
    }

    const slots = Math.round(slotsTotal*(e.tagValue/totalWeight2)) 
    allocatedSlots+=slots;

    return {tag:e.tag,slots: slots}
  })
  const problemSet2 = midAllocations.map((e)=>{
     const targetTag = e.tag;
    const minRating  = midRange[0];
    const maxRating = midRange[1];
    const slotNeeded = e.slots;
   const userWeakTags = new Set(midAllocations.map(({tag,slots})=> tag))

   const arr = problemFilter(targetTag,minRating,maxRating,slotNeeded,userWeakTags,excludedId,Ru)

   return arr;
  })
  // slot third for the tags which user never practiced previously 
  zeroPracticed.sort((a,b)=> b.expectationScore-a.expectationScore);
  // identify top 1 not practiced tag 
  const lastTags = zeroPracticed.slice(0,1);
  
  const lastAllocations = lastTags.map((e,i)=>{
    return {tag:e.tag,slots:3}
  })
   const problemSet3 = lastAllocations.map((e)=>{
     const targetTag = e.tag;
     const minRating = lastRange[0];
     const maxRating = lastRange[1];
     const slotsNeeded = 3;
     const userWeakTags = new Set(lastAllocations.map(({tag,slots})=>tag))
     const arr = problemFilter(targetTag,minRating,maxRating,slotsNeeded,userWeakTags,excludedId,Ru);

     return arr;
   })
  
    console.log("first array ka first element ->"+problemSet1[0][0].problemName+" contest id ->"+problemSet1[0][0].contestId)

  const reply = {
    message:"problem set generated",
    problemSet1:problemSet1,
    problemSet2:problemSet2,
    problemSet3:problemSet3
   }

   return reply;
 }


 


  

  



 

 

  


