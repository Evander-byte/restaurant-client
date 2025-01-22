import { Route, Routes } from "react-router"
import firebase, { FirebaseContext } from "./firebase" 

import Orders from "./components/pages/Orders"
import Menu from "./components/pages/Menu"
import NewDish from "./components/pages/NewDish"
import SideBar from "./components/ui/SideBar"


function App() {

  return (
    <FirebaseContext.Provider
      value={{firebase}}
    >
      <div className="md:flex min-h-screen">
        <SideBar/>
        <div className="md:w-3/5 xl:w-4/5 p-6">
          <Routes>
            <Route path="/" element={<Orders/>}/>
            <Route path="/menu" element={<Menu/>}/>
            <Route path="/new-dish" element={<NewDish/>}/>
          </Routes>
        </div>
      </div>
    </FirebaseContext.Provider>
  )
}

export default App
