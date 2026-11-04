
import Enter from "./component/Enter"
import MainPage from "./component/MainPage"
import { Route, Routes } from "react-router-dom"
import ProblemSet from "./component/ProblemSet"



function App() {
  

  return (
    <>
    
    <div className="mainContainer flex flex-col  items-center justify-center bg-gray-300 ">
     <h1 className="lg:text-7xl text-4xl  font-semibold bg-gray-100  text-center text-gray-950 w-[80%] font-[verdana] border border-solid border-white border-d-black">CF HELPER</h1>
   
   <Routes>
     <Route path="/" element = {<Enter/>} />
     <Route path="/main" element = {<MainPage/>} />
     <Route path="/problem" element={<ProblemSet/>} />
   </Routes>

    
    </div>


    </>
  )
}

export default App
