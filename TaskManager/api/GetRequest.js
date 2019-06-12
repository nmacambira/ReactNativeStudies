import * as Utils from '../utils/Utils';

const GetRequest = (url, token) => {
    // console.log(url, token);
    return fetch(url, {
        method: 'GET',
        headers: {
            "Authorization": token,
        },
    })
        .then((response) => {
            // console.log(response);
            // console.debug(response);
            if (response.status >= 200 && response.status < 300) { // response.ok
                console.log("Request GET " + url + " success!");
                return {
                    success: true,
                    response: response,
                    error: null,
                };
            } else {
                console.log('Request GET ' + url + ' failed!');
                console.log(response.url, response.status, response._bodyText);
                const errorMessage = Utils.getErrorMessage(response._bodyText);

                if (response.status == 500) {
                    errorMessage = "Erro no servidor. Tente novamente mais tarde."
                }
                return {
                    success: false,
                    response: errorMessage,
                    error: null,
                };
            }
        })
        .catch((error) => {
            console.log('Request error!');
            console.error(error);
            return {
                success: null,
                response: null,
                error: error,
            };
        });
}

export { GetRequest }