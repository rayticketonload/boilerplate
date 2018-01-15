import React from 'react';

const COUNT_STEP = 1;

class Counter extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      value: 1
    };
  }

  handleTimeoutEvent() {
    this.setState((prevState, props) => ({
      value: prevState.value + COUNT_STEP
    }), () => {
      this.timeout = setTimeout(this.handleTimeoutEvent.bind(this), 1000);
    });
  }

  componentDidMount() {
    this.timeout = setTimeout(this.handleTimeoutEvent.bind(this), 1000);
  }

  componentWillUnmount() {
    this.timeout && clearTimeout(this.timeout);
  }

  render() {
    return (
      <div>
        <p> This is a counter: {this.state.value} </p>
      </div>
    );
  }
};

export default Counter;
