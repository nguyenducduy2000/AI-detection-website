import httpRequest from '~/utils/httpRequest';

export default {
    accept: (id) => {
        const options = {
            method: 'PUT',
            url: '/accept',
            data: {
                id,
            },
        };
        return httpRequest(options)
            .then((res) => {
                console.log(res.data);
                // res.send(res.data);
            })
            .catch((err) => {
                console.log(err);
            });
    },
    reject: (id) => {
        const options = {
            method: 'PUT',
            url: '/reject',
            data: {
                id,
            },
        };
        return httpRequest(options)
            .then((res) => {
                console.log(res.data);
                // res.send(res.data);
            })
            .catch((err) => {
                console.log(err);
            });
    },
};
