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

  getCards() {
    return this._fetch('cards');
  }

  // пример с передачей метода POST и body
  // createCard({ name, link }) {
  //   return this._fetch('cards', httpMethod.post, { name, link });
  // }
}
