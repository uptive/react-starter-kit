import React, { PropTypes, Component } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import Layout from '../../components/Layout';
import s from './Employees.css';
import Link from '../../components/Link';
import Presentation from '../../components/Employee/Presentation';
import { getEmployees } from '../../actions/employees';

class Employees extends Component {

  static contextTypes = {
      store: React.PropTypes.object
  };

  constructor(props, context) {
    super(props, context);

    this.state =  {
      employees: []
    };
    this.changeHandler = this.context.store.subscribe(() => this.handleChange(this));
  }

  componentDidMount(){
    this.context.store.dispatch(getEmployees({ token: this.context.store.getState().runtime.jwtToken}));
  }

  componentWillUnmount(){
    if(this.changeHandler){
      this.changeHandler();
    }
  }

  handleChange(){
    this.setState({
      employees: this.context.store.getState().employees.data
    });
  }

  render() {
    return (
      <Layout>
        <div className={s.root}>
          <div className={s.listContainer}>
            {this.state.employees.map((item, index) => (
              <Link className={s.link} to={formatRoute(item.username)} key={index}>
                <div className={s.listItem}>
                  <Presentation employee={item}/>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </Layout>
    );
  }

}

function formatRoute(id){
  return "/employee/" + id;
}

export default withStyles(s)(Employees);
