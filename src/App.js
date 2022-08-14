import React from 'react';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Main from "./routes/Main";
import Search from './components/Nav/Search';
import Detail from './routes/Detail';
import Nav from './components/Nav/Nav';;


function App () {
  return (
    <Router>
      <Nav />
      <Switch>
        <Route path="/search" exact={true} component={Search}></Route>
        <Route path="/:title" exact={true} component={Detail}></Route>
        {/* <Route path="/rank" exact={true} component={RankKofic}></Route> */}
        <Route path="/" exact={true} component={Main}></Route>
      </Switch>
    </Router>
  );
};

export default App;
