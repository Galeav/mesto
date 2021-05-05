//Функционал для попапа с изменением данных профиля
//Функционал для открытия/закрытия попапа
let openPopup = document.querySelector('.profile__edit-button');
let popupProfile = document.querySelector('.popup-profile');
let closePopup = document.querySelector('.popup__close');

function popupStatus(event) {
  popupProfile.classList.toggle('popup_opened');
  //Функционал заполняет поля для ввода данными из строк
  let popupOp = popupProfile.classList.contains('popup_opened');
  if (popupOp) {
    nameInput.value = profileName.textContent;
    jobInput.value = profileJob.textContent;
  }
}

//Переменные для изменения значения value у форм попапа
let formPopup = document.querySelector('.popup__edit-form');
let nameInput = document.getElementById('nameInput');
let jobInput = document.getElementById('proffInput');
let profileName = document.querySelector('.profile__title');
let profileJob = document.querySelector('.profile__subtitle');

//Функционал для изменения значения value у форм попапа
function formSubmitHandler(evt) {
  evt.preventDefault();

  profileName.textContent = nameInput.value;
  profileJob.textContent = jobInput.value;
  popupStatus();
}
formPopup.addEventListener('submit', formSubmitHandler);
openPopup.addEventListener('click', popupStatus);
closePopup.addEventListener('click', popupStatus);

//Функционал для попапа с добавлением картинок
let openPlacePopup = document.querySelector('.profile__add-button');
let popupPlace = document.querySelector('.popup-place');
let closePlacePopup = document.querySelector('.popup-place__close');

function popupPlaceStatus(event) {
  popupPlace.classList.toggle('popup_opened');
  paintLike(); //Функция отвечает за отклик лайка после добавления новых картинок
}

openPlacePopup.addEventListener('click', popupPlaceStatus);
closePlacePopup.addEventListener('click', popupPlaceStatus);

//функционал попапа с просмотром картинки

//функционал автоматической загрузки картинок в начале на страницу
const buttonAdd = document.getElementById('popupPlaceSubmitButton');   //Кнопка "создать" отправляет данные из формы с именем и ссылкой на картинку
const inputNamePlace = document.getElementById('namePlace');        //Поле вводе наименования картинки
const inputLinkPlace = document.getElementById('picLink');          //Поле ввода ссылки на картинку которая должна попасть в поле src в html
const elementsSection = document.querySelector('.elements');         //Добавление секции в дом элемент, которая будет заполняться карточками
const taskTemplate = document.getElementById('template');           //Шаблон карточки которая будет клонироваться

//Массив с изменяющимеся данными карточек
const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

for (let i = 0; i < initialCards.length; i += 1) {
  const namePlace = initialCards[i].name;
  const linkPlace = initialCards[i].link;

  const newTask = taskTemplate.content.querySelector('.elements__element').cloneNode('true');

  const nameElement = newTask.querySelector('.elements__foto-name');
  nameElement.textContent = namePlace;
  //функционал удаления
  const buttonDelete = newTask.querySelector('.elements__delete');

  buttonDelete.addEventListener('click', function(evt) {
    evt.target.closest('.elements__element').remove();
  });
  //
  const linkElement = newTask.querySelector('.elements__foto');
  linkElement.setAttribute('src', linkPlace);
  linkElement.setAttribute('alt', namePlace);

  elementsSection.append(newTask);

  //Функционал открытия и закрытия фотографии в попапе
  const buttonFotoView = newTask.querySelector('.elements__foto-view');
  const popupFoto = document.querySelector('.popup-foto');
  const buttonFotoClose = document.querySelector('.popup-foto__close');
  const foto = document.querySelector('.popup-foto__view');
  const nameFoto = document.querySelector('.popup-foto__name');

  buttonFotoView.addEventListener('click', function(evt) {
    popupFoto.classList.add('popup_opened');
    let sName = evt.target.closest('.elements__element').querySelector('.elements__foto-name').textContent;
    console.log(sName);
    let sLink = evt.target.closest('.elements__element').querySelector('.elements__foto').getAttribute('src');
    nameFoto.textContent = sName;
    foto.setAttribute('src', sLink);
  });

  buttonFotoClose.addEventListener('click', function() {
    popupFoto.classList.remove('popup_opened');
  });
}

buttonAdd.addEventListener('click', function() {
  const nameValue = inputNamePlace.value;
  const linkValue = inputLinkPlace.value;
  const newTask = taskTemplate.content.querySelector('.elements__element').cloneNode('true');

  const nameElement = newTask.querySelector('.elements__foto-name');
  nameElement.textContent = nameValue;
  //функционал удаления
  const buttonDelete = newTask.querySelector('.elements__delete');
  console.log(buttonDelete);
  buttonDelete.addEventListener('click', function(evt) {
    evt.target.closest('.elements__element').remove();
  });
  //
  const linkElement = newTask.querySelector('.elements__foto');
  linkElement.setAttribute('src', linkValue);
  linkElement.setAttribute('alt', nameValue);

  elementsSection.prepend(newTask);

  //Функционал открытия и закрытия фотографии в попапе
  const buttonFotoView = newTask.querySelector('.elements__foto-view');
  const popupFoto = document.querySelector('.popup-foto');
  const buttonFotoClose = document.querySelector('.popup-foto__close');
  const foto = document.querySelector('.popup-foto__view');
  const nameFoto = document.querySelector('.popup-foto__name');

  buttonFotoView.addEventListener('click', function(evt) {
    popupFoto.classList.add('popup_opened');
    let sName = evt.target.closest('.elements__element').querySelector('.elements__foto-name').textContent;
    console.log(sName);
    let sLink = evt.target.closest('.elements__element').querySelector('.elements__foto').getAttribute('src');
    nameFoto.textContent = sName;
    foto.setAttribute('src', sLink);
  });

  buttonFotoClose.addEventListener('click', function() {
    popupFoto.classList.remove('popup_opened');
  });
});

//Функционал работы кнопки добавления карточек
function addSubmitHandler(evt) {
  evt.preventDefault();
  popupPlaceStatus();
}

popupPlace.addEventListener('submit', addSubmitHandler);
//функционал изменения цвета лайка
function paintLike () {
const activeLike = document.querySelectorAll(".elements__like");
activeLike.forEach(function (evt) {
  evt.addEventListener("click", function () {
    evt.classList.toggle("elements__active-like");;
  });
});
}
paintLike();
