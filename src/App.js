import React from 'react';
import './App.css';
import Login from './login';
import Home from './home';
import Register from './register';
import TransactionHistory from './transhistory';
import {
  BrowserRouter,
  Switch,
  Link,
  Route
} from 'react-router-dom';
import Users from './users';
class App extends React.Component { // Class based component
  render() {
    return (
      <div className="App">
        <BrowserRouter>
          <div>
            {/* <Link to="/login">Login</Link> */}
            {/* <Link to="/home">Home</Link> */}
            {/* <Link to="/register">Register</Link> */}
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
              <a className="navbar-brand" href="#">SBK</a>
              <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
              </button>

              <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav mr-auto">
                  <li className="nav-item active">
                    <Link to='/' className="nav-link">Home<span className="sr-only">(current)</span></Link>
                  </li>
                  <li className="nav-item">
                    <Link to='login' className="nav-link">Login</Link>
                  </li>
                  <li className="nav-item">
                    <Link to='register' className="nav-link">Register</Link>
                  </li>
                  <li className="nav-item">
                    <Link to='users' className="nav-link">Users</Link>
                  </li>
                </ul>
              </div>
            </nav>
          </div>
          <Switch>
            <Route path="/transhistory">
              <TransactionHistory />
            </Route>
            <Route path="/home" exact={true}>
              <Home />
            </Route>
            <Route path="/register">
              <Register />
            </Route>
            <Route path="/login">
              <Login />
            </Route>
            <Route path="/users">
              <Users/>
            </Route>
          </Switch>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
