import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter as Router,Route,Link} from 'react-router-dom';
// 适用 react hot loader 让热更新后保留React的组件状态
import {AppContainer} from 'react-hot-loader';

// 引入普通组件
// import {BasicExample} from 'COM';

// 引入整个页面组件
import {Index} from 'PAGES';

// 引入JQ
// import $ from 'jquery';

// 从公共组件引入的样式来初始化浏览器样式
import './style';

const appElement = document.getElementById('app');

const render = () => {
  ReactDOM.render (
    <AppContainer>
      <Router>
        <div className="appWrap">
          <Index />
        </div>
      </Router>
    </AppContainer>,
    appElement,
  );
};

render();

// 前端脚本中配置热更新处理逻辑
if(module.hot) {
  module.hot.accept(function(err) {
      if(err) {
          console.error("Cannot apply hot update", err);
      }
  });
}
