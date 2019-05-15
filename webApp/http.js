const port = '8080';
let baseUrl = `http://localhost:${port}/`;


export const HTTP = {
  get: (url) => {
    return fetch(`${baseUrl + url}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + window.sessionStorage.token,
        'Accept': 'application/json'
      }
    }).then(
      (res) => res.json()
    );
  },
  post: (url, body) => {
    return fetch(`${baseUrl + url}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + window.sessionStorage.token,
        'Accept': 'application/json'      },
      body: JSON.stringify(body)
    }).then(
      (res) => res.json()
    )
  },
  delete: (url) => {
    return fetch(`${baseUrl + url}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + window.sessionStorage.token,
        'Accept': 'application/json'      }
    }).then(
      (res) => res.json()
    )
  },
  put: (url, body) => {
    return fetch(`${baseUrl + url}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + window.sessionStorage.token,
        'Accept': 'application/json'      },
      body: JSON.stringify(body)
    }).then(
      (res) => res.json()
    )
  }
};