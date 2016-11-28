import React, { PropTypes, Component } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import Layout from '../../components/Layout';
import EmployeePresentation from '../../components/Employee/EmployeePresentation';
import UserDetails from '../../components/User/UserDetails';
import EditButton from '../../components/EditButton';
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
    console.log(this.context.store.getState().employee.data);
    this.setState({
      employee: this.context.store.getState().employee.data,
      canEdit: this.context.store.getState().canEdit,
      isEditing: this.context.store.getState().employee.isEditing,
      shouldSave: false,
    });
  }

  handleEditContentChange(){
    this.context.store.dispatch(editEmployee());
  };

  handleCancelButtonClicked(){
    //TODO: figure out why his sets state even thought explicitly only calling cancelEditEmployee
    //this is a temporary fix for the problem
    this.context.store.dispatch(getEmployee({id: this.props.id, token: this.context.store.getState().runtime.jwtToken}));

    //this.context.store.dispatch(cancelEditEmployee(this.state.employee));
  };

  handleSaveButtonClicked(){
    this.setState({shouldSave: true});
  };

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
              <div className={s.actionButtonsContainer}>
                {this.renderActionButtonsContianer() }
              </div>
              <div className={s.profileSection}>
                <UserDetails employee={this.state.employee} isEditing={this.state.isEditing} canEdit={this.state.canEdit} shouldSave={this.state.shouldSave}/>
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

  renderActionButtonsContianer(){
    if(!this.state.employee){ return; };
    return (
      <div>
        { this.renderEditButton() }
        { this.renderCancelButton() }
        { this.renderSaveButton() }
      </div>);
  }

  renderEditButton(){
    if(this.state.isEditing){return;}
    return (<EditButton text="Edit" icon="pencil" onClick={this.handleEditContentChange.bind(this)}/>);
  };

  renderCancelButton(){
    if(!this.state.isEditing){return;}
    return (<EditButton text="Cancel" icon="remove" onClick={this.handleCancelButtonClicked.bind(this)}/>);
  };

  renderSaveButton(){
    if(!this.state.isEditing){return;}
    return (<EditButton text="Save" icon="floppy-saved" onClick={this.handleSaveButtonClicked.bind(this)}/>);
  };
}

export default withStyles(s)(Employee);
