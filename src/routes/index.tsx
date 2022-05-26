import { Switch, Route } from 'react-router-dom';

import { DashboardPage } from '../pages/Dashboard';

const Routes = () => (
  <Switch>
    <Route path="/" exact component={DashboardPage} />
  </Switch>
);

export default Routes;
