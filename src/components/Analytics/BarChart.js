import React from 'react'
import { Bar } from 'react-chartjs-2'
import Chart  from 'chart.js/auto'

const BarChart = ({chartData}) => {

      
  return (
    <div className='w-full py-10 max-w-[600px] m-auto mt-8'>
        <Bar data={chartData} options={{
             plugins: {
                legend: {
                    labels: {
                        color: '#F3F4F6',
                        font: {
                            size: 12,
                            family: "'Tajawal', sans-serif",  
                        }
                    }
                }
            },
        scales: {
            xAxes: [{
                ticks: {
                    beginAtZero: true,
                },
            }],
            yAxes: [{
                ticks: {
                    beginAtZero: true,
                }
            }],
            y: {
                ticks: {
                    color: '#F3F4F6'
                }
            },
            x: {
                ticks: {
                    color: '#F3F4F6',
                    font: {
                        family: "'Tajawal', sans-serif",       
                        size: 12
                    }
                }
            }
        },
    }}/>
    </div>
  )
}

export default BarChart