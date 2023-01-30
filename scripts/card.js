// const card = document.querySelector('#tmp-card');
// const template = document.querySelector('#card-template').content;
// console.log({ card });
// console.log({ template });

/*template возвращает нам легковесную версию узла(нода)
есть узлы типа тег: div btn section footer p h3
есть узлы типа text : любой текст(Tom, Милые котики)
есть узлы типа element
*/

/*
const cats = [
    {
        "name": "Базиль",
        "image": "https://www.friendforpet.ru/api/sites/default/files/2022-01/064AEBCB-45EC-4CE7-AB13-C65F10F00B7B.jpeg",
        "age": 2,
        "rate": 10,
        "favorite": false,
        "description": "Внимательный, активный и ласковый. Любит играть, катать мяч, и мурчать на пледе рядом с людьми! Прилично воспитан, приучен к лотку. Вакцинирован, имеет ветеринарный паспорт.",
        "id": 2
    }
]
*/

//-------------Создание карточки через форму.--------------------


class Card {
    //конструктор класса
    constructor(dataCat, selectorTemplate, onclickToEdit) {
        this._data = dataCat;
        this._selectorTemplate = selectorTemplate;
        this.onclickToEdit = onclickToEdit;
    }

    //метод для получения шаблона из html в виде узла DOM
    //.content - этот метод только у template (template - это узел типа документ-фрагмент, это легковесная версия ноды типа элемент)
    _getTemplate() {
        //const elem = document.querySelector(this._selectorTemplate).content;//получили template из html
        //console.log(elem);//смотрим children,кот есть у template, затем div - class card у этого div
        return document.querySelector(this._selectorTemplate).content.querySelector('.card');//получили div, кот-й в template
        //console.log(elem);
    }
    //метод для задания самой карточки кота
   getElement() {
    this.element = this._getTemplate().cloneNode(true); //получаем div с классом card ч\з метод _getTemplate()------Но!!!!!!!!!!---надо клонировать, тк. объект и значит не новый, а ссылка, если без клонирования
    const cardTitle = this.element.querySelector('.card__name'); //получаем имя карточки с классом .card__name как div.querySelector('.card__name')
    //console.log(cardTitle); //проверяем, что точно получили имя карточки
    cardTitle.textContent = this._data.name;
    const cardImage = this.element.querySelector('.card__image');
    cardImage.src=this._data.image;
    //const cardLink = this.element.querySelector('.card__link);
    
    const cardLike = this.element.querySelector('.card__like');
    //если фэйворит-фолс, то убираем кнопку Лайк
    if(!this._data.favorite) {cardLike.remove()}

    //находим кнопку Удалить карточку
    const deleteCardBtn = this.element.querySelector('.card__delete');
    //добавляем id в html в button
    deleteCardBtn.setAttribute('id', this._data.id);
    //смотрим в консоли в elements добавился ли в html разметке значение id кота для каждой кнопки Удалить
    // console.log({ deleteCardBtn });
    // вешаем на кнопку Удалить слушатель событий сразу при инициализации
    //колбэк- это отложенное событие, оно происх после того, как кнопку нажали
    deleteCardBtn.addEventListener('click', (ev) => {
        ////смотрим в консоли, что при нажатии на кнопку Delete выводится правильн id
        //console.log(ev, '>>>', this._data.id);
            if(confirm('Удалить кота?')) {
                // если жмем кнопку Удалить, должно вызыв-ся api.delete()
                api1.deleteCatById(this._data.id).then(() => {
                    const elem = document.getElementById(this._data.id);
                    //удаление карточки
                    elem.parentElement.remove();
                });

            }
  
    });
    //редактир-е карточки по нажатию на .card__link с заголовком
    const cardLink = this.element.querySelector('.card__link');



    //при отсутсвии задаем параметры по умолчанию
    cardTitle.textContent = this._data.name ?? 'Barsik';
    cardImage.src = this._data.image || 'https://www.friendforpet.ru/api/sites/default/files/2022-01/_DM34706.JPG';

    cardLink.addEventListener('click', ()=> 
        //console.log('data.id', this._data.id);//проверили, что приходят верные id
        this.onclickToEdit(this.element, this._data.id)
    );

    //обязательно вернуть, иначе карточка не создаться  и будет undefined
    return this.element;
   }

}
//создание карточки кота №1 из массива cats
//const card = new Card (cats[0], '#card-template');
//card.getElement();
//console.log( {card} );
