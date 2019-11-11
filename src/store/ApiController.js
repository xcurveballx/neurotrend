export default class ApiController {
    static host = 'http://178.170.206.10:999';
    static api_path = '/core/api/';

    static login(user, pass) {
        let url = `${ApiController.host}${ApiController.api_path}login?username=${user}&password=${pass}`;

        return fetch(url).then(response => response.json());
    }

    static logout(key) {
        let url = `${ApiController.host}${ApiController.api_path}logout`,
            opts = {
                headers: {
                    'Authorization': `Token ${key}`,
                }
            };

        return fetch(url, opts).then(response => response.json());
    }

    static fetchItems(key, model) {
        let url = `${ApiController.host}${ApiController.api_path}${model}`,
            opts = {
                headers: {
                    'Authorization': `Token ${key}`,
                }
            };

        return fetch(url, opts).then(response => response.json());
    }
}
