// import React, { Component } from 'react';


// export default class Header extends Component {
//   render() {
//     return (
//       <div className="container">
//           <div className="row">
//               <div className="col-xs-1 col-xs-offset-11">
//                   <h1>Header</h1>
//               </div>
//           </div>
//       </div>
//     );
//   }
// }

import React from 'react';

const Header=(props)=>{
  console.log(props);//{}
  return (
      <div className="container">
          <div className="row">
              <div className="col-xs-1 col-xs-offset-11">
                  <h1>{props.homeLink}</h1>
              </div>
          </div>
      </div>
  )
}

export default Header;

/**
 * 1.无需state，即不处理用户的输入，组件的所有的数据都是依赖props传入的
 * 2.不需要用到声明周期函数
 * 
 * 好处:
 * 1.不需要声明类，可以避免大量的譬如extends或者constructor这样的代码
 * 
 * 2.不需要显示声明this关键字，在ES6的类声名类中往往需要将函数的this关键字绑定到当前作用域，而因为函数式声明的特性，我们不需要再强制绑定
 */