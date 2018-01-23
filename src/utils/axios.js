// import {
//     Toast
// } from 'antd-mobile';
import {
    browserHistory,
    hashHistory
} from 'react-router';
import axios from 'axios';
import { session } from 'UTILS';
import store from 'store';

// default axios config
axios.default.withCredentials = true;
axios.default.timeout = 5000;

// http request 拦截器
axios
  .interceptors.request.use(
  config => {
    //console.log('axios.config:',config);
    // let sessionId = store.get('SESSIONID');
    // if (sessionId) {
    //     config.headers.sessionId = sessionId;
    // }
    // let openId = store.get('OPPENID');
    // if (openId) {
    //     config.headers.openId = openId;
    // }
    // if (!config.isHideLoding) {
    //     // Toast.loading('加载中...', 999);
    //     console.log('加载中...');
    // }
    return config;
  },
  err => {
    return Promise.reject(err);
  });

axios
  .interceptors.response.use(
  response => {
    // const { data = {} } = response;
    // Toast.hide();
    // switch (data.code) {
    //   case 200:
    //     {
    //       return data;
    //       // return Promise.reject(data);
    //     }
    //     // case 9: {  //status:9 表示业务数据有误,但请求正常返回
    //     //     return data;
    //     // }
    //     // case 0:
    //     //     {
    //     //         // Toast.fail(data.message, 3);
    //     //         console.log(data.message);
    //     //         // return data;
    //     //         return Promise.reject(data);
    //     //     }
    //     // case 5004:
    //     //     {
    //     //         // Toast.fail(`(${data.status})${data.message}`, 3);
    //     //         console.log(`(${data.status})${data.message}`);
    //     //         // window.location.href = "#/companyLogin";
    //     //         browserHistory.push('/companyLogin');
    //     //         return Promise.reject(data);
    //     //     }
    //     // case 5005:
    //     //     {
    //     //         // Toast.fail(`网络超时，请稍后再试`, 3);
    //     //         console.log(`网络超时，请稍后再试`);
    //     //         return Promise.reject(data);
    //     //     }
    //     // case 500810001:
    //     {
    //       // Toast.fail(`页面超时，请重新提交`, 3);
    //       console.log(`页面超时，请重新提交`);
    //       browserHistory.push('/companyLogin');
    //       //  window.location.href = "#/companyLogin";
    //       let data = {
    //         message: '页面超时，请重新提交',
    //         status: 1
    //       }
    //       return Promise.reject(data);
    //     }
    //   default:
    //     {

    //       // Toast.fail(`${data.message}`, 3);
    //       console.log(`${data.message}`);
    //       return Promise.reject(data);
    //     }
    // }
    return response;
  },
  error => {
    // Toast.hide();
    // if (process.env.IS_DEV) {
    //   console.log('axios error', error);
    // }

    // if (error == 'Error: Network Error') {
    //   error = '网络异常，请检查网络后重试'
    // } else if (error == '(undefine)Network Error') {
    //   error = '网络异常，请检查网络后重试'
    // }
    // let data = {
    //   message: error,
    //   status: -999
    // };
    return Promise.reject(data);
  });

export default axios;
