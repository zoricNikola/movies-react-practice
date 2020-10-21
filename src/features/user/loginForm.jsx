import React from "react";
import { useSelector, connect } from "react-redux";
import { Redirect } from "react-router-dom";
import Joi from "joi-browser";
import Form from "./../../components/common/form";
import auth from "../../services/authService";
import { loginUser, clearUserError } from "./userSlice";

const mapDispatchToProps = (dispatch) => {
  return {
    loginUser: (username, password) => {
      dispatch(loginUser(username, password));
    },
    clearUserError: () => {
      dispatch(clearUserError());
    },
  };
};

const mapStateToProps = (state) => ({
  status: state.user.status,
  error: state.user.error,
  jwt: state.user.jwt,
});

class LoginForm extends Form {
  state = {
    data: { username: "", password: "" },
    errors: {},
  };

  componentWillUnmount() {
    this.props.clearUserError();
  }

  schema = {
    username: Joi.string().required().label("Username"),
    password: Joi.string().required().label("Password"),
  };

  doSubmit = async () => {
    // try {
    //   const { data } = this.state;
    //   await auth.login(data.username, data.password);

    //   const { state } = this.props.location;
    //   window.location = state ? state.from.pathname : "/";
    // } catch (ex) {
    //   if (ex.response && ex.response.status === 400) {
    //     const errors = { ...this.state.errors };
    //     errors.username = ex.response.data;
    //     this.setState({ errors });
    //   }
    // }
    this.props.loginUser(this.state.data);
  };

  render() {
    if (this.props.jwt) {
      // const { state } = this.props.location;
      // window.location = state ? state.from.pathname : "/";
      this.props.history.push("/");
    } else if (
      this.props.error &&
      !(this.props.error === this.state.errors.username)
    ) {
      const errors = { ...this.state.errors };
      errors.username = this.props.error;
      this.setState({ errors });
    }
    // if (auth.getCurrentUser()) return <Redirect to="/" />;
    return (
      <div>
        <h1>Login</h1>
        <form onSubmit={this.handleSubmit}>
          {this.renderInput("username", "Username")}
          {this.renderInput("password", "Password", "password")}
          {this.renderButton("Login")}
        </form>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginForm);
