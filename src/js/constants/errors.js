export const errorTexts = {
  empty: '',
  required: 'Это обязательное поле',
  patternMismatch: 'Неправильный формат',
  emilLength: 'Должно быть от 2 до 30 символов',
  passLength: 'Должно быть не менее 8 символов',
};

export const serverErrors = {
  en: {
    authErr: 'Invalid login or password',
    uniqueErr: 'This email already exists',
  },
  ru: {
    authErr: 'Неверный логин или пароль',
    uniqueErr: 'Этот email уже зарегистрирован',
  },
};

export const searchErrors = {
  badRequest: 'Ничего не найдено',
  serverError: 'Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз',
};
