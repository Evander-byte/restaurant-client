import React, { useContext, useEffect, useState } from 'react'
import { FirebaseContext } from '../../firebase'
import Order from '../ui/Order'

const Orders = () => {
  
  const {
    firebase
  } = useContext(FirebaseContext)

  const [orders, setOrders] = useState([])

  useEffect(() => {
    const getOrders = () => {
      firebase.db.collection('orders').where('complete', '==', false).onSnapshot(handleSnapshot)
    }
    getOrders()
  },[])

  function handleSnapshot(snapshot){
    const ordersDB = snapshot.docs.map(doc => {
      return{
        id: doc.id,
        ...doc.data()
      }
    })
    setOrders(ordersDB)
  }
  return (
    <>
      <h1 className="text-3xl font-light mb-4">Orders</h1>
      <div className="sm:flex sm:flex-wrap -mx-3">
      {orders.map(ord => (
        <Order
          key={ord.id} 
          order={ord}
        />
      ))}
      </div>
    </>
  )
}

export default Orders