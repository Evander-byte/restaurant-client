import React from 'react'
import { NavLink } from 'react-router'

const SideBar = () => {
  return (
    <div className="md:w-2/5 xl:w-1/5 bg-gray-800">
        <div className="p-6">
            <p className="uppercase text-white text-2xl tracking-wide text-center font-bold">Restaurant app</p>
            <p className="mt-3 text-gray-600 text-center">Manage your resturant</p>
            <nav className="mt-10">
                <NavLink
                    to="/"
                    className={({isActive}) => 
                        !isActive 
                            ? "p-3 text-gray-400 block transition ease-out delay-100 hover:bg-yellow-500 hover:text-gray-700 rounded-2xl text-center mt-1"
                            : "bg-yellow-500 text-gray-700 rounded-2xl text-center p-3 block mt-1"
                    }
                >Orders</NavLink>
                <NavLink
                    to="/menu"
                    className={({isActive}) => 
                        !isActive 
                            ? "p-3 text-gray-400 block transition ease-out delay-150 hover:bg-yellow-500 hover:text-gray-700 rounded-2xl text-center mt-1"
                            : "bg-yellow-500 text-gray-700 rounded-2xl text-center p-3 block mt-1"
                    }
                >Menu</NavLink>
            </nav>
        </div>
    </div>
  )
}

export default SideBar