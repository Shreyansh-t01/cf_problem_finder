import React, { useEffect, useState } from 'react'
import { getProblemSet } from '../api'
import { useUsername } from '../UserContext' 
import { useLoading } from '../LoadingContext'
import { useNavigate } from 'react-router-dom'
import jsPDF from 'jspdf'
import {autoTable} from 'jspdf-autotable'

interface problem  {
 problemScore: number,
 problemName: string,
 problemRating:number,
 tags:String[],
 contestId: number,
 index: String
}


const ProblemSet = () => { 
  const navigate = useNavigate();
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
  function navigationHandler(){
      navigate('/main')
  }

 async function generatePDF(){
   
 
  const doc = new jsPDF();
  doc.setFillColor(23, 37, 84);
doc.rect(0, 0, 210, 20, "F");


  doc.setFont("helvetica", "bold");
doc.setFontSize(22);
doc.setTextColor(255, 255, 255);
doc.text(
    "PERSONALIZED PROBLEM SET",
    doc.internal.pageSize.getWidth() / 2,
    17,
    { align: "center" }
);


doc.setTextColor(23, 37, 84);
doc.setFont("helvetica", "bold");
doc.setFontSize(14);

doc.text("Train Your Brain..", 14, 28);
  

  // Add structured table using autotable plugin 

  // "https://codeforces.com/problemset/problem/"+`${e.contestId}/${e.index}` 
  // problem set1 

   const arr1:[number,string,string][]= problemSet1?problemSet1?.map((e:problem,idx:number)=>{
    const url:string = `https://codeforces.com/problemset/problem/${e.contestId}/${e.index}`
    const problem:string = e.problemName
         return ([idx+1,problem,url]);
   }):[];

   
  autoTable(doc,{
    startY: 31,
    head: [['ID', 'Name','question URL']],
    body: [
     ...arr1
    ],
  });
  //@ts-ignore
   let table = doc.lastAutoTable;
   let finalY = table.finalY;

   
   // height should bee dynamic 
   doc.text('Muscle Up..', 14, finalY+10);

  // Add structured table using autotable plugin
   const arr2:[number,string,string][]= problemSet2?problemSet2?.map((e:problem,idx:number)=>{
    const url:string = `https://codeforces.com/problemset/problem/${e.contestId}/${e.index}`
    const problem:string = e.problemName
         return ([idx+1,problem,url]);
   }):[];
  autoTable(doc,{
    startY: finalY+14,
    head: [['ID', 'Name','question URL']],
    body: [
    ...arr2
    ],
  });

  doc.addPage();
   //@ts-ignore
    table = doc.lastAutoTable;
    finalY = table.finalY;
   doc.text('Explore..', 14, 14)

  // Add structured table using autotable plugin
  const arr3:[number,string,string][]= problemSet3?problemSet3?.map((e:problem,idx:number)=>{
    const url:string = `https://codeforces.com/problemset/problem/${e.contestId}/${e.index}`
    const problem:string = e.problemName
         return ([idx+1,problem,url]);
   }):[];
  
  autoTable(doc,{
    startY: 18,
    head: [['ID', 'Name','question URL']],
    body: [
      ...arr3
    ],
  });
  // Save the file
  doc.save('PersonalizedPracticeSheet.pdf');

  }
  // url https://codeforces.com/problemset/problem/{contextId}/{index}
  return (
    <div className='flex flex-col mt-5 items-center bg-zinc-200 '>
     
        
          
            
         <div className="conti lg:w-[80%] w-full flex items-center flex-col">
           <div className='self-start md:px-5 px-1 flex  justify-between w-full pt-2'>
            <button className='button bg-black border-black px-2 py-1 lg:text-xl text-center rounded-sm text-white ' onClick={navigationHandler}>GetBack</button>
            <div className='self-start md:px-5 px-1'>
            <button className='button bg-amber-600 border-black px-2 py-1 lg:text-xl text-center rounded-sm text-white ' onClick={generatePDF}>GetPDF</button>
          </div>
          </div>
          
         
          <h2 className='lg:text-4xl text-xl font-bold text-black '>Personalized Problem Set</h2>
         </div>
         
      
         
        
      
        

      <div className="questionsContainer flex flex-col lg:gap-8 gap-4 border-2 border-black w-screen h-full justify-center items-center">
            <div className="setContainer  sm:w-[80%] w-full  rounded-sm lg:px-8 lg:py-4 px-3 py-3">
                <h3 className='lg:text-4xl text-2xl font-bold'>Train Your Brain..</h3>
                 {problemSet1?.map((e:problem,idx)=>{
                     return (
                        <div className='flex text-black bg-white lg:px-3 lg:py-2 lg:gap-8 px-2 py-1 gap-4 text-sm sm:text-lg font-semibold'>
                         <div className="counter">{idx+1}.</div>
                         <div className="problemLink">
                         <a href={"https://codeforces.com/problemset/problem/"+`${e.contestId}/${e.index}`} >{e.problemName}</a>
                         </div>
                        </div>
                     )
                 })}
            </div>
            <div className="setContainer  sm:w-[80%] w-full  rounded-sm lg:px-8 lg:py-4 px-3 py-3">
                <h3 className='lg:text-4xl text-2xl font-bold'>Muscle Up...</h3>
                 {problemSet2?.map((e:problem,idx)=>{
                     return (
                        <div className='flex text-black bg-white lg:px-3 lg:py-2 lg:gap-8 px-2 py-1 gap-4 text-sm sm:text-lg font-semibold'>
                         <div className="counter">{idx+1}</div>
                         <div className="problemLink">
                         <a href={"https://codeforces.com/problemset/problem/"+`${e.contestId}/${e.index}`} >{e.problemName}</a>
                         </div>
                        </div>
                     )
                 })}
            </div>
            <div className="setContainer  sm:w-[80%] w-full  rounded-sm lg:px-8 lg:py-4 px-3 py-3">
                <h3 className='lg:text-4xl text-2xl font-bold'>Explore...</h3>
                 {problemSet3?.map((e:problem,idx)=>{
                     return (
                        <div className='flex text-black bg-white lg:px-3 lg:py-2 lg:gap-8 px-2 py-1 gap-4 text-sm sm:text-lg font-semibold'>
                         <div className="counter">{idx+1}</div>
                         <div className="problemLink">
                         <a href={"https://codeforces.com/problemset/problem/"+`${e.contestId}/${e.index}`} >{e.problemName}</a>
                         </div>
                        </div>
                     )
                 })}
            </div>
      </div>
      <div className='text-xl font-semibold text-gray-800 py-10 lg:px-10 px-2 w-full text-center font-mono'>
      Disclaimer:- This problem set is generated on the basis of your Rating, previsouly Practiced question's rating and tags and what expert advices at you rating range to help you reach your next rating tier .. Thank you
    </div>
    </div>
  )
}

export default ProblemSet