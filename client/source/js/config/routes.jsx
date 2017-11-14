import React from 'react';
import { Route, Switch } from 'react-router-dom';

import HomePage from 'views/HomePage';
import SearchPage from 'views/SearchPage';

const publicPath = '/';

export const routeCodes = {
  SEARCH: `${ publicPath }search`
};

export default () => (
  <Switch>
    <Route exact path={ publicPath } component={ HomePage } />
    <Route path={ routeCodes.SEARCH } component= { SearchPage } />
    <Route path='*' component={ HomePage } />
  </Switch>
);
