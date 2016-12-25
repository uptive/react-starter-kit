import React, { Component, PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './MenuPresentation.css';
import { Button, ButtonGroup, Glyphicon, FormControl } from 'react-bootstrap';
import fetch from '../../../core/fetch';
import Link from '../../Link';

class MenuPresentation extends Component {
  static propTypes = {
    onClick: PropTypes.func,
    test: PropTypes.string,
  };

  constructor(props, context) {
    super(props, context);

    this.state =  {
      employee: {},
      jwtToken: context.store.getState().runtime.jwtToken
    };
  }

  handleClick = (event) => {

    event.preventDefault();
  };

  componentWillUnmount(){
  }

  componentDidMount() {

    this.getCurrentUser();

  }

  async getCurrentUser(){
    const options = {
      "headers":{"Authorization":"JWT " + this.state.jwtToken}
    };

    var employee = null;

    await fetch('https://uptiverse-employee.herokuapp.com/employees/me', options)
    .then(function(response){
       return response.json();
    })
    .then(function(parsedData) {
      employee = parsedData;
      return;
    });

    this.setState({
      employee: employee
    });
  }

  render(){
    const { ...props } = this.props;
    var img = <div></div>
    if(this.state.employee.picture){
      img = <img src={ this.state.employee.picture } />
    }

    return (
        <div className={s.imageContainer} {...props} onClick={this.handleClick}>
  			  { img }
        </div>
    );
  }
}

MenuPresentation.contextTypes = {
    store: PropTypes.object,
};

export default withStyles(s)(MenuPresentation);
