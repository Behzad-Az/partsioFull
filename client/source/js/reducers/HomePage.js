import { Map } from 'immutable';

import {
  HANDLE_CHANGE,
  SET_EMAIL_STATUS
} from 'actions/HomePage';

const initialState = Map({
  email: '',
  emailStatus: ''
});

const actionsMap = {
  [HANDLE_CHANGE]: (state, action) => {
    const { name, value } = action.event.target;
    let stateObj = {};
    stateObj[name] = value;
    return state.merge(Map(stateObj));
  },

  [SET_EMAIL_STATUS]: (state, action) => {
    return state.merge(Map({ emailStatus: action.emailStatus }));
  }
};

export default function reducer(state = initialState, action = {}) {
  const fn = actionsMap[action.type];
  return fn ? fn(state, action) : state;
}
