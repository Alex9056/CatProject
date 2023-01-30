// - GET (https://cats.petiteweb.dev/api/single/:user/show) - отобразить всех котиков
// - GET (https://cats.petiteweb.dev/api/single/:user/ids) - отобразить все возможные айди котиков
// - GET (https://cats.petiteweb.dev/api/single/:user/show/:id) - отобразить конкретного котика
// - POST (https://cats.petiteweb.dev/api/single/:user/add) - добавить котика
// - PUT (https://cats.petiteweb.dev/api/single/:user/update/:id) - изменить информацию о котике
// - DELETE (https://cats.petiteweb.dev/api/single/:user/delete/:id)- удалить котика из базы данных

const configApi = {
    url: 'https://cats.petiteweb.dev/api/single/littlemeow',
    headers: {
        Accept: 'application/json',
        'Content-type': 'application/json',
    },
};

//_url - нижн слэш - это договоренность м-ду разрабами, что это внутр поле и эта переменная не буд исп-ся вне этого класса
class Api {
    constructor(config) {
        this._url = config.url;
        this._headers = config.headers;
    }

    _onResponse(response) {
        //объект типа response преобр в json
        //пример обраб-ки ошибок внутри .then
       return response.ok ? response.json(): Promise.reject({...response, message: 'error'});
    }

    // отобразить всех котиков
    getAllCats() {
        // чтобы прочитать fetch надо сделать return!!!!!!!!!!
    
        return fetch(`${this._url}/show`,{method: 'GET'
            }).then(this. _onResponse);
            //.then((response) => response.ok ? response.json(): Promise.reject({...response, message: 'error'})); убрали в ф-цию _onResponse()
            //.then(this. _onResponse); - это коротк запись вот этого: .then((response) => this. _onResponse(response)); с неск арг-ми это не раб
    }

    // отобразить все возможные айди котиков
    getAllCatIds() {
        return fetch(`${this._url}/ids`,{method: 'GET',}).then(this. _onResponse);
    }
    // отобразить конкретного котика
    getCatById(id) {
        return fetch(`${this._url}/show/${id}`,{method: 'GET',}).then(this. _onResponse);
    }
    // добавить котика
    addNewCat(body) {
        return fetch(`${this._url}/add`,{
            method: 'POST',
            headers: this._headers,
            //JSON.stringify({})=>{} to string
            body: JSON.stringify(body),
        }).then(this. _onResponse);
    }
    // изменить информацию о котике
    updateCatById(id, data) {
        return fetch(`${this._url}/update/${id}`,{
            method: 'PUT',
            headers: this._headers,
            body: JSON.stringify(data),
        }).then(this. _onResponse);
    }
    // удалить котика из базы данных
    deleteCatById(id) {
        return fetch(`${this._url}/delete/${id}`,{
            method: 'DELETE',
        }).then(this. _onResponse);
    }


};

const api1 = new Api(configApi);
//console.log(api1);

const newCat1 = {
    "id": 5029720,
    "name": "Dolly",
    "favorite": true,
    "rate": 6,
    "age": 3,
    "description": "Very cute",
    "image": "https://http.cat/100"
};
const Cat1Updated = {
    "id": 5029720,
    "name": "Dolly Jr.",
    "favorite": true,
    "rate": 8,
    "age": 1,
    "description": "cute kitten",
    "image": "https://http.cat/100"
};
// //api1.addNewCat(newCat1);
// api1.getAllCatIds();
// api1.updateCatById(Cat1Updated.id, Cat1Updated);
// api1.getAllCats();
// //api1.deleteCatById(newCat1.id);


