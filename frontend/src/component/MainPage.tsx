import  { useEffect, useState, } from 'react'
import { useUsername } from '../UserContext';
import { getUserData } from '../api';
import {RatingChart} from '../component/RatingChart'

import { useLoading } from '../LoadingContext';
import { TagChart } from './TagChart';

import {useNavigate} from 'react-router-dom'
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
    const navigate = useNavigate();
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
   
   useEffect(()=>{
    async function dataHandling(){
       setLoading(true);
       await handleData();
       setLoading(false);
    }
    dataHandling();
   },[cfUsername])

//    const [username, setUsername] = useState("")

//    function submitHandler(){
//     if(username==""){
//         alert('enter username first');
//         return;
//     }
//     setCfUsername(username)
//     return;

//    }
   function navigationHandler(){
     // this function navigates the user to the problem set page  
     navigate('/problem')
     
   }

   if(loading){
    return(
        <div className='self-center text-2xl font-semibold'> Loading ...</div>
    )
   }
   else{
    
return (
    <div className="container text-white flex flex-col gap-3 mt-5 justify-center lg:w-[80%] border border-solid border-white p-3 mb-10 bg-gray-100 w-full font-[verdana]"> 
        <div className="serchBar flex gap-2 ">
            <button className='bg-black border-black px-2 py-1 lg:text-xl text-center rounded-sm' onClick={navigationHandler}>Get Problem Set</button>
            
        </div>
        <div className="mainData flex flex-col lg:gap-2 mb-15">
          <div className="mainContainer flex justify-between px-3">
                  <div className="mainName text-black flex flex-col">
               <p className='lg:text-xl text-lg font-semibold text-zinc-700 '>Username:-</p>
               <p className='lg:text-3xl  text-lg font-semibold '>{userDetails.username}</p>
            </div>
            
          </div>
            <div className="dataContainer text-black lg:text-xl font-semibold ">
                <div className="mainBox grid lg:grid-cols-2 gap-3">
                    <div className="ratingBox bg-zinc-200 flex flex-col justify-center items-center  rounded-sm ">   
                        <div className="headerText flex gap-3 text-zinc-700"> 
                            <h4 className=''>Rating -</h4>
                            <h4>{userDetails.rating}</h4>
                             </div>
                         <div className="rank">
                            <h1 className='lg:text-4xl text-2xl font-semibold'>{userDetails.rank}</h1>
                         </div>
                    </div>
                     <div className="ratingBox bg-zinc-200 flex flex-col justify-center items-center  rounded-sm border-gray-500 text-zinc-700">
                        <h3>Total Problem Solved</h3>
                        <h1 className='lg:text-4xl text-2xl font-bold text-black'>{userDetails.totalProblemSolved}</h1>
                    </div>
                     <div className="ratingBox bg-zinc-200 flex flex-col justify-center items-center  rounded-sm border-gray-500">
                       <h3 className='text-zinc-700'>Acceptance Rate</h3>
                       <h1 className='lg:text-4xl text-2xl font-bold text-green-700'>{Math.round(userDetails.acceptanceRate)}%</h1>
                    </div>
                     <div className="ratingBox bg-zinc-200 flex flex-col justify-center items-center  rounded-sm border-gray-500">
                        <h3 className='text-zinc-700'>Wrong Answer</h3>
                        <h1 className='font-boldlg:text-4xl text-2xl text-red-600'>{userDetails.wrongAnswers}</h1>
                    </div>
                </div>
            </div>
           
            <div className="ratingwiseSolved flex lg:flex-row flex-col lg:gap-8 w-full self-center">
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
                <TagChart tagged={userDetails.arrayTagged}/>
                <RatingChart  rating = {userDetails.arrayRating} />
                
            </div>
         
            <div className="aiResponse flex flex-col gap-5">
                <div className="analysis">
                   
                   <div className="pointsContainer bg-zinc-200 rounded-md lg:px-5 lg:py-3 px-3 py-1 flex flex-col lg:gap-5 gap-2 ">
                    <h3 className='font-bold text-xl text-black border-b border-b-black'>Analysis:-</h3>
                     <div className="pointsContainer">
                        {userDetails.aiResponse? userDetails.aiResponse.analysisOfUser.map((e,idx)=>(
                            <div className="points font-semibold rounded-sm px-2 py-1 flex lg:gap-5 gap-2 text-zinc-800" key={idx}>
                            <h4>{idx+1}.</h4>
                           <h4>{e}</h4>
                         </div>
                          )):<></>}
                     </div>
                   </div>
                </div>
                <div className="mistakes">
                    
                    <div className="pointsContainer bg-zinc-200 rounded-md lg:px-5 lg:py-3 px-3 py-1 flex flex-col lg:gap-5 gap-2 ">
                        <h3 className='font-bold text-xl text-black border-b border-b-black'>Mistakes:-</h3>
                          <div className="pointsContainer">
                            {userDetails.aiResponse? userDetails.aiResponse.mistakesUserMade.map((e,idx)=>(
                            <div className="points font-semibold rounded-sm px-2 py-1 flex lg:gap-5 gap-2 text-zinc-800" key={idx}>
                                <h4>{idx+1}.</h4>
                           <h4>{e}</h4>
                         </div>
                          )):<></>}
                          </div>
                    </div>
                </div>
                <div className="tipsToImprove">
                    
                    <div className="pointsContainer bg-zinc-200 rounded-md lg:px-5 lg:py-3 px-3 py-1 flex flex-col lg:gap-5 gap-2 text-black">
                         <h3 className='font-bold text-xl text-black border-b border-b-black' >Tips To Improve:-</h3>
                      <div className="pointsContainer flex flex-col">
                         {userDetails.aiResponse? userDetails.aiResponse.adviceUser.map((e,idx)=>(
                            <div className="points  rounded-sm px-2  flex  text-zinc-800 font-semibold lg:gap-5 gap-2" key={idx}>
                                <h4>{idx+1}.</h4>
                           <h4>{e}</h4>
                         </div>
                          )):<></>}
                      </div>
                    </div>
                </div>
            </div>
        </div>
     
                </div>

    
  )
   }
  
}

export default MainPage