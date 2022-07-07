import React from 'react';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "./routes/Home";
import Search from "./routes/Search";
import Detail from './routes/Detail';

function App () {
  return (
    <Router>
      <Switch>
        <Route path="/search">
          <Search />
        </Route>
        <Route path="/movie">
          <Detail />
        </Route>
        <Route path="/">
          <Home />
        </Route>
      </Switch>
      {/* <Switch>
        <Route path="/" exact={true} component={Home}></Route>
        <Route path="/search" exact={true} component={Search}></Route>
        <Route path="/detail" exact={true} component={Detail}></Route>
      </Switch> */}
    </Router>
  );
};

export default App;
