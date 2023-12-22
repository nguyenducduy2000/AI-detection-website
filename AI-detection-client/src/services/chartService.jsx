import httpRequest from '~/utils/httpRequest';

export default {
    render: () => {
        const options = {
            method: 'GET',
            url: '/chart',
        };
        // if (filterData) {
        //     options.params = {
        //         ...options.params,
        //         ...filterData,
        //     };
        // }
        return httpRequest(options)
            .then((res) => {
                const data = res.data;
                return data;
            })
            .catch((err) => {
                console.log(err);
            });
    },

    chartFilter: ({ objectType, timeFrom, timeTo, sensorID }) => {
        // console.log('filter API is being called');
        const options = {
            method: 'GET',
            url: '/chart/filter',
            params: {
                objectType,
                timeFrom,
                timeTo,
                sensorID,
            },
        };
        return httpRequest(options)
            .then((res) => {
                const data = res.data;
                return data;
            })
            .catch((err) => {
                console.log(err);
            });
    },
};
