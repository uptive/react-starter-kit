import React, { PropTypes, Component } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import Layout from '../../components/Layout';
import Presentation from '../../components/Employee/Presentation';
import Description from '../../components/Employee/Description';
import ContactInfo from '../../components/Employee/ContactInfo';
import PersonalDevelopment from '../../components/Employee/PersonalDevelopment';
import Edit from '../../components/Employee/Edit';
import ActionButton from '../../components/Action/ActionButton';
import ActionMenu from '../../components/Action/ActionMenu';
import s from './Employee.css';
import { getEmployee, editEmployee, cancelEditEmployee, setCanEditEmployee } from '../../actions/employee';

class Employee extends Component {

  static contextTypes = {
      store: React.PropTypes.object
  };

  constructor(props, context) {
    super(props, context);

    this.state =  {
      employee: null,
      canEdit: null,
    };
    this.changeHandler = this.context.store.subscribe(() => this.handleChange(this));
  }

  componentDidMount(){
    this.context.store.dispatch(getEmployee({id: this.props.id, user: this.context.store.getState().user, services: this.context.store.getState().services}));
  }

  componentWillUnmount(){
    if(this.changeHandler){
      this.changeHandler();
    }
  }

  handleChange(){
    this.setState({
      employee: this.context.store.getState().employee.data,
      canEdit: this.context.store.getState().employee.canEdit,
      isEditing: this.context.store.getState().employee.isEditing,
      shouldSave: false,
    });
  }

  handleEditContentChange(){
    this.context.store.dispatch(editEmployee());
  };

  render() {
    return (
      <Layout>
        <div className={s.root}>
          <div>
            <div className={s.profileHeader}></div>
            <div className={s.profileContainer}>
              <div className={s.profilePresentation}>
                <Presentation employee={this.state.employee}/>
              </div>
              <div className={s.profileSection}>
                <Description employee={this.state.employee} />
                <PersonalDevelopment employee={this.state.employee} />
                <ContactInfo employee={this.state.employee} />
              </div>
              <ActionMenu> { this.renderActionButtonsContianer() } </ActionMenu>
              <Edit employee={this.state.employee} isEditing={this.state.isEditing} canEdit={this.state.canEdit} shouldSave={this.state.shouldSave}/>
            </div>
          </div>
        </div>
      </Layout>
    );
  }

  renderActionButtonsContianer(){
    if(!this.state.employee){ return; };
    if(!this.state.canEdit){ return; };
    return (
      <div>
        <ActionButton text="Edit" icon="pencil" onClick={this.handleEditContentChange.bind(this)}/>
      </div>);
  }

}

export default withStyles(s)(Employee);
