import React, { Component } from 'react';

import PropTypes from 'prop-types';

export default class Home extends Component {
  //constructor是初始化函数，每一次创建的时候先执行这个函数,constructor是一个构造方法，是创建这个类的初始化方法
  //父类传过来的props
  constructor(props){
    //super是执行父类构造函数的方法
    super(props);
    //this.age=this.props.age;
    this.state={
      age:props.initialAge,
      status:0
    }
    setTimeout(()=>{
      this.setState({
        status:1
      })
    })
  }
  onMakeOlder(){
    //this就是这个Home对象
    //this.age+=3;
    //console.log(this);
    this.setState({
      age:this.state.age+3
    })
  }
  render() {
    console.log(this);
    console.log(this.props);
    return (
      <div className="container">
        <div className="row">
              <div className="col-xs-1 col-xs-offset-11">
                <div>Your name is {this.props.name},your age is {this.state.age}</div>
                 <p>Status:{this.state.status}</p>
                 {/** this.onMakeOlder不要加括号，因为()代表执行，这里我们只想要函数传过来*/}
                {/* <button className="btn btn-primary" onClick={this.onMakeOlder.bind(this)}>Make me older</button> */}
                <button className="btn btn-primary" onClick={()=>{this.onMakeOlder()}}>Make me older</button>
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
}