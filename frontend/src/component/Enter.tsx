

import { useLoading } from '../LoadingContext';
import { useNavigate } from 'react-router-dom';
import { useUsername } from '../UserContext';

const Enter = () => {
   const {cfUsername,setCfUsername} = useUsername()
   const {setLoading} = useLoading();
   const navigate = useNavigate();
   async function submitHandler():Promise<void>{
        if(cfUsername==""){
         alert("please enter codeforces username first")
         return;
        }
        localStorage.setItem('username',cfUsername);
        setLoading(true);
        navigate('/main')
   }
  return (
    <div className=' flex flex-col gap-2 w-screen h-120 justify-center items-center'>
        <div className="card bg-white p-8 shadow rounded-sm flex  flex-col gap-2 items-center">
         <h1 className='lg:text-3xl text-2xl font-bold lg:mb-6 mb-2 font-[Arial]'>CF<span className='bg-linear-to-r from-[#5145F5] to-[#8B35E9] bg-clip-text text-transparent'>Helper</span></h1>
         <div className="textContainer text-sm  text-gray-400">
           <h3>Enter Your Codeforces Username Here </h3>

        </div>
        <div className="inputcard flex flex-col"> 
         <input type="text" className=' bg-white p-1.5 border border-gray-700 rounded-sm' onChange={(e)=> setCfUsername(e.target.value)} value={cfUsername}/>
        <button className='enterButton  border border-black py-2 px-2 rounded-xl mt-4  text-white bg-black' onClick={submitHandler}>Enter</button>
        </div>
        </div>
     </div>
  )
}

export default Enter
