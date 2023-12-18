import React from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';
import PaginationPage from '~/Components/PaginationPage';

ChartJS.register(ArcElement, Tooltip, Legend);

function PieChart()
{
    
    return(
            <React.Fragment>
            <div className="container-fluid">           
            <h2>Biểu đồ lỗi vi phạm</h2>
            <div className="display-flex row">
              <div className="col-md-5 mb-3 mt-3">
            <Pie
            width={250}
            height={200}
            data={{
                labels: ['Vượt đèn đỏ', 'Lấn vạch', 'Không đội mũ', 'Không gương trái', 'Quá tốc độ', 'Chở quá số người cho phép'],
                datasets: [
                    {
                      label: '# of Votes',
                      data: [12, 19, 3, 5, 2, 3],
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
                      borderWidth: 1,
                    },
                  ],
                
            }}
            options ={{
              responsive: true,
              plugins:{
                title:{
                  text:'Ti le @@@',
                  display: true
                }
              }
            }}
              
            />
            </div>            
            </div>
            </div>
            </React.Fragment>
    );
    
}

export default PieChart;
