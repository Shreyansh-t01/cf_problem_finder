import  { useEffect, useState } from 'react'
import { useUsername } from '../UserContext';
import { getUserData } from '../api';
import {RatingChart} from '../component/RatingChart'

import { useLoading } from '../LoadingContext';
import { TagChart } from './TagChart';
import { sampleUserDetails } from '../sampleData';
interface userDetailsTypes {
    username:string,
    maxRating:number,
    totalProblemSolved:number,
    rating:number,
    rank:string,
    wrongAnswers:number,
    acceptanceRate:number,
    aiResponse:{
        analysisOfUser:string[],
        mistakesUserMade :string[],
        adviceUser:string[]
    },
    arrayRating:[number,number][],
    arrayTagged:[string,number][]



}
const MainPage = () => {
  const {cfUsername,setCfUsername} = useUsername()
  const [userDetails, setUserDetails] = useState<userDetailsTypes>({
    username:"shreyansh",
    maxRating:1900,
    rating:1800,
    totalProblemSolved:400,
    rank:"candidate master",
    wrongAnswers:150,
    acceptanceRate:60,
    aiResponse:{
        analysisOfUser:["try to play","blabla bla bla"],
        mistakesUserMade:["bla bla balasojjbassfaksjdh hdsdf kahsf ahs","kahjsf ashkd asskfh kaklhfs ahkf"],
        adviceUser:["bla bla balasojjbassfaksjdh hdsdf kahsf ahs","kahjsf ashkd asskfh kaklhfs ahkf"]
    },
    arrayRating:[
    
    ],
    arrayTagged:[

    ]
  })
  const{setLoading,loading} = useLoading()
  async function handleData(){

     let apiResponse;
     try{
      apiResponse = await getUserData(cfUsername);
     }catch(err){
        console.log(err);
        throw new Error("api call failed try again later")
        return;
     }
     const mainobj = {
        username:apiResponse.username,
        rating:apiResponse.rating,
        maxRating:apiResponse.maxRating,
        wrongAnswers:apiResponse.wrongAnswers,
        totalProblemSolved:apiResponse.totalProblemSolved,
        aiResponse:apiResponse.aiResponse,
        rank:apiResponse.rank,
        acceptanceRate:apiResponse.acceptanceRate,
        arrayRating:apiResponse.arrayRating,
        arrayTagged:apiResponse.arrayTagged
     }
     setUserDetails(mainobj)
     
     
  }
   
//    useEffect(()=>{
//     async function dataHandling(){
//        setLoading(true);
//        await handleData();
//        setLoading(false);
//     }
//     dataHandling();
//    },[cfUsername])

   const [username, setUsername] = useState("")

   function submitHandler(){
    if(username==""){
        alert('enter username first');
        return;
    }
    setCfUsername(username)
    return;

   }

   if(false){
    return(
        <div className='self-center text-2xl font-semibold'> Loading ...</div>
    )
   }
   else{
    
return (
    <div className="container text-white flex flex-col gap-3 mt-5 justify-center ">
        <div className="serchBar flex gap-2 ">
            <button className='bg-black border-black p-2 text-center rounded-sm' onClick={submitHandler}>Analyse</button>
            <input type="text" className='bg-gray-300 border-amber-50 p-2 rounded-sm text-black' onChange={(e)=>{
                setUsername(e.target.value)
            }} />
        </div>
        <div className="mainData flex flex-col gap-2">
            <div className="mainName text-black">
               <p className='text-3xl font-bold font-mono'>Username:- {sampleUserDetails.username}</p>
            </div>
            <div className="dataContainer text-black text-xl font-semibold ">
              
                <div className="mainBox grid grid-cols-2 gap-3">
                    <div className="ratingBox bg-zinc-200 flex flex-col justify-center items-center shadow-2xl rounded-sm border-gray-500">
                        <div className="headerText flex gap-10"> 
                            <h4>Rating:</h4>
                            <h4>{sampleUserDetails.rating}</h4>
                             </div>
                         <div className="rank">
                            <h1 className='text-4xl font-bold'>{sampleUserDetails.rank}</h1>
                         </div>
                    </div>
                     <div className="ratingBox bg-zinc-200 flex flex-col justify-center items-center shadow-2xl rounded-sm border-gray-500">
                        <h3>Total Problem Solved</h3>
                        <h1 className='text-4xl font-bold'>{sampleUserDetails.totalProblemSolved}</h1>
                    </div>
                     <div className="ratingBox bg-zinc-200 flex flex-col justify-center items-center shadow-2xl rounded-sm border-gray-500">
                       <h3>Acceptance Rate</h3>
                       <h1 className='text-4xl font-bold text-green-700'>{Math.round(sampleUserDetails.acceptanceRate)}%</h1>
                    </div>
                     <div className="ratingBox bg-zinc-200 flex flex-col justify-center items-center shadow-2xl rounded-sm border-gray-500">
                        <h3>Wrong Answer</h3>
                        <h1 className='font-bold text-4xl text-red-600'>{sampleUserDetails.wrongAnswers}</h1>
                    </div>
                </div>
            </div>
           
            <div className="ratingwiseSolved flex gap-8 w-full self-center">
                {/* <h3 className='font-bold text-xl text-black'>Rating Wise Solved Problems List:-</h3>
                <table className=' gap-2 w-full text-black'>
                    <thead className='bg-zinc-200 text-black px-3 py-4'>
                        <tr className='font-medium text-xl gap-4'>
                        <th className='text-left px-5 py-3'>No.</th>
                        <th className='text-left px-5 py-3'>rating</th>
                        <th className='text-left px-5 py-3'>problems</th>
                    </tr>
                    </thead>
                    <tbody className='bg-zinc-200'>
                        {userDetails.arrayRating.map((e:[number,number],idx)=>(
                            <tr className='hover:bg-zinc-200 border-b-2 border-zinc-400'>
                        <td className='px-5 py-2'>{idx+1}</td>
                        <td className='px-5 py-2' >{e[0]}</td>
                        <td className='px-5 py-2'>{e[1]}</td>
                    </tr>
                        ))}
                    
                    </tbody>
                </table> */}
                <RatingChart  rating = {sampleUserDetails.arrayRating} />
                <TagChart tagged={sampleUserDetails.arrayTagged}/>
            </div>
            <div className="tagWiseSolved flex flex-col gap-3 items-center w-[80%] self-center">
                {/* <h3 className='font-bold text-xl text-black'>Tag Wise Problem Solved :-</h3>
                <table className=''>
                      <thead className='bg-zinc-200 text-black'>
                        <tr className='font-medium text-xl  '>
                        <th className='text-left px-5 py-3'>No.</th>
                        <th className='text-left  px-5 py-3'>Tag</th>
                        <th className='text-left  px-5 py-3'>Problems Solved having this tag</th>
                    </tr>
                    </thead>
                    <tbody className='bg-zinc-200'>
                        {userDetails.arrayTagged.map((e:[string,number],idx)=>(
                            <tr className='hover:bg-zinc-200 border-b-2 border-gray-500'>
                        <td className='px-5 py-2 text-black ' >{idx+1}</td>
                        <td className='px-5 py-2 text-black' >{e[0]}</td>
                        <td className='px-5 py-2 text-black'>{e[1]}</td>
                       </tr>
                        ))}
                    
                    </tbody>
                </table> */}
                
                     
            </div>
            <div className="aiResponse flex flex-col gap-5">
                <div className="analysis">
                   
                   <div className="pointsContainer bg-zinc-200 rounded-md px-5 py-3 flex flex-col gap-3 text-black">
                    <h3 className='font-bold text-xl text-black'>Analysis:-</h3>
                     {sampleUserDetails.aiResponse? sampleUserDetails.aiResponse.analysisOfUser.map((e,idx)=>(
                            <div className="points bg-zinc-200 rounded-sm px-2 py-1 flex gap-1" key={idx}>
                            <h4>{idx+1}</h4>
                           <h4>{e}</h4>
                         </div>
                          )):<></>}
                   </div>
                </div>
                <div className="mistakes">
                    
                    <div className="pointsContainer bg-zinc-200 rounded-md px-5 py-3 flex flex-col   gap-3 text-black">
                        <h3 className='font-bold text-xl text-black'>Mistakes:-</h3>
                          {sampleUserDetails.aiResponse? sampleUserDetails.aiResponse.mistakesUserMade.map((e,idx)=>(
                            <div className="points bg-zinc-200 rounded-sm px-2 py-1 flex gap-1" key={idx}>
                                <h4>{idx+1}</h4>
                           <h4>{e}</h4>
                         </div>
                          )):<></>}
                    </div>
                </div>
                <div className="tipsToImprove">
                    
                    <div className="pointsContainer bg-zinc-200 rounded-md px-5 py-3  flex flex-col gap-3">
                         <h3 className='font-bold text-xl text-black' >Tips To Improve:-</h3>
                       {sampleUserDetails.aiResponse? sampleUserDetails.aiResponse.adviceUser.map((e,idx)=>(
                            <div className="points bg-zinc-200 rounded-sm px-2 py-1 flex gap-1 text-black" key={idx}>
                                <h4>{idx+1}</h4>
                           <h4>{e}</h4>
                         </div>
                          )):<></>}
                    </div>
                </div>
            </div>
        </div>
     
                </div>

    
  )
   }
  
}

export default MainPage