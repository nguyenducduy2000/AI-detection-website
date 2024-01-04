import PropTypes from 'prop-types';
import { Pie } from 'react-chartjs-2';
import ChartDataLabels from 'chartjs-plugin-datalabels';
// eslint-disable-next-line no-unused-vars
import { Chart as ChartJS } from 'chart.js/auto';

function PieChart({ chartData, target, options = {}, loading, ...props }) {
    // console.log(chartData);
    if (loading) {
        return <p>Loading...</p>;
    }
    const counts = chartData.reduce((acc, data) => {
        data.eventList.forEach((event) => {
            const targetValue = event[target];
            if (targetValue) {
                if (acc[targetValue]) {
                    acc[targetValue] += 1;
                } else {
                    acc[targetValue] = 1;
                }
            }
        });
        return acc;
    }, {});
    // console.log('counts: ', counts);s

    const labels = Object.keys(counts);
    const datasets = [
        {
            label: props.label || 'Label',
            data: Object.values(counts),
            backgroundColor: options.backgroundColor || [
                'rgba(255, 99, 132, 0.6)',
                'rgba(54, 162, 235, 0.6)',
                'rgba(255, 206, 86, 0.6)',
                'rgba(75, 192, 192, 0.6)',
                'rgba(153, 102, 255, 0.6)',
                'rgba(255, 159, 64, 0.6)',
                'rgba(255, 99, 132, 0.6)',
            ],
            borderWidth: options.borderWidth || 1,
            borderColor: options.borderColor || '#777',
            hoverBorderWidth: options.hoverBorderWidth || 2,
            hoverBorderColor: options.hoverBorderColor || '#000',
        },
    ];

    const fetchedChartData = {
        labels: props.labels || labels,
        datasets,
    };

    return (
        <div className="chart col border">
            <div className="m-2">
                <Pie
                    data={{ ...fetchedChartData }}
                    plugins={[ChartDataLabels]}
                    options={{
                        plugins: {
                            title: {
                                display: true,
                                text: props.title || 'Pie Chart',
                                font: {
                                    size: 24,
                                },
                            },
                            legend: {
                                display: true,
                                position: 'bottom',
                            },
                            datalabels: {
                                display: true,
                                color: '#666',
                                font: {
                                    size: 18,
                                },
                                align: 'center',
                                formatter: (value, context) => {
                                    const datapoint = context.chart.data.datasets[0].data;
                                    function totalSum(total, datapoint) {
                                        return total + datapoint;
                                    }
                                    const total = datapoint.reduce(totalSum, 0);
                                    const percentage = ((value / total) * 100).toFixed(2);
                                    return `${percentage}%`;
                                },
                            },
                        },
                        layout: {
                            padding: 10,
                        },
                        responsive: true,
                        maintainAspectRatio: false,
                        scales: {
                            xAxis: {
                                display: false,
                            },
                            yAxis: {
                                display: false,
                            },
                        },
                    }}
                    width={600}
                    height={600}
                />
            </div>
        </div>
    );
}

PieChart.propTypes = {
    chartData: PropTypes.array.isRequired,
    target: PropTypes.string.isRequired,
    loading: PropTypes.bool,
    options: PropTypes.object,
    props: PropTypes.any,
    title: PropTypes.string,
    labels: PropTypes.array,
    label: PropTypes.string,
};

export default PieChart;
