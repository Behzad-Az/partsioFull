import { Map } from 'immutable';

import {
  HP_HANDLE_CHANGE,
  HP_SET_EMAIL_STATUS
} from 'actions/HomePage';

const initialState = Map({
  email: '',
  emailStatus: ''
});

const actionsMap = {
  [HP_HANDLE_CHANGE]: (state, action) => {
    const { name, value } = action.event.target;
    let stateObj = {};
    stateObj[name] = value;
    return state.merge(Map(stateObj));
  },

  [HP_SET_EMAIL_STATUS]: (state, action) => {
    return state.merge(Map({ emailStatus: action.emailStatus }));
  }
};

export default function reducer(state = initialState, action = {}) {
  const fn = actionsMap[action.type];
  return fn ? fn(state, action) : state;
}
