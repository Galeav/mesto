const profilePopupOpen = document.querySelector('.profile__edit-button');
const popupProfile = document.querySelector('.popup-profile');
const popupProfileClose = document.getElementById('popupProfileClose');
const buttonPhotoClose = document.getElementById('popupFotoClose');
const popupPhoto = document.querySelector('.popup-foto');
const popup = document.querySelectorAll('.popup')

//Переменные для изменения значения value у форм попапа
const formPopupProfile = document.getElementById('popupProfileEditForm');
const nameInput = document.getElementById('nameInput');
const jobInput = document.getElementById('proffInput');
const profileName = document.querySelector('.profile__title');
const profileJob = document.querySelector('.profile__subtitle');

//Функционал для попапа с добавлением картинок
const placePopupOpen = document.querySelector('.profile__add-button');
const popupPlace = document.querySelector('.popup-place');
const placePopupClose = document.getElementById('popupPlaceClose');

//переменные для функционала автоматической загрузки картинок в начале на страницу
const buttonAdd = document.getElementById('popupPlaceSubmitButton');   //Кнопка "создать" отправляет данные из формы с именем и ссылкой на картинку
const inputNamePlace = document.getElementById('namePlace');           //Поле вводе наименования картинки
const inputLinkPlace = document.getElementById('picLink');             //Поле ввода ссылки на картинку которая должна попасть в поле src в html
const elementsSection = document.querySelector('.elements');          //Добавление секции в дом элемент, которая будет заполняться карточками
const taskTemplate = document.getElementById('template');             //Шаблон карточки которая будет клонироваться

//Функционал для попапа с изменением данных профиля
//Функционал для открытия/закрытия попапа

//Функция закрывающая попап по клику на оверлей и снимающая слушатель
const closePopupClickOwer = (popup) => {
  popup.addEventListener('click', listenerClick);
  function listenerClick(event) {
    if (event.target === event.currentTarget) {
      closePopup(popup);
      popup.removeEventListener('click', listenerClick);
  }
  }
}
//Функция закрывающая попап по нажатию клавиши ESC и снимающая слушатель
const closePopupPressEsc = (popup) => {
  document.addEventListener('keydown', listenerPress);
  function listenerPress(evt) {
    if (evt.key === 'Escape') {
      closePopup(popup);
      document.removeEventListener('keydown', listenerPress);
    }
  };
}
function openPopup(popup) {
  popup.classList.add('popup_opened');

  closePopupClickOwer(popup);
  closePopupPressEsc(popup);
}

function closePopup(popup) {
  popup.classList.remove('popup_opened');
}

function openProfilePopup () {
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;
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
popupProfileClose.addEventListener('click', function() {
  closePopup(popupProfile);
});

function changePopupPlaceStatus() {
  openPopup(popupPlace);
}

placePopupOpen.addEventListener('click', changePopupPlaceStatus);
placePopupClose.addEventListener('click', function() {
  closePopup(popupPlace);
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

  buttonPhotoView.addEventListener('click', function(evt) {
    const sName = evt.target.closest('.elements__element').querySelector('.elements__foto-name').textContent;
    const sLink = evt.target.closest('.elements__element').querySelector('.elements__foto').getAttribute('src');
    namePhoto.textContent = sName;
    photo.setAttribute('src', sLink);
    photo.setAttribute('alt', sName);
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

  closePopup(popupPlace);
}

popupPlace.addEventListener('submit', addSubmitHandlerPlace);

//функционал загрузки базоваых карточек
for (let i = 0; i < initialCards.length; i += 1) {
  const namePlace = initialCards[i].name;
  const linkPlace = initialCards[i].link;
  const newCard = createCard(namePlace, linkPlace);
  elementsSection.append(newCard);
}
