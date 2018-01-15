import React from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import { Counter } from 'COM';
import { axios } from 'UTILS';
import style from './basicExample-custom';

// import { Button } from 'antd-mobile';


const Home = () => (
  <div>
    <h2>Home</h2>
  </div>
)

const About = () => (
  <div>
    <h2>About</h2>
  </div>
);

const Topics = ({ match }) => (
  <div>
    <h2>Topics</h2>
    <ul>
      <li>
        <Link to={`${match.url}/rendering`}>
          Rendering with React
        </Link>
      </li>
      <li>
        <Link to={`${match.url}/components`}>
          Components
        </Link>
      </li>
      <li>
        <Link to={`${match.url}/props-v-state`}>
          Props v. State
        </Link>
      </li>
    </ul>

    <Route path={`${match.url}/:topicId`} component={Topic} />
    <Route exact path={match.url} render={() => (
      <h3>Please select a topic.</h3>
    )} />
  </div>
)

const Topic = ({ match }) => (
  <div>
    <h3>{match.params.topicId}</h3>
  </div>
)

class BasicExample extends React.Component {

  // test() {
  //   axios.get('/api/daliystatistics')
  //   .then(function (response) {
  //     console.log(response);
  //   })
  //   .catch(function (error) {
  //     console.log(error);
  //   });
  // }

  componentDidMount() {
    //this.test();
  }

  render() {
    return (
      <Router>
        <div>
          {/* <Button className="btn" type="primary">primary button</Button> */}
          <ul id="nav">
            <li className={`${style.red} ${style.blue}`}><Link to="/">Home</Link></li>
            <li><Link to="/about">About</Link></li>
            <li><Link to="/topics">Topics</Link></li>
            <li>
              <Link to="/counter">Counter</Link>
            </li>
          </ul>

          <hr />

          <Route exact path="/" component={Home} />
          <Route path="/about" component={About} />
          <Route path="/topics" component={Topics} />
          <Route path="/counter" component={Counter} />
        </div>
      </Router>
    );
  }
};

export default BasicExample;
