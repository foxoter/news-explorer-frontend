import { serverErrors } from '../constants/errors';

export function errorsTranslator(error) {
  if (error === serverErrors.en.authErr) {
    return serverErrors.ru.authErr;
  } if (error === serverErrors.en.uniqueErr) {
    return serverErrors.ru.uniqueErr;
  }
  return error;
}
