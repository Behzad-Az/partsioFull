import { combineReducers } from 'redux';
import homePage from 'reducers/HomePage';
import searchPage from 'reducers/SearchPage';

export default combineReducers({
  homePage,
  searchPage
});
