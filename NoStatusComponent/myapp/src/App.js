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

const Hello=(props)=>{
  return (
    <p>{props.name}</p>
  )
}

/**
 * 高阶函数:
 * 1.高阶函数是函数
 * 2.高阶函数的参数是一个组件
 * 3.高阶函数的返回值是一个包裹后的组件
 */
const PropsLogger=(WrapperComponent)=>{
  return class extends Component{
    //既然返回的是组件，组件都有render方法
    render(){
      return <WrapperComponent {...this.props}/>
    }
  }
}
//如何使用高阶组件呢,这里给WrapperComponent传的值就是Hello这个组件
//World是一个高阶组件，给world传递了一个属性name为rails366的值，rails366是高阶组件的值
//props的值是高阶组件，传递给包裹后的组件的时候使用...this.props进行传递
const World=PropsLogger((props)=>{
  return (
    <p>Hello {props.name}</p>
  )
})
//
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
        <Hello name="rails365"/>
        <World name="rails366"/>
      </div>
    );
  }
}
App.childContextTypes={
  color:PropTypes.string,
}
export default App;
