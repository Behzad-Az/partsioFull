import { Map } from 'immutable';

import {
  SP_HANDLE_CHANGE,
  SP_CONCAT_RESULTS
} from 'actions/SearchPage';

const initialState = Map({
  searchText: '',
  prevSearchText: '',
  searchResults: [],
  noMoreResult: false
});

const actionsMap = {
  [SP_HANDLE_CHANGE]: (state, action) => {
    const { name, value } = action.event.target;
    let stateObj = {};
    stateObj[name] = value;
    return state.merge(Map(stateObj));
  },
  [SP_CONCAT_RESULTS]: (state, action) => {
    let { newResults, freshReload } = action.resJSON;
    if (!freshReload) {
      const prevIds = state.get('searchResults').map(result => result._id);
      newResults = newResults.filter(result => !prevIds.includes(result._id));
    }
    return state.merge(Map({
      searchResults: freshReload ? newResults : state.get('searchResults').concat(newResults),
      prevSearchText: state.get('searchText'),
      noMoreResult: !newResults.length
    }));
  }
};

export default function reducer(state = initialState, action = {}) {
  const fn = actionsMap[action.type];
  return fn ? fn(state, action) : state;
}
