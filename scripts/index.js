const profilePopupOpen = document.querySelector('.profile__edit-button');
const popupProfile = document.querySelector('.popup-profile');
const buttonPhotoClose = document.getElementById('popupFotoClose');
const popupPhoto = document.querySelector('.popup-foto');
const popup = document.querySelectorAll('.popup');

//Переменные для изменения значения value у форм попапа
const formPopupProfile = document.getElementById('popupProfileEditForm');
const formPopupPlace = document.getElementById('popupAddPlaceForm');
const nameInput = document.getElementById('nameInput');
const jobInput = document.getElementById('proffInput');
const profileName = document.querySelector('.profile__title');
const profileJob = document.querySelector('.profile__subtitle');

//Функционал для попапа с добавлением картинок
const placePopupOpen = document.querySelector('.profile__add-button');
const popupPlace = document.querySelector('.popup-place');

//переменные для функционала автоматической загрузки картинок в начале на страницу
const buttonAdd = document.getElementById('popupPlaceSubmitButton');   //Кнопка "создать" отправляет данные из формы с именем и ссылкой на картинку
const inputNamePlace = document.getElementById('namePlace');           //Поле вводе наименования картинки
const inputLinkPlace = document.getElementById('picLink');             //Поле ввода ссылки на картинку которая должна попасть в поле src в html
const elementsSection = document.querySelector('.elements');          //Добавление секции в дом элемент, которая будет заполняться карточками
const taskTemplate = document.getElementById('template');             //Шаблон карточки которая будет клонироваться

//Функционал для попапа с изменением данных профиля
//Функционал для открытия/закрытия попапа

//Функция закрывающая попап по клику на оверлей и снимающая слушатель
const closePopupTarget = (evt) => {
  const popupOpened = document.querySelector('.popup_opened');
  if (evt.target.classList.contains('popup') || evt.target.classList.contains('popup__close')) {
    closePopup(popupOpened);
  }
}
//Функция закрывающая попап по нажатию клавиши ESC
const closePopupPressEsc = (evt) => {
  const popupOpened = document.querySelector('.popup_opened');
  if (evt.key === 'Escape') {
    closePopup(popupOpened);
  }
}

function openPopup(popup) {
  popup.classList.add('popup_opened');

  //Закрытие попапа по нажатию на Esc
  document.addEventListener('keydown', closePopupPressEsc);

  //Функция со слушателем для закрытия попапа на крестик и оверлей
  document.addEventListener('click', closePopupTarget);
}

function closePopup(popup) {
  popup.classList.remove('popup_opened');

  //Удаляем слушатель закрытия попапа на клавишу Esc
  document.removeEventListener('keydown', closePopupPressEsc);
  document.removeEventListener('click', closePopupTarget);
}

function openProfilePopup () {
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;

  //Функционал сброса ошибки валидации
  const inputProfilePopup = formPopupProfile.querySelectorAll('.popup__input-field');
  inputProfilePopup.forEach((inputElement) => {
    inputElement.classList.remove('popup__input-field_status_error');
    const errorElement = formPopupProfile.querySelector(`#${inputElement.id}-warning`);
    errorElement.textContent = '';
  });

  openPopup(popupProfile);
}

//Функционал для изменения значения текста в профиле
function changesProfileData(evt) {
  evt.preventDefault();

  profileName.textContent = nameInput.value;
  profileJob.textContent = jobInput.value;
  closePopup(popupProfile);
}

formPopupProfile.addEventListener('submit', changesProfileData);
profilePopupOpen.addEventListener('click', openProfilePopup);

placePopupOpen.addEventListener('click', () => {
  popupPlace.querySelector('.popup__edit-form').reset();

  //Функционал сброса ошибки валидации
  const inputPlacePopup = formPopupPlace.querySelectorAll('.popup__input-field');
  inputPlacePopup.forEach((inputElement) => {
    inputElement.classList.remove('popup__input-field_status_error');
    const errorElement = formPopupPlace.querySelector(`#${inputElement.id}-warning`);
    errorElement.textContent = '';
  });

  buttonAdd.disabled = true;                                      //Добавлено блокирование кнопки при открытии, чтобы избежать обхода её блокировки,
  buttonAdd.classList.add('popup__submit-button_invalid');       //при комбинации ввода валидных значений, закрытие формы и её повторного открытия
  openPopup(popupPlace);
});

function createCard(nameCard, linkCard) {
  const newTask = taskTemplate.content.querySelector('.elements__element').cloneNode('true');
  const nameElement = newTask.querySelector('.elements__foto-name');
  const linkElement = newTask.querySelector('.elements__foto');
  //функционал удаления
    const buttonDelete = newTask.querySelector('.elements__delete');
  buttonDelete.addEventListener('click', function(evt) {
    evt.target.closest('.elements__element').remove();
  });
  //
  //функционал лайка
  const activeLike = newTask.querySelector(".elements__like");
  activeLike.addEventListener("click", function (evt) {
    evt.target.closest('.elements__element').querySelector('.elements__like').classList.toggle("elements__active-like");
  });
  //
  nameElement.textContent = nameCard;

  linkElement.setAttribute('src', linkCard);
  linkElement.setAttribute('alt', nameCard);

  //Функционал открытия и закрытия фотографии в попапе
  const buttonPhotoView = newTask.querySelector('.elements__foto-view');
  const photo = document.querySelector('.popup-foto__view');
  const namePhoto = document.querySelector('.popup-foto__name');

  buttonPhotoView.addEventListener('click', function() {
    namePhoto.textContent = nameCard;
    photo.setAttribute('src', linkCard);
    photo.setAttribute('alt', nameCard);
    openPopup(popupPhoto);
  });

  return newTask;
}

buttonPhotoClose.addEventListener('click', function() {
  closePopup(popupPhoto);
});

//Функционал работы кнопки с добавлением карточек
function addSubmitHandlerPlace(evt) {
  evt.preventDefault();
  const nameValue = inputNamePlace.value;
  const linkValue = inputLinkPlace.value;

  const newCard = createCard(nameValue, linkValue);
  elementsSection.prepend(newCard);
  buttonAdd.disabled = true;
  closePopup(popupPlace);
}

popupPlace.addEventListener('submit', addSubmitHandlerPlace);

//функционал загрузки базоваых карточек
initialCards.forEach((card) => {
  elementsSection.append(createCard(card.name, card.link))
});
