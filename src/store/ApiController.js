export default class ApiController {
    static host = 'http://178.170.206.10:999';
    static api_path = '/core/api/';

    static fire(url, key, opts) {
        if (!url) return;
        let defauls = key ? {headers: {'Authorization': `Token ${key}`}} : {};
        let options = opts ? Object.assign(defauls, opts) : defauls;
        return fetch(url, options).then(response => response.json());
    }

    static login(user, pass) {
        let url = `${ApiController.host}${ApiController.api_path}login/?username=${user}&password=${pass}`;
        return ApiController.fire(url);
    }

    static logout(key) {
        let url = `${ApiController.host}${ApiController.api_path}logout/`;
        return ApiController.fire(url, key);
    }

    static fetchModel(key, model) {
        let url = `${ApiController.host}${ApiController.api_path}${model}/`;
        return ApiController.fire(url, key);
    }

    static fetchModelById(key, model, id) {
        let url = `${ApiController.host}${ApiController.api_path}${model}/${id}/`;
        return ApiController.fire(url, key);
    }
}
