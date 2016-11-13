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
      employee: null,
      jwtToken: context.store.getState().runtime.jwtToken
    };
  }

  handleClick = (event) => {

    event.preventDefault();
  };

  componentWillUnmount(){
  }

  componentDidMount() {
    const options = {
      "headers":{"Authorization":"JWT " + this.state.jwtToken}
    };

    fetch('https://uptiverse-employee.herokuapp.com/employees/me', options)
    .then(function(response){
       var employee = response.json();
       console.log(employee);
       this.setState({
         employee: employee
       });
    });
  }

  render(){
    const { ...props } = this.props;
  //  var img = this.state.employee;
  //  console.log(img);
    return (
        <div className={s.imageContainer} {...props} onClick={this.handleClick}>
  			  
        </div>



    );

    //
  }
}

MenuPresentation.contextTypes = {
    store: PropTypes.object,
};

export default withStyles(s)(MenuPresentation);
