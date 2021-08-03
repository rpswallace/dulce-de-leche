import { useEffect, useState } from 'react'
import DataTable from '../../components/shared/DataTable/DataTable';
// Utils
import API from '../../utils/api'


const Orders = () => {
  const [orders, setOrders] = useState([]);

  // https://hangarworldwide.udemy.com/course/react-redux/learn/lecture/20787690#overview
  useEffect(() => {
    const getOrders = async () => {
      const { data }  = await API.getRequest('/pedidos')
      setOrders(data)
    }
    getOrders()
  },[])

  return (
    <div>
      {
        orders.length ? <DataTable orders={ orders }/> : <p>no hay</p>
      }
    </div>
  )
}

export default Orders
