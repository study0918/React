import React, { Component } from 'react';

import Header from './components/Header';
import Home from './components/Home'
import './App.css';

class App extends Component {
    constructor(){
        super();
        this.state={
            homeLink:"Home"
        }
    }
    onGreet(age){
        alert(age);
    } 
    
    render() {
        console.log(this);
        const user={
            name:"Anna",
            hobbies:["Sports","Reading"]
        }  
    return (
      <div className="container">
          <div className="row">
              <div className="col-xs-1 col-xs-offset-11">
                  <Header homeLink='Home'/>
              </div>
          </div>
          <div className="row">
              <div className="col-xs-1 col-xs-offset-11">
                  <h1>Hello!!</h1>
              </div>
          </div>
          <div className="row">
              <div className="col-xs-1 col-xs-offset-11">
                  <Home name={"Max"} initialAge={12} user={user} greet={this.onGreet}/>
              </div>
          </div>
      </div>
    );
  }
}

export default App;
