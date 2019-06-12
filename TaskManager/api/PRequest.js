import * as Utils from '../utils/Utils';

// POST, PUT, PATCH Request
const PRequest = (method, url, requestData, token) => {
    //console.log(method, url, requestData, token);
    return fetch(url, {
        method: method,
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            'Authorization': token,
        },
        body: JSON.stringify(requestData), // must match 'Content-Type' header
    })
        .then((response) => {
            // console.log(response);
            // console.debug(response);
            if (response.status >= 200 && response.status < 300) { // response.ok
                console.log('Request ' + method + ' ' + url + ' success!');
                return {
                    success: true,
                    response: response,
                    error: null,
                };
            } else {
                console.log('Request ' + method + ' ' + url + ' failed!');
                console.log(response.url, response.status, response._bodyText);
                const errorMessage = Utils.getErrorMessage(response._bodyText);

                if (response.status == 500) {
                    errorMessage = 'Erro no servidor. Tente novamente mais tarde.'
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

export { PRequest }