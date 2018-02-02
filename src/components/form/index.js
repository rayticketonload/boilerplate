import React from 'react';

class Input extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      value: this.props.value,
      valid: false,
      error: '',
    };
  }

  static defaultProps = {
    value: '',
    placeholder: '',
  };

  static propTypes = {
    value: React.PropTypes.string.isRequired,
    placeholder: React.PropTypes.string.isRequired,
  };

  // 表单键入值控制
  valueChange = e => {
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
          onChange={this.props.onChange}
          type="text"
          placeholder={this.props.placeholder}
        />
      </div>
    );
  }
};

export default Input;
