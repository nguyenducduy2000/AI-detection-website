import httpRequest from '~/utils/httpRequest';

export default {
    render: () => {
        const options = {
            method: 'GET',
            url: '/',
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

    getEventInfo: (messageId) => {
        const options = {
            method: 'GET',
            url: '/event',
            params: {
                messageId,
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

    filter: ({ eventType, timeFrom, timeTo, cameraID, status }) => {
        // console.log('filter API is being called');
        const options = {
            method: 'GET',
            url: '/filter',
            params: {
                eventType,
                timeFrom,
                timeTo,
                cameraID,
                status,
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
