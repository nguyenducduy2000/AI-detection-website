import { useState, useEffect } from 'react';
import Spinner from 'react-bootstrap/Spinner';
import { useStore } from '~/store';
// import renderService from '~/services/renderService';
import { chartService } from '~/services';
// import Chart Components
import { BarChart, PieChart, DoughnutChart, StackedChart } from '~/Components/Charts';

function Chart() {
    const [loading, setLoading] = useState(false);
    // chart CSS options
    const [chartData, setChartData] = useState({});
    const { filterParams } = useStore();

    useEffect(() => {
        const axiosFetchEvents = async () => {
            try {
                setLoading(true);
                const currentUrl = window.location.pathname;
                if (currentUrl.includes('/chart/filter')) {
                    const response = await chartService.chartFilter(filterParams);
                    setChartData(response);
                } else {
                    const response = await chartService.render();
                    setChartData(response);
                }
            } catch (error) {
                console.error('Error fetching chart data:', error);
            } finally {
                setLoading(false);
            }
        };

        axiosFetchEvents();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [filterParams]);
    // console.log(chartData);
    return (
        <div className="container-fluid ">
            {chartData.length > 0 ? (
                <div className="row row-col-sm-1 row-cols-xl-2 g-2 g-lg-3">
                    <PieChart
                        chartData={chartData}
                        target={'event_type'}
                        title={'Events distribution'}
                        label={'Amount of events'}
                        loading={loading}
                    />
                    <BarChart
                        chartData={chartData}
                        target={'timestamp'}
                        title={'Events detected during timestamp'}
                        label={'Number of events detected'}
                        loading={loading}
                    />
                    <DoughnutChart
                        chartData={chartData}
                        target={'status'}
                        title={'Current status of AI detection logs'}
                        label={'Status count'}
                        loading={loading}
                    />
                    <StackedChart
                        chartData={chartData}
                        target={['cameraId', 'modelId', 'locationId']}
                        title={'Current status of AI detection'}
                        label={['Camera count', 'Model count', 'Location count']}
                        loading={loading}
                    />
                </div>
            ) : (
                <div className="d-flex flex-fill justify-content-center align-items-center m-3">
                    {loading ? (
                        <Spinner animation="border" role="status">
                            <span className="visually-hidden">Loading...</span>
                        </Spinner>
                    ) : (
                        <p>No data available, please check your internet connection</p>
                    )}
                </div>
            )}
        </div>
    );
}

export default Chart;
