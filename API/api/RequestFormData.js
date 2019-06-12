import * as Utils from '../utils/Utils';

const RequestFormData = (method, url, params, imageData, token) => {
    //console.log(method, url, params, imageData, token);
    let formData = new FormData()
    if (imageData.imageURI) {
        const imageName = Utils.uuid() + '.jpg'
        //console.log(imageName)
        formData.append(imageData.key, { uri: imageData.imageURI, name: imageName, type: 'image/jpg' })
    } else {
        formData.append(imageData.key, '')
    }

    for (var key in params) {
        let value = params[key];
        formData.append(key, value);
    }
    // console.log(formData);

    return fetch(url, {
        method: method,
        headers: {
            Accept: 'application/json',
            'Content-Type': 'multipart/form-data',
            'Authorization': token,
        },
        body: formData, // must match 'Content-Type' header
    })
        .then((response) => {
            //console.log(response);
            //console.debug(response);
            if (response.status >= 200 && response.status < 300) { // response.ok
                console.log("Request " + url + " success!");
                return {
                    success: true,
                    response: response,
                    error: null,
                };
            } else {
                console.log('Request ' + url + '  failed!');
                console.log(response.url, response.status, response._bodyText);
                const errorMessage = Utils.getErrorMessage(response._bodyText);

                if (response.status == 500) {
                    errorMessage = "Server error. Try again later."
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

export { RequestFormData }