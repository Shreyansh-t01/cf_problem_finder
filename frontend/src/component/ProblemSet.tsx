import React, { useEffect, useState } from 'react'
import { getProblemSet } from '../api'
import { useUsername } from '../UserContext' 
import { useLoading } from '../LoadingContext'

interface problem  {
 problemScore: number,
 problemName: String,
 problemRating:number,
 tags:String[],
 contestId: number,
 index: String
}

const ProblemSet = () => { 
  const [problemSet1, setProblemSet1] = useState<problem[]>()
   const [problemSet2, setProblemSet2] = useState<problem[]>()
    const [problemSet3, setProblemSet3] = useState<problem[]>()
const userContext= useUsername(); 
const {loading,setLoading}  = useLoading();

  async function getData(){
    const userId = userContext.cfUsername
    console.log("userId - ",userId)
    const apiData = await getProblemSet(userId);
    console.log(apiData)
    const combinedList1 = apiData.problemSet1
    const combinedList2 = apiData.problemSet2 
    const combinedList3 = apiData.problemSet3 

    let problemList1:problem[] = [];
    for(const list of combinedList1){
        problemList1 = [...problemList1,...list]
    }
    let problemList2:problem[] = [];
    for(const list of combinedList2){
        problemList2 = [...problemList2,...list]
    }
    let problemList3:problem[] = [];
    for(const list of combinedList3){
        problemList3 = [...problemList3,...list]
    }

    return {
        problemList1,
        problemList2,
        problemList3
    }
    

  }

  async function handleData(){
     setLoading(true)
     const data = await getData();
     setProblemSet1(data.problemList1)
     setProblemSet2(data.problemList2)
     setProblemSet3(data.problemList3)
     setLoading(false)
  }

  useEffect(()=>{
      handleData();
  },[userContext.cfUsername])
    
  if(loading){
    return (
        <div>Loading ...</div>
    )
  }  
  // url https://codeforces.com/problemset/problem/{contextId}/{index}
  return (
    <div className='flex flex-col items-center mt-5'>
      <h2 className='text-4xl font-bold text-black'>Personalized Problem Set</h2>
      {/* <div className="pdfContainer">
        <button className='bg-black text-white rounded-md px-3 py-2'>Get PDF</button>
      </div> */}
      <div className="questionsContainer flex flex-col gap-8 border-2 border-black w-screen h-full justify-center items-center">
            <div className="setContainer w-3/4">
                <h3 className='text-4xl font-bold'>Train Your Brain..</h3>
                 {problemSet1?.map((e:problem,idx)=>{
                     return (
                        <div className='flex text-black bg-white px-4 py-2 gap-10'>
                         <div className="counter">{idx+1}</div>
                         <div className="problemLink">
                         <a href={"https://codeforces.com/problemset/problem/"+`${e.contestId}/${e.index}`} >{e.problemName}</a>
                         </div>
                        </div>
                     )
                 })}
            </div>
            <div className="setContainer w-3/4">
                <h3 className='text-4xl font-bold'>Muscle Up...</h3>
                 {problemSet2?.map((e:problem,idx)=>{
                     return (
                        <div className='flex text-black bg-white px-4 py-2'>
                         <div className="counter">{idx+1}</div>
                         <div className="problemLink">
                         <a href={"https://codeforces.com/problemset/problem/"+`${e.contestId}/${e.index}`} >{e.problemName}</a>
                         </div>
                        </div>
                     )
                 })}
            </div>
            <div className="setContainer w-3/4">
                <h3 className='text-4xl font-bold'>Explore...</h3>
                 {problemSet3?.map((e:problem,idx)=>{
                     return (
                        <div className='flex text-black bg-white px-4 py-2'>
                         <div className="counter">{idx+1}</div>
                         <div className="problemLink">
                         <a href={"https://codeforces.com/problemset/problem/"+`${e.contestId}/${e.index}`} >{e.problemName}</a>
                         </div>
                        </div>
                     )
                 })}
            </div>
      </div>
    </div>
  )
}

export default ProblemSet