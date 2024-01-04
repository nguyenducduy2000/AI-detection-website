import PropTypes from 'prop-types';
import { Bar } from 'react-chartjs-2';
import ChartDataLabels from 'chartjs-plugin-datalabels';
// eslint-disable-next-line no-unused-vars
import { Chart as ChartJS } from 'chart.js/auto';

function StackedChart({ chartData, target, options = {}, loading, ...props }) {
    // console.log(chartData);
    if (loading) {
        return <p>Loading...</p>;
    }

    const cameraCounts = chartData.reduce((acc, data) => {
        if (acc[data[target[0]]]) {
            acc[data[target[0]]] += 1;
        } else {
            acc[data[target[0]]] = 1;
        }
        return acc;
    }, {});
    // console.log('camera counts: ', cameraCounts);

    const modelCount = chartData.reduce((acc, data) => {
        if (acc[data[target[1]]]) {
            acc[data[target[1]]] += 1;
        } else {
            acc[data[target[1]]] = 1;
        }
        return acc;
    }, {});
    // console.log('model counts: ', modelCount);

    const labels = [...new Set([...Object.keys(cameraCounts), ...Object.keys(modelCount)])];
    console.log('labels: ', labels);
    const datasets = [
        {
            label: props.label[0] || 'Label',
            data: Object.values(cameraCounts),
            backgroundColor: options.backgroundColor || ['rgba(255, 99, 132, 0.6)'],
            borderWidth: options.borderWidth || 1,
            borderColor: options.borderColor || '#777',
            hoverBorderWidth: options.hoverBorderWidth || 2,
            hoverBorderColor: options.hoverBorderColor || '#000',
        },
        {
            label: props.label[1] || 'Label',
            data: Object.values(modelCount),
            backgroundColor: options.backgroundColor || ['rgba(54, 162, 235, 0.6)'],
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
                <Bar
                    data={{ ...fetchedChartData }}
                    plugins={[ChartDataLabels]}
                    options={{
                        plugins: {
                            title: {
                                display: true,
                                text: props.title || 'Line Chart',
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
                                    size: 14,
                                },
                                align: 'center',
                            },
                        },
                        layout: {
                            padding: 10,
                        },
                        responsive: true,
                        maintainAspectRatio: false,
                        scales: {
                            x: {
                                stacked: true,
                            },
                            y: {
                                stacked: true,
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

StackedChart.propTypes = {
    chartData: PropTypes.array.isRequired,
    target: PropTypes.any.isRequired,
    loading: PropTypes.bool,
    options: PropTypes.object,
    props: PropTypes.any,
    title: PropTypes.string,
    labels: PropTypes.array,
    label: PropTypes.string,
};

export default StackedChart;
