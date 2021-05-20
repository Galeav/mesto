//Скрываем ошибку
const hideInputError = (formElement, inputElement, config) => {
  const warningElement = formElement.querySelector(`#${inputElement.id}-warning`);
  inputElement.classList.remove(config.inputErrorClass);
  warningElement.textContent = '';
}

//Показываем ошибку
const showInputError = (formElement, inputElement, config) => {
  const warningElement = formElement.querySelector(`#${inputElement.id}-warning`);
  inputElement.classList.add(config.inputErrorClass);
  warningElement.textContent = inputElement.validationMessage;
}

const hazInvalidInput = (inputList) => {
  return inputList.some(inputElement => !inputElement.validity.valid);
}

//Функция отвещающая за включение и отключение кнопки
const toggleButtonState = (buttonElement, inputList, config) => {
  if (hazInvalidInput(inputList)) {
    buttonElement.disabled = true;
    buttonElement.classList.add(config.inactiveButtonClass);
  } else {
    buttonElement.disabled = false;
    buttonElement.classList.remove(config.inactiveButtonClass);
  }
}

//Функция проверки поля на валидность и вызов функций последующих действий
const controlInputValidity = (formElement, inputElement, config) => {

  if (inputElement.validity.valid) {
    hideInputError(formElement, inputElement, config);
  } else {
    showInputError(formElement, inputElement, config);
  }
}

//Функция находит все поля ввода конкретной формы и навешивает им слушатели
const setEventListeners = (formElement, config) => {
  const inputList = Array.from(formElement.querySelectorAll(config.inputSelector));

  const buttonElement = formElement.querySelector(config.submitButtonSelector);

  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', () => {
      //Проверяем валидность вводимых значений
      controlInputValidity(formElement, inputElement, config);
      toggleButtonState(buttonElement, inputList, config);
    });
  });
  toggleButtonState(buttonElement, inputList, config);
}

//Функция находит все формы на странице и перебирает их по отдельности
const enableValidation = (config) => {
  const formList = Array.from(document.querySelectorAll(config.formSelector));

  formList.forEach((formElement) => {
    setEventListeners(formElement, config);
  });
}

enableValidation({
  formSelector: '.popup__edit-form',
  inputSelector: '.popup__input-field',
  submitButtonSelector: '.popup__submit-button',
  inactiveButtonClass: 'popup__submit-button_invalid',
  inputErrorClass: 'popup__input-field_status_error'
});

