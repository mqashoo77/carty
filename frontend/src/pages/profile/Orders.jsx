import React from 'react'
import { useSelector } from 'react-redux'
import { useGetOrdersByEmailQuery } from '../../redux/features/orders/orderApi';
import { Link } from 'react-router-dom';

const Orders = () => {
    const {user} = useSelector((state) => state.auth);
    const {data: orderdata, error, isLoading} = useGetOrdersByEmailQuery(user?.email);
    const orders = orderdata?.orders;
    console.log(orders)

    if(isLoading)  return <div>Loading...</div>
    if(error) return <div>No order found!</div>
    return (
        <>
        

<div className="relative overflow-x-auto shadow-md sm:rounded-lg">
    <table className="w-full text-sm text-left rtl:text-right text-gray-500">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50">
            <tr>
                <th scope="col" className="px-6 py-3">
                    #
                </th>
                <th scope="col" className="px-6 py-3">
                    Order ID
                </th>
                <th scope="col" className="px-6 py-3">
                    Date
                </th>
                <th scope="col" className="px-6 py-3">
                    Price
                </th>
                <th scope="col" className="px-6 py-3">
                    Status
                </th>
                <th scope="col" className="px-6 py-3">
                    <span className="sr-only">More Details</span>
                </th>
            </tr>
        </thead>
        <tbody>
    
            {
                                    orders && orders.map((order, index) =>(
                                        <tr key={index}>
                                        <th className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left text-blueGray-700 ">
                                            {index + 1}
                                        </th>
                                        <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 ">
                                            {order?.orderId}
                                        </td>
                                        <td className="border-t-0 px-6 align-center border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                                            {
                                                new Date(order?.createdAt).toLocaleDateString()
                                            }
                                        </td>
                                        <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                                           {order?.amount}
                                        </td>

                                        <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                                           <span className={`p-1 rounded 
                                            ${order?.status === 'completed' ? 'bg-green-100 text-green-700' : order?.status === 'pending' ? 'bg-red-100 text-red-700' : order?.status === 'processing' ? 'bg-blue-100 text-blue-600' : 'bg-indigo-100 text-indigo-600'}`}>{order?.status}</span>
                                        </td>
                                        
                                        <td className="px-6 py-4 text-right">
                                          <Link to={`/orders/${order?._id}`} className='font-medium text-primary hover:underline'>More Details</Link>
                                        </td>
                                    </tr> 
                                    ))
                                }
        
        </tbody>
    </table>
</div>

        </>
    )
}

export default Orders