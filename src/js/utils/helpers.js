import { serverErrors } from '../constants/errors';

export function errorsTranslator(error) {
  if (error === serverErrors.en.authErr) {
    return serverErrors.ru.authErr;
  } if (error === serverErrors.en.uniqueErr) {
    return serverErrors.ru.uniqueErr;
  }
  return error;
}

export function getDate(type = 'current') {
  const date = new Date();
  const year = date.getFullYear();
  const month = date.getMonth();
  const day = date.getDate();
  if (type === 'past') {
    return `${year}-${month + 1}-${day - 7}`;
  }
  return `${year}-${month + 1}-${day}`;
}

export function formatDate(date) {
  const monthsList = [
    'Января', 'Февраля', 'Марта',
    'Апреля', 'Мая', 'Июня',
    'Июля', 'Августа', 'Сентября',
    'Октября', 'Ноября', 'Декабря',
  ];
  const fullDate = date.split('T').slice(0, 1).join('');
  const dateArr = fullDate.split('-');
  const year = dateArr[0];
  const day = dateArr[2];
  const month = monthsList[dateArr[1].replace(/^0/, '') - 1];
  return `${day} ${month}, ${year}`;
}

export function sortKeyWords(array) {
  const counts = {};
  const arr = array.map((item) => item.toLowerCase());
  for (let i = 0; i < arr.length; i += 1) {
    const word = arr[i];
    if (!counts[word]) {
      counts[word] = 1;
    } else {
      counts[word] = counts[word] + 1;
    }
  }
  const sortable = Object.entries(counts);
  sortable.sort((a, b) => b[1] - a[1]);
  if (Object.keys(counts).length < 3) {
    return [...Object.keys(counts)];
  }
  const pop1 = sortable[0][0].slice(0, 1).toUpperCase() + sortable[0][0].slice(1);
  const pop2 = sortable[1][0].slice(0, 1).toUpperCase() + sortable[1][0].slice(1);
  return [pop1, pop2, Object.keys(counts).length - 2];
}
