
import Enter from "./component/Enter"
import MainPage from "./component/MainPage"
import { Route, Routes } from "react-router-dom"



function App() {
  

  return (
    <>
    <div className="mainContainer flex flex-col bg-zinc-300 items-center justify-center ">
     <h1 className="text-7xl  font-semibold bg-gray-300  text-center text-gray-950 w-[80%]">CF HELPER</h1>
   
   <Routes>
     <Route path="/" element = {<Enter/>} />
     <Route path="/main" element = {<MainPage/>} />
     
   </Routes>
    </div>
    </>
  )
}

export default App
