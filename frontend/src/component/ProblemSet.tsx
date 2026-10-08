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
    const apiData = await getProblemSet(userId);
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
  return (
    <div>
      <h2>Personalized Problem Set</h2>
      <div className="pdfContainer">
        <button>Get PDF</button>
      </div>
      <div className="questionsContainer">
            <div className="set1Container">
                <h3>Train Your Brain..</h3>
                 {problemSet1?.map((e:problem,idx)=>{
                     return (
                        <div>
                         <div className="counter">{idx+1}</div>
                         <div className="problemLink">
                         <a href={}></a>
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