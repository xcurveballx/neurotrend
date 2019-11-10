export default class ApiController {
    static host = 'http://178.170.206.10:999';
    static login_path = '/core/api/login';
    static logout_path = '/core/api/logout';

    static login(user, pass) {
        let url = `${ApiController.host}${ApiController.login_path}?username=${user}&password=${pass}`;

        return fetch(url).then(response => response.json());
    }

    static logout(key) {
        let url = `${ApiController.host}${ApiController.logout_path}`;

        let opts = {
            headers: {
                'Authorization': `Token ${key}`,
            }
        };

        return fetch(url, opts).then(response => response.json());
    }
}
