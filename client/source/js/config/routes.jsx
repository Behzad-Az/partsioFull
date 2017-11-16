import React from 'react';
import { Route, Switch } from 'react-router-dom';

import HomePage from 'views/HomePage';
import SearchPage from 'views/SearchPage';
import ItemPage from 'views/ItemPage';

const publicPath = '/';

export const routeCodes = {
  SEARCH: `${ publicPath }search`,
  ITEM: `${publicPath}item`
};

export default () => (
  <Switch>
    <Route exact path={ publicPath } component={ HomePage } />
    <Route path={ routeCodes.SEARCH } component={ SearchPage } />
    <Route path={ routeCodes.ITEM } component={ ItemPage } />
    <Route path='*' component={ HomePage } />
  </Switch>
);
