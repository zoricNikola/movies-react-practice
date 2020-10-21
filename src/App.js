import React, { Component } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Movies from "./features/movies/movies";
import NotFound from "./components/notFound";
import NavBar from "./components/navBar";
import MovieForm from "./features/movies/movieForm";
import LoginForm from "./features/user/loginForm";
import RegisterForm from "./features/user/registerForm";
import Logout from "./features/user/logout";
import ProtectedRoute from "./components/common/protectedRoute";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";

class App extends Component {
  render() {
    return (
      <main className="container">
        <ToastContainer />
        <NavBar />
        <Switch>
          <Route path="/register" component={RegisterForm} />
          <Route path="/login" component={LoginForm} />
          <Route path="/logout" component={Logout} />
          <ProtectedRoute path="/movies/:id" component={MovieForm} />
          <Route path="/movies" render={(props) => <Movies {...props} />} />
          <Route path="/not-found" component={NotFound} />
          <Redirect from="/" exact to="/movies" />
          <Redirect to="/not-found" />
        </Switch>
      </main>
    );
  }
}

export default App;
