
import Enter from "./component/Enter"
import MainPage from "./component/MainPage"
import { Route,Router, Routes } from "react-router-dom"



function App() {
  

  return (
    <>
    <div className="mainContainer flex justify-center items-center h-full w-full bg-gray-700 flex-col">
     <h1 className="text-7xl  font-semibold bg-gray-300 w-screen text-center text-gray-950">CF HELPER</h1>
   </div>
   <Routes>
    
     <Route path="/" element = {<Enter/>} />
     <Route path="/main" element = {<MainPage/>} />
   </Routes>
    
    </>
  )
}

export default App
