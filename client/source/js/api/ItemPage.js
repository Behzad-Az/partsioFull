import promisePolyfill from 'es6-promise';
import 'isomorphic-fetch';

promisePolyfill.polyfill();

function ipGetItemInfo(id) {
  return fetch(`/api/item?id=${id}`, {
    method: 'GET',
    credentials: 'same-origin'
  })
  .then(response => response.json());
}

export default {
  ipGetItemInfo
};
