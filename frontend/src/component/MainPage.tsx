import React, { useEffect } from 'react'

const MainPage = () => {
  async function handleData(){
    
  }
   useEffect(()=>{
    handleData();
   },[])
  return (
    <div className="container flex flex-col text-white mt-5 gap-4">
        <div className="serchBar flex gap-2">
            <button className='bg-black border-black p-2 text-center rounded-sm'>Analyse</button>
            <input type="text" className='bg-gray-800 border-amber-50 p-2 rounded-sm' />
        </div>
        <div className="mainData flex flex-col gap-2">
            <div className="mainName flex gap-2">
                <h2 className='text-3xl font-bold inline'>Username:-</h2>
             <h2 className='text-2xl font-bold self-center'>shreyanshthakur2007</h2>
            </div>
            <div className="problemSolved flex font-medium">
                <h4>Problems Solved:-</h4>
                <h4>61</h4>
            </div>
            <div className="rating flex font-medium">
                <h4>rating:-</h4>
                <h4>1200</h4>
            </div>
            <div className="maxRating flex font-medium">
                <h4>maxrating:-</h4>
                <h4>1400</h4>
            </div>
            <div className="acceptanceRate flex font-medium">
                <h4>acceptance rating:-</h4>
                <h4>30%</h4>
            </div>
            <div className="ratingwiseSolved flex flex-col gap-3">
                <h3 className='font-bold text-xl'>Rating Wise Solved Problems List:-</h3>
                <table className=' gap-2 w-full'>
                    <thead className='bg-gray-900 text-white px-3 py-4'>
                        <tr className='font-medium text-xl gap-4'>
                        <th className='text-left'>No.</th>
                        <th className='text-left'>rating</th>
                        <th className='text-left'>problems</th>
                    </tr>
                    </thead>
                    <tbody className='bg-gray-600'>
                        <tr className='hover:bg-gray-800'>
                        <td >1</td>
                        <td >1000</td>
                        <td >30</td>
                    </tr>
                    <tr className='hover:bg-gray-800'>
                        <td>2</td>
                        <td>1200</td>
                        <td>12</td>
                    </tr>
                    </tbody>
                </table>
            </div>
            <div className="tagWiseSolved flex flex-col gap-3">
                <h3 className='font-bold text-xl'>Tag Wise Problem Solved :-</h3>
                <table>
                      <thead className='bg-gray-900 text-white px-3 py-4'>
                        <tr className='font-medium text-xl gap-4'>
                        <th className='text-left'>No.</th>
                        <th className='text-left'>Tag</th>
                        <th className='text-left'>Problems</th>
                    </tr>
                    </thead>
                    <tbody className='bg-gray-600'>
                        <tr className='hover:bg-gray-800'>
                        <td >1</td>
                        <td >greedy</td>
                        <td >30</td>
                       </tr>
                       <tr className='hover:bg-gray-800'>
                        <td >2</td>
                        <td >Binary Search</td>
                        <td >30</td>
                    </tr>
                    <tr className='hover:bg-gray-800'>
                        <td >3</td>
                        <td >Brute Force</td>
                        <td >30</td>
                    </tr>
                    <tr className='hover:bg-gray-800'>
                        <td >4</td>
                        <td >Dynamic Programming</td>
                        <td >30</td>
                    </tr>
                    
                    </tbody>
                </table>
            </div>
            <div className="aiResponse">
                <div className="analysis">
                    <h3 className='font-bold text-xl'>Analysis:-</h3>
                   <div className="pointsContainer bg-gray-800 rounded-md px-5 py-3">
                     <div className="points">
                        1. Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ducimus consequatur, iusto molestiae veritatis aliquid ipsum.
                    </div>
                    <div className="points">
                        2. Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ducimus consequatur, iusto molestiae veritatis aliquid ipsum.
                    </div>
                    <div className="points">
                        3. Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ducimus consequatur, iusto molestiae veritatis aliquid ipsum.
                    </div>
                    <div className="points">
                        4. Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ducimus consequatur, iusto molestiae veritatis aliquid ipsum.
                    </div>
                   </div>
                </div>
                <div className="mistakes">
                    <h3 className='font-bold text-xl'>Mistakes:-</h3>
                    <div className="pointsContainer bg-gray-800 rounded-md px-5 py-3">
                        <div className="points">
                        1. Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ducimus consequatur, iusto molestiae veritatis aliquid ipsum.
                    </div>
                    <div className="points">
                        2. Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ducimus consequatur, iusto molestiae veritatis aliquid ipsum.
                    </div>
                    <div className="points">
                        3. Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ducimus consequatur, iusto molestiae veritatis aliquid ipsum.
                    </div>
                    </div>
                </div>
                <div className="tipsToImprove">
                    <h3 className='font-bold text-xl' >Tips To Improve:-</h3>
                    <div className="pointsContainer bg-gray-800 rounded-md px-5 py-3">
                        <div className="points">
                        1. Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ducimus consequatur, iusto molestiae veritatis aliquid ipsum.
                    </div>
                    <div className="points">
                        2. Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ducimus consequatur, iusto molestiae veritatis aliquid ipsum.
                    </div>
                    <div className="points">
                        3. Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ducimus consequatur, iusto molestiae veritatis aliquid ipsum.
                    </div>
                    <div className="points">
                        4. Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ducimus consequatur, iusto molestiae veritatis aliquid ipsum.
                    </div>
                    </div>
                </div>
            </div>
        </div>

    </div>
  )
}

export default MainPage