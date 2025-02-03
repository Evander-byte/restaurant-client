import React, { useContext, useEffect, useState } from 'react'
import FirebaseContext from '../../firebase/context'

const Order = ({order}) => {

  const {firebase} = useContext(FirebaseContext)

  const [timeDelivery, setTimeDelivery] = useState(0)
  useEffect(() => {

  }, [])

  // Define delivery time on real time
  const defineTime = id => {
    try {
      firebase.db.collection('orders')
              .doc(id)
              .update({
                deliveryTime: timeDelivery
              })
    } catch (error) {
      console.log(error);
    }
  }

  const completeOrder = id => {
    try {
      firebase.db.collection('orders')
              .doc(id)
              .update({
                complete: true
              })
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <div className="sm:w-1/2 md:w-1/3 px-2 mb-4">
      <div className="p-3 shadow-md bg-white">
        <h1 className="text-yellow-600 text-lg font-bold">{order.id}</h1>
        {order.order.map(dish => (
          <p className="text-gray-500">{dish.quantity} {dish.name}</p>
        ))}
        <p className="text-gray-700 font-bold">Total to pay: ${order.totalPay}</p>
        {order.deliveryTime === 0 && (
          <div className="mb-4">
            <label htmlFor="" className="block text-gray-700 font-bold mb-2">Time to delivery:</label>
            <input 
              type="number" 
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-none"
              min='1'
              max='20'
              placeholder='20'
              value={timeDelivery}
              onChange={e => setTimeDelivery(parseInt(e.target.value))}
            />
            <button 
              type='submit' 
              className="bg-gray-800 hover:bg-gray-900 w-full mt-5 p-2 text-white uppercase font-bold rounded-lg"
              onClick={() => defineTime(order.id)}
            >Set time</button>
          </div>
        )}
        {order.deliveryTime > 0 && (
          <p className="text-gray-700">Estimated time: {order.deliveryTime} Minutes</p>
        )}

        {!order.complete && order.deliveryTime > 0 && (
          <button 
            type="button" 
            className='bg-blue-800 hover:bg-blue-700 w-full mt-5 p-2 text-white uppercase font-bold rounded-lg'
            onClick={() => completeOrder(order.id)} 
          >Ready</button>
        )}
      </div>
    </div>
  )
}

export default Order