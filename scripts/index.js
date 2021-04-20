//Функционал для открытия/закрытия попапа
let openPopup = document.querySelector('.profile__edit-button');
let popup = document.querySelector('.popup');
let closePopup = document.querySelector('.popup__close');

function popup_status(event) {
  popup.classList.toggle('popup_opened');
}
openPopup.addEventListener('click', popup_status);
closePopup.addEventListener('click', popup_status);

//Переменные для изменения значения value у форм попапа
let formPopup = document.querySelector('.popup__edit-form');
let nameInput = document.getElementById('nameInput');
let jobInput = document.getElementById('proffInput');
let jobValue = '';
let nameValue = '';
let profileName = document.querySelector('.profile__title');
let profileJob = document.querySelector('.profile__subtitle');

//Функционал заполняет поля для ввода данными из строк
nameInput.setAttribute('value', profileName.textContent);
jobInput.setAttribute('value',  profileJob.textContent);

//Функционал для изменения значения value у форм попапа
function formSubmitHandler(evt) {
  evt.preventDefault();

  jobValue = jobInput.value;
  nameValue = nameInput.value;
  profileName.textContent = nameValue;
  profileJob.textContent = jobValue;
  popup_status();
}
formPopup.addEventListener('submit', formSubmitHandler);
