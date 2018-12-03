import React, { Component ,PureComponent,Fragment} from 'react';
import logo from './logo.svg';
import './App.css';
import PropTypes from 'prop-types';

//书写一个无状态组件
class Temp extends PureComponent{
  render(){
    console.log("render Temp");
  return (
    <div>{this.props.val}</div>
  );
  }
}

const Item =(props)=>{
  return (
    <Fragment>
      <li>list1</li>
      <li>list2</li>
    </Fragment>
  )
}

const Topic=(props)=>{
  return (
    <div>
      <Comment/>
    </div>
  )
}
const Comment=(props,context)=>{
  console.log(props);
  console.log(context);
  return (
    <div>{context.color}</div>
  )
}

Comment.contextTypes={
  color:PropTypes.string
}
class App extends Component {
  //定义传递内容是一个对象，内容为color:red
  getChildContext(props){
    return {color:"red"};
  }
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
    console.log("render App");
    console.log(this);
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
        <ul className="App">
            <Item/>
        </ul>
        <Topic/>
      </div>
    );
  }
}
App.childContextTypes={
  color:PropTypes.string,
}
export default App;
