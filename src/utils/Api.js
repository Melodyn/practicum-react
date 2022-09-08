import { httpMethod } from './constants';

export class Api {
  constructor(config) {
    const {
      apiMestoBaseURL,
      apiMestoCohort,
      apiMestoToken,
    } = config;
    const baseHeaders = {
      Authorization: apiMestoToken,
      'Content-Type': 'application/json; charset=utf-8',
    };

    // обёртка над fetch
    this._fetch = (page, method = httpMethod.get, body = undefined) => fetch(
      `${apiMestoBaseURL}/${apiMestoCohort}/${page}`,
      {
        method,
        headers: baseHeaders,
        body: (body && JSON.stringify(body)),
      },
    )
      .then((res) => {
        if (res.ok) {
          return res.json();
        }

        return res
          .json()
          .then(({ message }) => {
            res.message = message || `Ошибка ${res.status}`;
            return Promise.reject(res);
          });
      });
  }

  /* profile */
  getProfile() {
    return this._fetch('users/me');
  }

  setInfo({ name, about }) {
    return this._fetch('users/me', httpMethod.patch, { name, about });
  }

  /* cards */
  getCards() {
    return this._fetch('cards');
  }
}
