import React, { Component } from "react";
import { useSelector, connect } from "react-redux";
import auth from "../../services/authService";
import { logoutUser } from "./userSlice";

const mapDispatchToProps = (dispatch) => {
  return {
    logoutUser: () => {
      dispatch(logoutUser());
    },
  };
};

class Logout extends Component {
  componentDidMount() {
    this.props.logoutUser();
    window.location = "/";
  }
  render() {
    return null;
  }
}

export default connect(null, mapDispatchToProps)(Logout);
