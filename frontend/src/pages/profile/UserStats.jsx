import React from 'react'
import { useSelector } from 'react-redux'
import { Bar } from "react-chartjs-2"
import {Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend} from "chart.js"
import { useGetUserStatsQuery } from '../../redux/features/stats/statsApi';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)

const UserStats= () => {
    const {user} = useSelector((state) => state.auth);
    const {data: stats, error, isLoading} = useGetUserStatsQuery(user?.email)
    console.log(stats)
    if(isLoading) return <div className='text-center text-gray-500'>Loading...</div>
    if(!stats) {
        return <div className='text-center text-gray-500'>No data available.</div>
    }

    const data = {
        labels: ['Total Payments', 'Total Reviews', 'Total Purchased Products'],
        datasets: [
            {
                label: 'User Stats',
                data: [stats.totalPayments, stats.totalReviews * 100, stats.totalPurchasedProducts * 100],
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                borderColor:'rgba(75, 192, 192, 1)',
                borderWidth: 1,
            }
        ]
    }

    const options= {
        responsive: true,
        plugins: {
          legend: {
            position: 'top',
          },
          tooltip: {
           callbacks: {
            label: function (tooltipItem) {
               
                return `${tooltipItem.label}: ${tooltipItem.raw}`
            }
           }
          }
        }
    }
  return (
    <div className='p-6'>
        <div className='my-5 space-y-4'>
        <div className='grid gap-4 md:grid-cols-2 lg:grid-cols-3 grid-cols-1'>
            <div className='bg-white shadow-md rounded-lg p-6 border border-gray-200 hover:border-primary cursor-pointer hover:scale-105 transition-all duration-200'>
                <h2 className='text-xl font-semibold mb-2'>Total Payments</h2>
                <p className='text-2xl font-bold'>${stats?.totalPayments}</p>
            </div>
            <div className='bg-white shadow-md rounded-lg p-6 border border-gray-200 hover:border-primary cursor-pointer hover:scale-105 transition-all duration-200'>
                <h2 className='text-xl font-semibold mb-2'>Total Reviews</h2>
                <p className='text-2xl font-bold'>{stats?.totalReviews}</p>
            </div>
            <div className='bg-white shadow-md rounded-lg p-6 border border-gray-200 hover:border-primary cursor-pointer hover:scale-105 transition-all duration-200'>
                <h2 className='text-xl font-semibold mb-2'>Total Purchased Products</h2>
                <p className='text-2xl font-bold'>{stats?.totalPurchasedProducts}</p>
            </div>
        </div>
    </div>
    </div>
  )
}

export default UserStats