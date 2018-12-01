import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class Home extends Component {
  /**Home 是一个class，里面是一个对象 */
  constructor(props){
    /** constructor是一个初始化的函数，，每一次创建这个对象首先执行这个函数
     * constructor是一个构造方法，是一个创建这个类的对象的时候的初始化方法
     * super()是执行父类构造函数的方法
     * props是从父对象传递过来的
     */
    super(props);
    this.state={
      age:props.initialAge,
      status:0
    }
    setTimeout(()=>{
      this.setState({
        status:1
      })
    },3000)
  }
  onMakeOlder(){
    this.setState({
      age:this.state.age+3
    })
  }
  //将子组件的数据传递给父组件
  handleGreet(){
    //这里是从父组件传递过来的方法
    this.props.greet(this.state.age);
  }
  render() {
    console.log(this);
    return (
      <div className="container">
          <div className="row">
              <div className="col-xs-1 col-xs-offset-11">
                  <div>Your name is {this.props.name},your age is {this.state.age}</div>
                  <p>{this.state.status}</p>  
                  <button onClick={this.onMakeOlder.bind(this)} className='btn btn-primary'>Make me older</button>
                  <hr/>
                  {/* <button onClick={this.props.greet} className="btn btn-primary">Greet</button> */}
                  <button onClick={this.handleGreet.bind(this)} className="btn btn-primary">Greet</button>
              </div>
          </div>
      </div>
    );
  }
}

Home.propTypes={
  name:PropTypes.string,
  age:PropTypes.number,
  user:PropTypes.object,
  greet:PropTypes.func
}