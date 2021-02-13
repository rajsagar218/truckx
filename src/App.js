import React from "react"
import {BrowserRouter as Router, Switch, Route} from "react-router-dom";
import Users from './Users.jsx'
import Login from './Login.jsx'
import Home from "./Home.jsx";
import CreateUser from "./CreateUser.jsx";

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Home} /> 
        <Route exact path="/users" component={Users} /> 
        <Route exact path="/user/create" component={CreateUser} /> 
        <Route exact path="/login" component={Login} /> 
      </Switch>
    </Router>
  );
}

export default App;
