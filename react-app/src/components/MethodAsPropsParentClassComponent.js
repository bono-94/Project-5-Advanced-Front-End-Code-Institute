import React, { Component } from "react";
import MethodAsPropsChildFunctionalComponent from "./MethodAsPropsChildFunctionalComponent";

class MethodAsPropsParentClassComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoggedIn: false,
    };
  }

  handleSignIn = () => {
    this.setState({
      isLoggedIn: true,
    });
    console.log(this);
  };

  handleSignOut = () => {
    this.setState({
      isLoggedIn: false,
    });
    console.log(this);
  };

  // single method that handles both SignIn and SignOut
  toggleIsLoggedIn = () => {
    this.setState((prevState) => ({
      isLoggedIn: !prevState.isLoggedIn,
    }));
  };

  render() {
    return (
      <div>
        <MethodAsPropsChildFunctionalComponent
          isLoggedIn={this.state.isLoggedIn}
          handleSignIn={this.handleSignIn}
          handleSignOut={this.handleSignOut}
        />
      </div>
    );
  }
}

export default MethodAsPropsParentClassComponent;
