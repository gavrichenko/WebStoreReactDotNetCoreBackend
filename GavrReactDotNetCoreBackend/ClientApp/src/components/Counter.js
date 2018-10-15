import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {increment} from '../AC'
const axios = require('axios');
// const dfg = require('querystring');


class Counter extends Component {

  static propTypes = {
    counter: PropTypes.number
  };

  render() {
    return(
      <div>
        Counter: {this.props.counter}
        <button onClick={this.handleIncrement}>Increment me</button>
        <button onClick={this.handleGet}>get all task</button>
        <button onClick={this.handlePost}>post the new task</button>
      </div>
    )
  }

  handleGet = () => {
    console.log('getting: ');
    axios
      .get('https://salty-ridge-37026.herokuapp.com/tasks/')
      .then(response => (console.log(response.data)))
  };

  handlePost = () => {
    console.log('creating: ');
    const data = {name: "ololo"};
    axios
      .post('https://salty-ridge-37026.herokuapp.com/tasks', data)
      .then(response => (console.log(response.data)))
      .catch(e => console.log(e));
  };

  handleIncrement = () => {
    console.log('incrementing');
    return this.props.dispatch(increment())
  }
}
function mapStateToProps(state) {
  return {
    counter: state.count
  }
}

const decorator = connect(mapStateToProps);

export default decorator(Counter);