import axios from 'axios'
let problemInfo;
  try{
    problemInfo = await axios.get(`https://codeforces.com/api/problemset.problems`)
  }catch(err){
    console.log("could not gather relavant problem set information from codeforces")
  }
  const problem = problemInfo?.data.result.problems; 
 const rawStats = problemInfo?.data.result.problemStatistics;
//@ts-ignore
 export const problemSet = problem.map((problem,index:number)=>{
    return {
        ...problem,
        solvedCount:rawStats[index].solvedCount
    }
 })

