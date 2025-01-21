import { Route, Routes } from "react-router"
import Orders from "./components/pages/Orders"
import Menu from "./components/pages/Menu"
import NewDish from "./components/pages/NewDish"
import SideBar from "./components/ui/SideBar"


function App() {

  return (
    <div>
      <SideBar/>
      <Routes>
        <Route path="/" element={<Orders/>}/>
        <Route path="/menu" element={<Menu/>}/>
        <Route path="/new-dish" element={<NewDish/>}/>
      </Routes>
    </div>
  )
}

export default App
