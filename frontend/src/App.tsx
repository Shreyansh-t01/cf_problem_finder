
import Enter from "./component/Enter"
import MainPage from "./component/MainPage"
import { Route, Routes } from "react-router-dom"
import ProblemSet from "./component/ProblemSet"



function App() {
  return (
  
    
     <div className="mainContainer flex flex-col  items-center justify-center bg-[#E2E8F0]">
     <h1 className="lg:text-7xl text-4xl  font-semibold bg-[#F1F5F9]  text-center text-gray-950 w-[100%] font-[verdana] border border-solid  border-d-black border-[#E2E8F0]">CF HELPER</h1>
   
   <Routes>
     <Route path="/" element = {<Enter/>} />
     <Route path="/main" element = {<MainPage/>} />
     <Route path="/problem" element={<ProblemSet/>} />
   </Routes>
   </div>
  )
}

export default App
