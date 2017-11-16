import { Map } from 'immutable';

import {
  IP_GET_ITEM_INFO_START,
  IP_GET_ITEM_INFO_SUCCESS,
  IP_GET_ITEM_INFO_ERROR
} from 'actions/ItemPage';

const initialState = Map({
  asyncLoading: false,
  asyncError: null,
  dataLoaded: false,
  item: null
});

const actionsMap = {

  [IP_GET_ITEM_INFO_START]: (state, action) => {
    return state.merge(Map({
      asyncLoading: true,
      asyncError: null,
      dataLoaded: false,
      item: null
    }));
  },

  [IP_GET_ITEM_INFO_SUCCESS]: (state, action) => {
    return state.merge(Map({
      asyncLoading: false,
      asyncError: null,
      dataLoaded: true,
      item: action.data.item
    }));
  },

  [IP_GET_ITEM_INFO_ERROR]: (state, action) => {
    return state.merge(Map({
      asyncLoading: false,
      asyncError: action.error,
      dataLoaded: true,
      item: null
    }));
  }

};

export default function reducer(state = initialState, action = {}) {
  const fn = actionsMap[action.type];
  return fn ? fn(state, action) : state;
}
