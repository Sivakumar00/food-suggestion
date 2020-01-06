import { Keys } from '../utils/Keys';

export const api = ({ method, url, body, isProtected }) =>
  new Promise((resolve, reject) => {
    const payload = {
      method,
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      }
    };

    if (body !== null) {
      (payload as any).body = JSON.stringify(body);
    }
    if (Keys.API_KEY) {
      if (isProtected) {
        url = url + '&apiKey=' + Keys.API_KEY;
      }

      fetch(url, payload)
        .then(response => response.json())
        .then(response => {
          resolve(response);
        })
        .catch(error => reject(error));
    } else {
      console.log('API key not found');
    }
  });
