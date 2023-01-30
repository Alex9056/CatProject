
// задаем export,чтобы можно было импорт-ть popup.js в index.js для модульной подгрузки скриптов(type='module')
class Popup {
    constructor(className) {
        this._className = className;
        // popup один, поэтому его просто находим и не клонируем. клонировать надо карточки в классе,т.к. их много 
        this.popup = document.querySelector(`.${className}`);
    }
    // закрывает форму при нажатии на escape
    _handleEscUp(evt) {
        if (evt.key === 'Escape') {
        this.close();
        }
    }

    // метод, который открывает форму (метод добавляет в класслист class='popup_active' с visible)
    open() {
        this.popup.classList.add('popup_active');
        document.addEventListener('keyup', this._handleEscUp);
    }

    // метод, который закрывает форму(убирает class='popup_active')
    close() {
        this.popup.classList.remove('popup_active');
        document.removeEventListener('keyup', this._handleEscUp);
    }
  // // метод, который слушает событие click и закрывает форму по условию
    setEventListener () {
        //ловим событие при клике и смотрим в консоли target -> classList
        //
        //this.popup.addEventListener('click', (event) => console.log(event));
        this.popup.addEventListener('click', 
        //arrow func
        //если то,на что кликаем содерж класс "popup-add-cats"('это див для попап, котрый перекрывает страницу), то возьми и закройся.
        //сам попап лежит в див class=popup__container (form с #popup-form-cat и button с .popup__close)
        //или то, на что клик , им. ближайш родителя с классом .popup__close(кнопку закрыть)
        (event) => {
            if(event.target.classList.contains(this._className)||event.target.closest('.popup__close')) this.close();
            
        }
        )

    }

    setContent(content, id) {
        // const cardImage = content.querySelector('.card__image').src;
        // const cardLink = content.querySelector('.card__link').textContent;
        // const elements = [...document.querySelector('#popup-form-edit').elements];
        // elements.forEach((input) => {
        //     if(input.name === 'id') {
        //         input.value = id;
        //         return (input.disabled = true);
        //     }
        //     if (input.type !== 'checkbox') input.value = '222';
        //     if (input.type === 'checkbox') input.checked = true; 
        // });
        // this.data = content;
    }

}
