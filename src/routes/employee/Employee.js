import React, { PropTypes, Component } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import Layout from '../../components/Layout';
import UserDetails from '../../components/User/UserDetails';
import s from './Employee.css';
import { getEmployee } from '../../actions/employee';

class Employee extends Component {

  static contextTypes = {
      store: React.PropTypes.object
  };

  constructor(props, context) {
    super(props, context);

    this.state =  {
      employee: this.context.store.getState().employee,
    };
    this.changeHandler = this.context.store.subscribe(() => this.handleChange(this));

  }

  componentDidMount(){
    this.context.store.dispatch(getEmployee({id: this.props.id, token: this.context.store.getState().runtime.jwtToken}));
  }

  componentWillUnmount(){
    if(this.changeHandler){
      this.changeHandler();
    }
  }

  handleChange(){
    this.setState({
      employee: this.context.store.getState().employee
    });
  }

  render() {
    return (
      <Layout>
        <div className={s.root}>
          <UserDetails user={this.state.employee}/>
        </div>
      </Layout>
    );
  }
}

export default withStyles(s)(Employee);
