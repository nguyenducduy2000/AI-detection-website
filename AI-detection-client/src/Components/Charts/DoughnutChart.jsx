import PropTypes from 'prop-types';
import { Doughnut } from 'react-chartjs-2';
// eslint-disable-next-line no-unused-vars
import { Chart as ChartJS } from 'chart.js/auto';

function DoughnutChart({ chartData, target, options = {}, loading, ...props }) {
    // console.log(chartData);
    if (loading) {
        return <p>Loading...</p>;
    }

    const counts = chartData.reduce((acc, data) => {
        if (acc[data[target]]) {
            acc[data[target]] += 1;
        } else {
            acc[data[target]] = 1;
        }
        return acc;
    }, {});
    // console.log('counts: ', counts);

    const labels = Object.keys(counts);
    // console.log('labels: ', labels);
    // // new labels for chart
    // const newLabels = labels.map((label) => {
    //     if (parseInt(label) === 1) {
    //         return 'Approved';
    //     } else if (parseInt(label) === 0) {
    //         return 'Rejected';
    //     } else {
    //         return 'Not checked';
    //     }
    // });
    // console.log('newLabels: ', newLabels);
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
                <Doughnut
                    data={{ ...fetchedChartData }}
                    options={{
                        plugins: {
                            title: {
                                display: true,
                                text: props.title || 'Doughnut Chart',
                                fontSize: 25,
                            },
                            legend: {
                                display: true,
                                position: 'right',
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

DoughnutChart.propTypes = {
    chartData: PropTypes.array.isRequired,
    target: PropTypes.string.isRequired,
    loading: PropTypes.bool,
    options: PropTypes.object,
    props: PropTypes.any,
    title: PropTypes.string,
    labels: PropTypes.array,
    label: PropTypes.string,
};

export default DoughnutChart;