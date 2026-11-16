

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
        setLoading(true);
        navigate('/main')
   }
  return (
    <div className=' flex flex-col gap-2 w-screen h-80  justify-center items-center'>
        <div className="textContainer lg:text-xl text-sm">
           <h3>Enter Your Codeforces Username Here </h3>

        </div>
        <input type="text" className=' bg-white p-1.5 border border-gray-700 rounded-sm' onChange={(e)=> setCfUsername(e.target.value)} value={cfUsername}/>
        <button className='enterButton  border border-black py-2 px-2 rounded-xl mt-4  text-white bg-black' onClick={submitHandler}>Enter</button>
     </div>
  )
}

export default Enter
