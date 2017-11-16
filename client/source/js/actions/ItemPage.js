import api from 'api/ItemPage';

export const IP_GET_ITEM_INFO_START = 'IP_GET_ITEM_INFO_START';
export const IP_GET_ITEM_INFO_SUCCESS = 'IP_GET_ITEM_INFO_SUCCESS';
export const IP_GET_ITEM_INFO_ERROR = 'IP_GET_ITEM_INFO_ERROR';

function ipGetItemInfoStart() {
  return {
    type: IP_GET_ITEM_INFO_START,
  };
}

function ipGetItemInfoSuccess(data) {
  return {
    type: IP_GET_ITEM_INFO_SUCCESS,
    data,
  };
}

function ipGetItemInfoError(error) {
  return {
    type: IP_GET_ITEM_INFO_ERROR,
    error,
  };
}

export function ipGetItemInfo(id) {
  return function (dispatch) {
    dispatch(ipGetItemInfoStart());

    api.ipGetItemInfo(id)
      .then(data => dispatch(ipGetItemInfoSuccess(data)))
      .catch(error => dispatch(ipGetItemInfoError(error)));
  };
}
