import { Platform } from 'react-native'

const baseUrl = __DEV__ ?
    Platform.select({
        ios: "http://127.0.0.1:8000",
        android: "http://127.0.0.1:8000"
    }) :
    "https://www.taskmanagerexample.com.br"

const path = {
    login: '/api/v1/login/',
    changePassword: 'api/v1/change-password/',
    recoverPassword: 'api/v1/recover-password/',
    contact: 'api/v1/contact/',
    projects: 'api/v1/projects/',
    tasks: 'api/v1/tasks/',
    jobs: 'api/v1/jobs/',
    users: 'api/v1/users/',
}

export default {
    service: {
        baseUrl,
        path
    }
};