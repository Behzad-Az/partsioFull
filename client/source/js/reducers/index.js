import { combineReducers } from 'redux';
import homePage from 'reducers/HomePage';
import searchPage from 'reducers/SearchPage';
import itemPage from 'reducers/ItemPage';

export default combineReducers({
  homePage,
  searchPage,
  itemPage
});
