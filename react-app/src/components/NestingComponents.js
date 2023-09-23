import React from 'react'
import UserMessage from './UserMessage'
import UserData from './UserData'


export class NestingComponents extends React.Component {
  
  constructor(props) {
    super(props)
  
    this.state = {
       isLoaded: true,
       isLoggedIn: true
    }
  }
  
  render() {
    return (
      <div>
        <h1>
          {this.state.isLoaded ? 'Data Loaded' : 'Loading...'}
        </h1>
        <UserData isLoaded={this.state.isLoaded} />
        <UserMessage isLoggedIn={this.state.isLoggedIn} />
      </div>
    )
  }
}

export default NestingComponents;