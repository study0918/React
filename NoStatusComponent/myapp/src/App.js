import React, { Component ,PureComponent} from 'react';
import logo from './logo.svg';
import './App.css';

//书写一个无状态组件
class Temp extends PureComponent{
  render(){
    console.log("render Temp");
  return (
    <div>{this.props.val}</div>
  );
  }
}
class App extends Component {
  state={
    val:1
  }

  componentDidMount() {
    setInterval(() => {
      this.setState({
        val: 1
      })
    }, 2000)
  }

  // shouldComponentUpdate(nextProps, nextState) {
  //   console.log('nextState', nextState);
  //   console.log('current state', this.state);
  //   return (
  //     this.state.val === nextState.val ? false : true
  //   )
  // }
  render() {
    console.log("render App")
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
          <Temp val={this.state.val}/>
        </header>
      </div>
    );
  }
}

export default App;
