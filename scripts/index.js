//Функционал для открытия/закрытия попапа
let openPopup = document.querySelector('.profile__edit-button');
let popup = document.querySelector('.popup');
let closePopup = document.querySelector('.popup__close');

function popupStatus(event) {
  popup.classList.toggle('popup_opened');
  //Функционал заполняет поля для ввода данными из строк
  let popupOp = popup.classList.contains('popup_opened');
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
