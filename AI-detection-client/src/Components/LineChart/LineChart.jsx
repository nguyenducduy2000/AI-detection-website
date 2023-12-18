import { Line } from 'react-chartjs-2'
import React from 'react'
import {
    Chart as ChartJS,
    LineElement,
    CategoryScale,
    LinearScale,
    PointElement,
    Tooltip
} from 'chart.js'

ChartJS.register(
    LineElement,
    CategoryScale,
    LinearScale,
    PointElement,
    Tooltip
)

function LineChart()
{
    return (
        <React.Fragment>
        <div className="container-fluid">
            <div className="display-flex col-md-5 ml-3">
            <Line
                    width={250}
                    height={200}
                    padding={20}
                    data = {{
                        labels: ['Xe may', 'O to con', 'Xe tai', 'Container'],
                        datasets: [{
                            labels: 'Vehicle',
                            data: [145, 241, 12, 13],
                            backgroundColor: [
                                'rgba(255, 99, 132, 0.2)',
                                'rgba(54, 162, 235, 0.2)',
                                'rgba(255, 206, 86, 0.2)',
                                'rgba(75, 192, 192, 0.2)',
                                'rgba(153, 102, 255, 0.2)',
                                'rgba(255, 159, 64, 0.2)',
                              ],
                            borderColor: [
                                'rgba(255, 99, 132, 1)',
                                'rgba(54, 162, 235, 1)',
                                'rgba(255, 206, 86, 1)',
                                'rgba(75, 192, 192, 1)',
                                'rgba(153, 102, 255, 1)',
                                'rgba(255, 159, 64, 1)',
                              ],
                            pointBorderColor: 'aqua',
                            fill: true,
                            tension: 0.4
                            },   
                        ],
                    }}
                    options ={{
                        responsive: true,
                        plugins:{
                          title:{
                            display: true
                          }
                        }
                      }}
                />
            </div>       
        </div>
        </React.Fragment>
    );
    
}

export default LineChart;