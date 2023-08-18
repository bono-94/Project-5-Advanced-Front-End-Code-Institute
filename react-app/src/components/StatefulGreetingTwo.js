import React from "react";

class StatefulGreetingTwo extends React.Component {
  
  constructor(props) {
    super(props);
    this.state = {
      introduction: "Hello!",
      buttonText: "Exit",  
      count: 0,
    };
  }

  handleClick() {
    this.setState((prevState, prevProps) => {
      console.log('Previous State:', prevState)
      console.log('Previous Props:', prevProps)
      return {
        introduction: prevState.introduction === "Hello!" ? "Goodbye!" : "Hello!",
        buttonText: prevState.buttonText === "Exit" ? "Enter" : "Exit",
      }
    }, () => {
    console.log('new state', this.state.introduction);
    console.log('new state', this.state.buttonText);
    }
    );
    console.log(this.state.introduction);
    console.log(this.state.buttonText);
  }
  
  increment() {
    this.setState((prevState, prevProps) => {
      console.log('Previous State:', prevState)
      console.log('Previous Props:', prevProps)
      return {
        count: prevState.count +1
      }
    })
    console.log(this.state.count)
  }

  incrementFive() {
    this.increment()
    this.increment()
    this.increment()
    this.increment()
    this.increment()
  }

  render () {
    return(
      <div>
        <h1>
          {this.state.introduction} {this.props.greeting}
        </h1>
        <button onClick={() => this.handleClick()}>{this.state.buttonText}</button>

        <button onClick={() => this.incrementFive()}>Increment Five</button>
        <p>You've clicked {this.state.count} times.</p>
      </div>
    ) 
    // <h1>Hello {this.props.greeting}</h1>
  }
}

export default StatefulGreetingTwo;