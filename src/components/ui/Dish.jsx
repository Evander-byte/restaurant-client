import React, { useContext, useRef } from 'react'
import { FirebaseContext } from '../../firebase'

const Dish = ({dish}) => {
    //Avalible ref by access value directly
    const avalibleRef = useRef(dish.avalible)
    //firebase context for changes on DB
    const {firebase} = useContext(FirebaseContext)
    const {
        id,
        name,
        price,
        category,
        description,
        photo,
        avalible
    } = dish
    const updateAvalible = () => {
        const exists = (avalibleRef.current.value === "true")

        try {
            firebase.db.collection('products')
                    .doc(id)
                    .update({
                        avalible: exists
                    })
        } catch (error) {
            console.log(error)
        }
    }
  return (
    <div className="w-full px-3 mb-4">
        <div className="p-5 shadow-md bg-white">
            <div className="lg:flex">
                <div className="lg:w-5/12 xl:w-3/12">
                    <img src={photo} alt="photo dish" className=""/>
                    <div className="sm:flex sm:-mx-2">
                        <label htmlFor="" className="block mt-5 sm:w-2/4">
                            <span className="block text-gray-800 mb-2">Avalible:</span>
                            <select 
                            className="sha appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-none bg-white pl-2" 
                            value={avalible}
                            ref={avalibleRef}
                            onChange={() => updateAvalible()}
                            >
                                <option value="true">Avalible</option>
                                <option value="false">Not Avalible</option>
                            </select>
                        </label>
                    </div>
                </div>
                <div className="lg:w-7/12 xl:w-9/12 pl-5">
                    <p className="font-bold text-2xl text-yellow-600 mb-4">{name}</p>
                    <p className="text-gray-600 mb-4">Catgeory: {''}<span className="text-gray-700 font-bold uppercase">{category}</span></p>
                    <p className="text-gray-600 mb-4">{description}</p>
                    <p className="text-gray-600 mb-4">Price: {''}<span className="text-gray-700 font-bold uppercase">${price}</span></p>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Dish