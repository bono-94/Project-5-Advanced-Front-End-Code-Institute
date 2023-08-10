import React from "react";

const FunctionalGreetingWithProps = (props) => {
  console.log(props);
  return <h1>Hello, {props.name}</h1>
};

export default FunctionalGreetingWithProps;
