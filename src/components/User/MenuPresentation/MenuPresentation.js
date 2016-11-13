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

  state =  {
    employee: ""
  };

  constructor(props, context) {
    super(props, context);
  }

  handleClick = (event) => {
    this.setState({employee: 'my new value'});
    console.log("HEJ");
    event.preventDefault();
  };

  componentWillUnmount(){
  }

  componentDidMount() {
    console.log("HEJs");
  /*  const options = {
      "headers":{"Authorization":"JWT " + oauthToken}
    };

    fetch('https://uptiverse-employee.herokuapp.com/employees/me', options)
    .then(function(response){
       var employee = response.json();
       console.log(employee);
       this.setState({
         employee: employee
       });
    });*/
  }

  render(){
    const { ...props } = this.props;
//<Link to="/qwerty">
//  </Link>
    return (

        <div className={s.imageContainer} {...props} onClick={this.handleClick}>
  			    {this.state.employee}
        </div>



    );
  }
}

MenuPresentation.contextTypes = {
    loggedInUser: React.PropTypes.object,
    oauthToken: PropTypes.string,
};

export default withStyles(s)(MenuPresentation);
