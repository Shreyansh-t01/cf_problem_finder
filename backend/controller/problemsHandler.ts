import {type Request,type Response} from 'express';   
import axios from 'axios'
import { TAG_PEAK_RATINGS as tagRating } from '../dataMaps/tagsRating.js';
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
export const problemSetHandler = async (req:Request ,res:Response)=>{
  const userId = req.params.userId;
  let stat;
  try{
    stat = await axios.get(`https://codeforces.com/api/user.status?handle=${userId}`)
    
  }catch(err){
    console.log('codeforces api is not responding')
  }
  // segregating the entire submissions into accepted and attempted category
  const arr = stat?.data.result;
  let cfSubmissions = [];
  for(const ele of arr){
    const obj = {
      verdict:ele.verdict,
      creationTimeSeconds:ele.creationTimeSeconds,
      problem:{
        rating: (ele.problem.rating? ele.problem.rating:-1),
        tags:ele.problem.tags
      }
    }

    cfSubmissions.push(obj);
  } 
  const accSubmissions = cfSubmissions.filter((e)=> e.verdict=='OK')
  
  let problemSet;
  try{
    problemSet = await axios.get(`https://codeforces.com/api/problemset.problems`)
  }catch(err){
    console.log("could not gather relavant problem set information from codeforces")
  }
  
  // getting user rating
  let userInfo;

  try{
    userInfo = await axios.get(`https://codeforces.com/api/user.info?handles=${userId}`)
  }catch(err){
    console.log("Error Message :- ",err);
  }

  const Ru = userInfo?.data.result.rating

  // now calculating expectation values using gaussian central theorem
  // e = exp(1/2*(Ru - Rt)/sigma)  for each tag we will have to calculate this thing 
  let tagE = [];

  for(const obj of tagRating){
    // calculating expectation value 
     const Rt = obj.rating;
     const delta = Ru-Rt;
     let sigma = 200;
     if(Ru>=Rt) sigma = 450;
     const val = delta/sigma;
     const expectation = Math.exp((1/2)*(val*val));


     // calculating s(t)
     const tag = obj.tag;
     for(const ele of accSubmissions){
      
     
    
    }
  }}
   
  

  

  



 

 

  


