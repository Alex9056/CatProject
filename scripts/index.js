//задаем контейнер для карточек - это секция с классом .cards
const cardsContainer = document.querySelector('.cards');


//---------------------ГЕНЕРАЦИЯ карточек с котами ИЗ МАССИВА с данными

//ф-ция createCat() в utils.js добавляет карточку с котом ч.з экз класса Card
cats.forEach(cat => {
    createCat (cat);
});
//---------------------------------------------------------------------------

// находим в html button добавить "+" по её id="add"
const btnOpenPopupForm = document.querySelector('#add');
//находим в html form для данных нового кота  по её id="popup-form-cat"
const formAddNewCat = document.querySelector('#popup-form-cat');
// проверяем, что нашли
//console.log(formAddNewCat);

//-------------------Реализовать открытие/закрытие модального окна с формой добавления кота
//всплывающее окно для кнопки "добавить +"

//у class .popup visibility:hidden;   у class .popup_active visibility:visible;
// то есть изначально попап скрыт, нужно по нажатию кнопки добавтить ему класс
// .popup_active, чтобы он стал visible; Для этого в popup.js создаем класс Popup:
// class Popup {} и т.д.
//задаем попап через класс Popup из popup.js
//добавить в index.html скрипт попап <script src='./scripts/popup.js'></script >
const popupForNewCat = new Popup('popup-add-cats');
//сразу после создания экземпляра попап вызываем метод setEventListener(кот мы прописали вручн в popup.js), так принято
popupForNewCat.setEventListener();
//появление попап по нажатию на кнопку + ( в addEventListener обязательно прописываем метод не как метод а как стрелочную ф-цию, это связано с потерей контекста, либо привязываем контекст жестко через .bind.this)
btnOpenPopupForm.addEventListener('click', () => popupForNewCat.open());
//console.log({ popupForNewCat });
// ------------------------------------------------------------------------------------------------------------------

//popup for update.cat
const popupEditCat = new Popup('popup-edit-cats');
popupEditCat.setEventListener();

//ф-ция, кот б. встав-ть данные из формы в темплэйт,кот-й мы создали раньше. данные по структуре им те же ключи,что и в объекты в массиве cats.js
function handleFormAddNewCat(event, isEdit) {
    // у события "submit" по умолч-ю перезагрузка и обновл стр-цы, отправка формы, нам это не нужно
    event.preventDefault();

    //update card in server
    if(isEdit) {
        const formCatElements = [...formEditCat.elements];
        const dataFromForm = serializeForm(formCatElements);
        api1.updateCatById(dataFromForm.id, dataFromForm);
        return popupEditCat.close();
    }

    //превратили элементы формы console.log(formAddNewCat.elements); в виде массива
    const formCatElements = [...formAddNewCat.elements];
    //console.log({formCatElements});
    //в dataFromForm попадает formData из ф-ции serializeForm()(в utils.js), в кот передали formAddNewCat.elements
    const dataFromForm = serializeForm(formCatElements);
    // -----API создать кота
    api1.addNewCat(dataFromForm);
    //ф-ция createCat() в utils.js добавляет карточку с котом ч/з экз класса Card в разметку html
    createCat (dataFromForm);
    //задаем закрытие формы после внесения данных и нажатия Добавить
    popupForNewCat.close();
};
const formEditCat = document.querySelector('#popup-form-edit');

function onclickToEdit(card, id) {
    console.log({ card, id })//проверяем,что врно приходят данные
}

// formAddCat.addEventListener('submit', ()=> {popupForNewCat.close()}); Форма д не зарыв-ся на сабмит, а делаем функцию
formAddNewCat.addEventListener('submit', handleFormAddNewCat);//isEdit = undefined
formEditCat.addEventListener('submit', (event) => handleFormAddNewCat (event, true)); //isEdit = true

// ---------------------------API--вывод котов--------------------------------------------------------------
//api возвращает промис,обраб-ли ч.з then в json в api.js
//.then -  вывод body из промиса из response.json() и кладем его в ф-цию createCat()
api1.getAllCats().then((data) => {
    data.forEach((cat, i) => {
        createCat(cat);
    })
});
