export function getErrorMessage(responseBody) {
    const string = responseBody.toString();
    if (string.indexOf("[") >= 0) {
        const indexStart = string.indexOf("[") + 2;
        const indexEnd = string.indexOf("]") - 1;
        return string.substring(indexStart, indexEnd);
    } else {
        const newString = string.replace(/[&\/\\#,+()$~%*?<>{}]/g, '');
        const indexStart = newString.indexOf(":") + 2;
        const indexEnd = newString.indexOf(".\"");
        return newString.substring(indexStart, indexEnd);
    }
}

// const Utils = {
//     getErrorMessage(responseBody) {
//         const string = responseBody.toString();
//         if (string.indexOf("[") >= 0) {
//             const indexStart = string.indexOf("[") + 2;
//             const indexEnd = string.indexOf("]") - 1;
//             return string.substring(indexStart, indexEnd);
//         } else {
//             const newString = string.replace(/[&\/\\#,+()$~%*?<>{}]/g, '');
//             const indexStart = newString.indexOf(":") + 2;
//             const indexEnd = newString.indexOf(".\"");
//             return newString.substring(indexStart, indexEnd);
//         }
//     },
// };

// // Make a component available to other parts of the app
// export default Utils;