import React from 'react';
import { Route, Switch } from 'react-router-dom';

import HomePage from 'views/HomePage';

const publicPath = '/';

export const routeCodes = {
  ABOUT: `${ publicPath }about`
};

export default () => (
  <Switch>
    <Route exact path={ publicPath } component={ HomePage } />
    <Route path='*' component={ HomePage } />
  </Switch>
);
