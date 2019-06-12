import { Dimensions, Platform } from 'react-native';
export function isIphoneX() {
    let d = Dimensions.get('window');
    const { height, width } = d;

    return (
        // This has to be iOS
        Platform.OS === 'ios' &&

        // Accounting for the height in either orientation
        (height === 812 || width === 812)
    );
}

export function isPasswordValid(password) {
    return password && password.length >= 8;
}

export function isPasswordCheckValid(check, password) {
    return !password || (check && check === password);
}

export function validateEmail(text) {
    const regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return text && regex.test(text);
}

export function validateCpfOrCnpj(text) {
    const regex = /([0-9]{2}[\.][0-9]{3}[\.][0-9]{3}[\/][0-9]{4}[-][0-9]{2})|([0-9]{3}[\.][0-9]{3}[\.][0-9]{3}[-][0-9]{2})/;
    return text && regex.test(text);
}

export function uuid() {
    function s4() {
        return Math.floor((1 + Math.random()) * 0x10000)
            .toString(16)
            .substring(1)
            .toUpperCase();
    }
    return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
}

export function formatDate(dateTime) {
    const newDate = new Date(dateTime);
    const dateString = newDate.toLocaleDateString("pt-BR"); // dd/mm/yyyy       
    return dateString;
}

export function formatTime(dateTime) {
    const newDate = new Date(dateTime);
    const timeString = newDate.toLocaleTimeString("pt-BR", { hour: '2-digit', minute: '2-digit' }); // HH:MM       
    return timeString;
}

export function getDate() {
    var today = new Date();
    return today.toLocaleDateString("pt-BR"); // dd/mm/yyyy  
}

export function getTime() {
    var today = new Date();
    return today.toLocaleTimeString("pt-BR", { hour: '2-digit', minute: '2-digit' }); // HH:MM    
}

export function getDateTime() {
    var today = new Date();
    return today.toISOString("pt-BR"); // yyyy-MM-dd'T'HH:mm:ss.SSS'Z'
}

export function formatDateToISOString(date) {
    return date.toISOString("pt-BR").split('T')[0];
}

export function formatDateTimeToISOString(date) {
    return date.toISOString("pt-BR");
}

//const object = Utils.getObjectByKey(objects, 'id', 1);
export function getObjectByKey(array, key, value) {
    for (var i = 0; i < array.length; i++) {
        if (array[i][key] === value) {
            return array[i];
        }
    }
    return null;
}

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

export function renderStatus(status) {
    switch (status) {
        case 'in_progress':
            return {
                string: 'Em andamento',
                color: Colors.statusGreen
            }

        case 'on_hold':
            return {
                string: 'Com impedimento',
                color: Colors.statusOrange
            }

        case 'created':
            return {
                string: 'Criada',
                color: Colors.statusRed
            }

        case 'completed':
            return {
                string: 'Concluída',
                color: Colors.statusBlue
            }

        case 'canceled':
            return {
                string: 'Cancelada',
                color: Colors.statusGrey
            }

        default:
            return {
                string: 'Criada',
                color: Colors.statusRed
            }
    }
}

export function renderPriority(priority) {
    switch (priority) {
        case 0:
            return 'Urgente';

        case 1:
            return 'Alta';

        case 2:
            return 'Normal';

        case 3:
            return 'Baixa';

        default:
            return 'Normal';
    }
}
