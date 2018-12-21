import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Level from './features/level/Level';
import Home from './features/home/Home';

export default () => {
  return (
    <Switch>
      <Route path="/levels/:levelId" component={Level} />
      <Route path="/" component={Home} />
    </Switch>
  );
};
