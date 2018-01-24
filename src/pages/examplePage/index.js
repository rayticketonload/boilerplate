import React from 'react';
import {BrowserRouter as Router,Route,Link} from 'react-router-dom';
import {axios} from 'UTILS';
import './style';

class Index extends React.Component {

  constructor(props) {
    super(props);
    this.state({

    });
  }

  componentDidMount() {
    // console.log(document.documentElement.clientWidth);
  }

  textAPI = () => {
    axios
      .get(`/api/Get/logout`).then(res => {
        if (res.data.code == 200) {
          console.log(res.data.message);
        } else {
          console.log(`用户登出不成功，请检查接口数据状态码`);
        }
      })
      .catch(error => {
        console.log(error.message);
      });
  }

  render() {
    return (
      <div>
        <form id="textForm">
          <input type="text" value={userNameValue} placeholder="userName"/>
          <input type="text" value={smsPinValue} placeholder="smsPin"/>
          <button onClick={this.textAPI}>
            submit
          </button>
        </form>
      </div>
    );
  }
}

export default Index;
