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
    constructor(dataCat, selectorTemplate) {
        this._data = dataCat;
        this._selectorTemplate = selectorTemplate;
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

    const cardDelete = this.element.querySelector('.card__delete');
    //console.log(">>>>",this._data);
    cardDelete.classList.add(`${this._data.id}`)
    

    //при отсутсвии задаем параметры по умолчанию
    cardTitle.textContent = this._data.name ?? 'Barsik';
    cardImage.src = this._data.image || 'https://www.friendforpet.ru/api/sites/default/files/2022-01/_DM34706.JPG';
    //обязательно вернуть, иначе карточка не создатьсяб будет undefined
    return this.element;
   }

}
//создание карточки кота №1 из массива cats
//const card = new Card (cats[0], '#card-template');

//card.getElement();

//console.log( {card} );
