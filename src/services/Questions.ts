import { Url } from '../utils/Url';
import { removeSpaces } from '../utils/Utilities';
import { api } from './api';

export const askQuestions = question => {
  let q = removeSpaces(question.q);
  const url = `${Url.baseUrl}/recipes/quickAnswer?q=${q}`;
  const method = 'GET';
  const body = null;
  const isProtected = true;
  console.log(url);
  return api({ method, url, body, isProtected });
};
