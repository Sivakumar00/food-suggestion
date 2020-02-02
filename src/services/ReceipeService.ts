import { Url } from '../utils/Url';
import { removeSpaces } from '../utils/Utilities';
import { api } from './api';

export const getFoodSuggestion = query => {
  /**
   * Get food recipe by ingredients
   */
  const url = `${Url.baseUrl}/recipes/findByIngredients?ingredients=${removeSpaces(query)}&number=10`;
  const method = 'GET';
  const body = null;
  const isProtected = true;
  return api({ method, url, body, isProtected });
};

export const getRecipeInstruction = id => {
  /**
   * Get recipe instruction by id
   */
  const url = `${Url.baseUrl}/recipes/informationBulk?ids=${id}`;
  const method = 'GET';
  const body = null;
  const isProtected = true;
  return api({ method, url, body, isProtected });
};

export const getRecipeByQuery = query => {
  /**
   * Get food recipe
   */
  const url = `${Url.baseUrl}/recipes/search?query=${removeSpaces(query)}`;
  const method = 'GET';
  const body = null;
  const isProtected = true;
  return api({ method, url, body, isProtected });
};

export const getVideos = query => {
  /**
   * Get food recipe
   */
  const url = `${Url.baseUrl}/food/videos/search?query=${removeSpaces(query)}`;
  const method = 'GET';
  const body = null;
  const isProtected = true;
  return api({ method, url, body, isProtected });
};
