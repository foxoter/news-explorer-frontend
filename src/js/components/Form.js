export default class Form {
  constructor(form, errors) {
    this.form = form;
    this.inputs = this.form.querySelectorAll('input');
    this.button = this.form.querySelector('button');
    this.serverError = this.form.querySelector('.popup__error_type-server');
    this.errorTexts = errors;
    this.setServerError = this.setServerError.bind(this);
    this._inputHandler = this._inputHandler.bind(this);
    this._validateInputElement = this._validateInputElement.bind(this);
    this._setSubmitButtonState = this._setSubmitButtonState.bind(this);
    this._setEventListeners();
  }

  setServerError(errorText) {
    this.serverError.textContent = errorText;
    setTimeout(() => {
      this.serverError.textContent = '';
    }, 3000);
  }

  _validateInputElement(inputElement) {
    const errorElement = this.form.querySelector(`#${inputElement.id}-error`);
    inputElement.setCustomValidity(this.errorTexts.empty);
    if (inputElement.validity.valueMissing) {
      inputElement.setCustomValidity(this.errorTexts.required);
    } else if (inputElement.validity.patternMismatch) {
      inputElement.setCustomValidity(this.errorTexts.patternMismatch);
    } else if (inputElement.validity.tooShort && inputElement.id.includes('password')) {
      inputElement.setCustomValidity(this.errorTexts.passLength);
    } else if (inputElement.validity.tooShort || inputElement.validity.tooLong) {
      inputElement.setCustomValidity(this.errorTexts.emilLength);
    }
    errorElement.textContent = inputElement.validationMessage;
  }

  _inputHandler(event) {
    this._validateInputElement(event.target);
  }

  _setSubmitButtonState() {
    const buttonState = Array.from(this.inputs).every((item) => item.validity.valid);
    if (buttonState) {
      this.button.removeAttribute('disabled');
    } else {
      this.button.setAttribute('disabled', 'disabled');
    }
  }

  reset() {
    const errors = this.form.querySelectorAll('.popup__error');
    this.form.reset();
    errors.forEach((item) => {
      item.textContent = '';
    });
    this._setSubmitButtonState();
  }

  _setEventListeners() {
    this.form.addEventListener('input', this._inputHandler);
    this.form.addEventListener('input', this._setSubmitButtonState);
  }
}
