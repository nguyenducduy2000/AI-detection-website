import httpRequest from '~/utils/httpRequest';

export default {
    render: (limit) => {
        const options = {
            method: 'GET',
            url: '/',
        };
        if (limit) {
            options.params = {
                limit,
            };
        }
        return httpRequest(options)
            .then((res) => {
                const data = res.data;
                const limitedData = data.slice(0, limit);
                return limitedData;
            })
            .catch((err) => {
                console.log(err);
            });
    },

    search: (page) => {
        return httpRequest({
            method: 'GET',
            url: '/search',
            params: {
                page,
            },
        })
            .then((res) => {
                const data = res.data;
                return data;
            })
            .catch((err) => {
                console.log(err);
            });
    },
};
