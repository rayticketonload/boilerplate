import React from 'react';

const COUNT_STEP = 1;

class DefaultFormControl extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      valid: false,
      value: '',
      error: ''
    };
  }

  // 表单键入值控制
  handleChange = e => {
    this.setState({
      value: e.target.value,
    })
  }

  componentDidMount() {
  }

  componentWillUnmount() {
  }

  render() {

    let {valid,value,error} = this.state;

    return (
      <div>
        <input
          value={value}
        />
      </div>
    );
  }
};

export default DefaultFormControl;
