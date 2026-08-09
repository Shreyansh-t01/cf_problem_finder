import React, { useEffect, useState } from 'react'
import { useUsername } from '../UserContext';
import { getUserData } from '../api';

import { useLoading } from '../LoadingContext';

const MainPage = () => {
  const {cfUsername,setCfUsername} = useUsername()
  const [userDetails, setUserDetails] = useState({
    username:"",
    maxRating:0,
    rating:0,
    totalProblemSolved:0,
    rank:"",
    wrongAnswers:0,
    acceptanceRate:0,
    aiResponse:{
        analysisOfUser:[],
        mistakesUserMade:[],
        adviceUser:[]
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
   
   useEffect(()=>{
    async function dataHandling(){
       setLoading(true);
       await handleData();
       setLoading(false);
    }
    dataHandling();
   },[cfUsername])

   const [username, setUsername] = useState("")

   function submitHandler(){
    if(username==""){
        alert('enter username first');
        return;
    }
    setCfUsername(username)
    return;

   }

   if(loading==true){
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
               <p className='text-3xl font-bold font-mono'>Username:- {userDetails.username}</p>
            </div>
            <div className="dataContainer text-black text-xl font-semibold ">
                <p>Rating:- {userDetails.rating}</p>
                <p>Max Rating :- {userDetails.maxRating}</p>
                <p>Rank:- {userDetails.rank}</p>
                <p>Acceptance Rate :- {userDetails.acceptanceRate}</p>
                <p>Total Problem Solved :- {userDetails.totalProblemSolved}</p>
                <p>Wrong Answers :- {userDetails.wrongAnswers}</p>
            </div>
           
            <div className="ratingwiseSolved flex flex-col gap-3">
                <h3 className='font-bold text-xl'>Rating Wise Solved Problems List:-</h3>
                <table className=' gap-2 w-full'>
                    <thead className='bg-gray-800 text-white px-3 py-4'>
                        <tr className='font-medium text-xl gap-4'>
                        <th className='text-left px-5 py-3'>No.</th>
                        <th className='text-left px-5 py-3'>rating</th>
                        <th className='text-left px-5 py-3'>problems</th>
                    </tr>
                    </thead>
                    <tbody className='bg-gray-700'>
                        {userDetails.arrayRating.map((e:[number,number],idx)=>(
                            <tr className='hover:bg-gray-800 border-b-2 border-gray-500'>
                        <td className='px-5 py-2'>{idx+1}</td>
                        <td className='px-5 py-2' >{e[0]}</td>
                        <td className='px-5 py-2'>{e[1]}</td>
                    </tr>
                        ))}
                    
                    </tbody>
                </table>
            </div>
            <div className="tagWiseSolved flex flex-col gap-3">
                <h3 className='font-bold text-xl'>Tag Wise Problem Solved :-</h3>
                <table className=''>
                      <thead className='bg-gray-800 text-white'>
                        <tr className='font-medium text-xl  '>
                        <th className='text-left px-5 py-3'>No.</th>
                        <th className='text-left  px-5 py-3'>Tag</th>
                        <th className='text-left  px-5 py-3'>Problems Solved having this tag</th>
                    </tr>
                    </thead>
                    <tbody className='bg-gray-700'>
                        {userDetails.arrayTagged.map((e:[string,number],idx)=>(
                            <tr className='hover:bg-gray-800 border-b-2 border-gray-500'>
                        <td className='px-5 py-2 ' >{idx+1}</td>
                        <td className='px-5 py-2' >{e[0]}</td>
                        <td className='px-5 py-2'>{e[1]}</td>
                       </tr>
                        ))}
                    
                    </tbody>
                </table>
            </div>
            <div className="aiResponse">
                <div className="analysis">
                    <h3 className='font-bold text-xl text-black'>Analysis:-</h3>
                   <div className="pointsContainer bg-gray-800 rounded-md px-5 py-3 flex flex-col gap-3">
                     {userDetails.aiResponse? userDetails.aiResponse.analysisOfUser.map((e,idx)=>(
                            <div className="points bg-gray-700 rounded-sm px-2 py-1 flex gap-1" key={idx}>
                            <h4>{idx+1}</h4>
                           <h4>{e}</h4>
                         </div>
                          )):<></>}
                   </div>
                </div>
                <div className="mistakes">
                    <h3 className='font-bold text-xl text-black'>Mistakes:-</h3>
                    <div className="pointsContainer bg-gray-800 rounded-md px-5 py-3 flex flex-col   gap-3">
                          {userDetails.aiResponse? userDetails.aiResponse.mistakesUserMade.map((e,idx)=>(
                            <div className="points bg-gray-700 rounded-sm px-2 py-1 flex gap-1" key={idx}>
                                <h4>{idx+1}</h4>
                           <h4>{e}</h4>
                         </div>
                          )):<></>}
                    </div>
                </div>
                <div className="tipsToImprove">
                    <h3 className='font-bold text-xl text-black' >Tips To Improve:-</h3>
                    <div className="pointsContainer bg-gray-800 rounded-md px-5 py-3  flex flex-col gap-3">
                       {userDetails.aiResponse? userDetails.aiResponse.adviceUser.map((e,idx)=>(
                            <div className="points bg-gray-700 rounded-sm px-2 py-1 flex gap-1" key={idx}>
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