import React, { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router'
import { FirebaseContext } from '../../firebase'
import Dish from '../ui/Dish'


const Menu = () => {

  const [dishes, setDishes] = useState([])
  const { firebase } = useContext(FirebaseContext)

  //Query the database
  useEffect(() => {
    const getDishes = async () => {
      const result = await firebase.db.collection('products').onSnapshot(handleSnapshot)
    }
    getDishes()
  }, [])

  // Snapshot allow us use data base on realtime of firestore
  const handleSnapshot = (snapshot) => {
    const dishesDB = snapshot.docs.map(doc => {
      return {
        id: doc.id,
        ...doc.data()
      }
    })

    setDishes(dishesDB)
  }

  return (
    <>
      <h1 className="text-3xl fontlight mb-4">Menu</h1>
      <Link
        to="/new-dish"
        className="bg-blue-800 hover:bg-blue-700 inline-block mb-5 p-3 text-white uppercase font-bold rounded-2xl"
      >Add dishe</Link>
      {dishes.map(dish => (
        <Dish
          key={dish.id}
          dish={dish}
        />
      ))}
    </>
  )
}

export default Menu