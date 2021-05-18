//Скрываем ошибку
const hideInpurError = (formElement, inputElement) => {
  const warningElement = formElement.querySelector(`#${inputElement.id}-warning`);
  inputElement.classList.remove('popup__input-field_status_error');
  warningElement.textContent = '';
}

//Показываем ошибку
const showInputError = (formElement, inputElement) => {
  const warningElement = formElement.querySelector(`#${inputElement.id}-warning`);
  inputElement.classList.add('popup__input-field_status_error');
  warningElement.textContent = inputElement.validationMessage;
}

const hazInvalidInput = (inputList) => {
  return inputList.some(inputElement => !inputElement.validity.valid);
}

//Функция отвещающая за включение и отключение кнопки
const toggleButtonState = (buttonElement, inputList) => {
  if (hazInvalidInput(inputList)) {
    buttonElement.disabled = true;
    buttonElement.classList.add('popup__submit-button_invalid');
  } else {
    buttonElement.disabled = false;
    buttonElement.classList.remove('popup__submit-button_invalid');
  }
}

//Функция проверки поля на валидность и вызов функций последующих действий
const controlInputValidity = (formElement, inputElement) => {

  if (inputElement.validity.valid) {
    hideInpurError(formElement, inputElement);
  } else {
    showInputError(formElement, inputElement);
  }
}

//Функция находит все поля ввода конкретной формы и навешивает им слушатели
const setEventListeners = (formElement) => {
  const inputList = Array.from(formElement.querySelectorAll('.popup__input-field'));

  const buttonElement = formElement.querySelector('.popup__submit-button');

  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', () => {
      //Проверяем валидность вводимых значений
      controlInputValidity(formElement, inputElement);
      toggleButtonState(buttonElement, inputList);
    });
  });
  toggleButtonState(buttonElement, inputList);
}

//Функция находит все формы на странице и перебирает их по отдельности
const enableValidation = () => {
  const formList = Array.from(document.querySelectorAll('.popup__edit-form'));

  formList.forEach((formElement) => {
    setEventListeners(formElement);
  });
}
enableValidation();
