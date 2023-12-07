import httpRequest from '~/utils/httpRequest';

export default {
    render: (limit = 3) => {
        return httpRequest({
            method: 'GET',
            url: '/',
        })
            .then((res) => {
                const data = res.data;
                const limitedData = data.slice(0, limit);
                return limitedData;
            })
            .catch((err) => {
                console.log(err);
            });
    },
};
