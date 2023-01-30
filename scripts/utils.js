

function createCat(data) {
    //задаем основу новой карточки: data- массив с котами(н-р,cat.js); id=card-template - темплэйт для карточки
    //onclickToEdit - ф-ция для редактир карточки по клику, also at card.js at class Card
    const cardInstance = new Card (data, '#card-template', onclickToEdit);
    //применяем к основе карточки метод getElement(), чтобы задать обновленные данные для карточки
    const newCardElement = cardInstance.getElement();
    //добавляем карточку в конец котейнера для карточек
    cardsContainer.append(newCardElement);
}

//------------------------------------------------------------------------------------------------------------------------------
//сериализация данных(ф-ция,кот б.доставать value из html разметки формы, кот ввел пользов-ль)
function serializeForm(elements) {
    const formData = {};
    // //смотрим,что приходит в консоли, при заполнении формы и нажатии Добавить
    // console.log(elements);
   
    elements.forEach( (input) =>{
        //console.log(input.type);
        // console.log(input.name);
        //если инпут.тайп=сабмит(кнопка), то ничего не делать и выйти из итерации-> return пишем
        if(input.type === 'submit') return;
        //у checkbox нет .value, у него есть checked=true/faulse
        if (input.type !== 'checkbox') {
            //console.log('inp',input.value)
            // if(input.name === 'age') {formData.age = input.value}
            // if(input.name === 'name') {formData.name = input.value}
            // if(input.name === 'image') {formData.image = input.value}
            // if(input.name === 'description') {formData.description = input.value}
            formData[input.name] = input.value;//т.к. имена из cats.js совпадают с именами из данных form
            //То же что и (formData.age=input.value)
        }
        if (input.type === 'checkbox') {
            formData[input.name] = input.checked;
        }
    });
    //console.log({ formData });
    return formData;
    // возвращает данные в нужном нам виде:  {
    //     "name": "Базиль",
    //     "image": "https://www.friendforpet.ru/api/sites/default/files/2022-01/064AEBCB-45EC-4CE7-AB13-C65F10F00B7B.jpeg",
    //     "age": 2,
    //     "rate": 10,
    //     "favorite": false,
    //     "description": "Внимательный, активный и ласковый. Любит играть, катать мяч, и мурчать на пледе рядом с людьми! Прилично воспитан, приучен к лотку. Вакцинирован, имеет ветеринарный паспорт.",
    //     "id": 2
    // }
}
//----------------------------------------------------------------------------------------------------
 