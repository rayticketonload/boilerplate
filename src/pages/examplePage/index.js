import React from 'react';
import {BrowserRouter as Router,Route,Link} from 'react-router-dom';
import {axios} from 'UTILS';
import {Input} from 'COM';
import './style';

class Index extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      form: {
        userName: {
          value: '',
        },
        smsPin: {
          value: '',
        }
      }
    };
  }

  // 表单键入值控制
  valueChange = e => {
    this.setState({
      ...this.state.form,
      form: {
        userName: {
          value: e.target.value,
        }
      }
    })
  };

  // 表单键入值控制
  // handleChange = e => {
  //   const userName = document.getElementById('userName');
  //   if(e.target != userName){
  //     // console.log(e.target);
  //     this.setState({
  //       form: {
  //         ...this.state.form,
  //         smsPin: {
  //           value: e.target.value,
  //         }
  //       }
  //     })
  //   } else {
  //     // console.log(e.target);
  //     this.setState({
  //       form: {
  //         ...this.state.form,
  //         userName: {
  //           value: e.target.value,
  //         }
  //       }
  //     })
  //   }
  // }

  componentDidMount() {
    // console.log(document.documentElement.clientWidth);
  }

  // textAPI = () => {
  //   axios
  //     .get(`/api/GET/logout`)
  //     .then(res => {
  //       if (res.data.code == 200) {
  //         console.log(res.data.message);
  //       } else {
  //         console.log(`用户登出不成功，请检查接口数据状态码`);
  //       }
  //     })
  //     .catch(error => {
  //       console.log(error.message);
  //     });
  // }

  // 登录事件
  login = () => {

    let {form} = this.state;

    let loginPara = {
      userName: form.userName.value,
      smsPin: form.smsPin.value
    }

    axios
      .post(`/api/POST/login`,loginPara)
      .then(res => {
        if (res.data.code == 200) {
          console.log(res.data.message);
        } else {
          console.log(`用户登录不成功，请检查接口返回的message`);
        }
      })
      .catch(error => {
        console.log(error.message);
      });
  }

  render() {

    let {form} = this.state;
    // console.log(form.userName.value,'form.userName.value');

    return (
      <div>
        <form id="textForm">
          {/* <input
            id="userName"
            type="text"
            value={form.userName.value}
            placeholder="userName"
            onChange={e => this.handleChange(e)}
          /> */}
          {/* <input
            id="smsPin"
            type="text"
            value={form.smsPin.value}
            placeholder="smsPin"
            onChange={e => this.handleChange(e)}
          /> */}
          <Input
            //value="123"
            placeholder="userName"
            onChange={e => this.valueChange(e)}
          />
          <Input
            value={form.smsPin.value}
            placeholder="smsPin"
            onChange={e => this.valueChange(e)}
          />
          <button onClick={this.login} type="button">
            submit
          </button>
        </form>
      </div>
    );
  }
}

export default Index;
