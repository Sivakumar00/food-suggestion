import { Url } from '../utils/Url';
import { removeSpaces } from '../utils/Utilities';
import { api } from './api';

export const getAutoCompleteIngredients = query => {
  /**
   * Get Auto complete Ingredients
   *
   */
  const url = `${Url.baseUrl}/food/ingredients/autocomplete?query=${removeSpaces(query)}&number=5`;
  const method = 'GET';
  const body = null;
  const isProtected = true;
  return api({ method, url, body, isProtected });
};
