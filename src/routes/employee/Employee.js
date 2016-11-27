import React, { PropTypes, Component } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import Layout from '../../components/Layout';
import EmployeePresentation from '../../components/Employee/EmployeePresentation';
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
      employee: null,
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
          <div>
            <div className={s.profileHeader}></div>
            <div className={s.profileContainer}>
              <div className={s.profilePresentation}>
                { this.renderEmployeePresentation() }
              </div>

              <div className={s.profileSection}>
                <UserDetails employee={this.state.employee}/>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    );
  }

  renderEmployeePresentation(){
    if(!this.state.employee){ return; };
    return (<EmployeePresentation employee={this.state.employee}/>);
  }
}

export default withStyles(s)(Employee);
