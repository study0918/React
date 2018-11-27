import React, { Component } from 'react';

export default class Header extends Component {
  render() {
    let content="";
    if(true){
      content="hello!"
    }
    return (
      <div className="container">
        <div className="row">
              <div className="col-xs-1 col-xs-offset-11">
                <h1>Home</h1>
                {content}
              </div>
        </div>
      </div>
    );
  }
}