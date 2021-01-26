import { getDate } from '../utils/helpers';

export const mainApiConfig = {
  url: 'https://api.newsexp.students.nomoreparties.xyz/',
  headers: {
    'Content-Type': 'application/json;charset=utf-8',
  },
};

export const newsApiConfig = {
  url: 'https://nomoreparties.co/news/v2/everything/',
  pageSize: '100',
  apiKey: 'faac4bfd000a4ceaa26736259d382076',
  lang: 'ru',
  from: getDate('past'),
  to: getDate(),
};
