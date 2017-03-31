import React, { Component, PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Create.css';
import { Button, FormControl, Modal } from 'react-bootstrap';
import { createRecruitCancel, saveRecruit } from '../../../actions/recruit';


class Create extends Component {
  static propTypes = {
    connection: PropTypes.object,
  };

  static contextTypes = {
      store: React.PropTypes.object
  };

  constructor(props, context) {
    super(props, context);

    this.state =  {
      create: false,
      createdRecruit: {}
    };

    this.changeHandler = this.context.store.subscribe(() => this.handleChange(this));
  }

  handleChange(){
    this.setState({
      create: this.context.store.getState().recruits.create
    });
  }

  componentDidMount(){
  }

  componentWillUnmount(){
    if(this.changeHandler){
      this.changeHandler();
    }
  }

  setFirstname(event){
    var modRecruit = this.state.createdRecruit;
    modRecruit.firstname = event.target.value;
    this.setState({createdRecruit: modRecruit});
  }

  setLastname(event){
    var modRecruit = this.state.createdRecruit;
    modRecruit.lastname = event.target.value;
    this.setState({createdRecruit: modRecruit});
  }

  close() {
    this.context.store.dispatch(createRecruitCancel());
  }

  save() {
    var createdRecruit = this.state.createdRecruit;
    createdRecruit.connections = {};

    if(this.props.connection && this.props.connection.source && this.props.connection.id){
      createdRecruit.connection = this.props.connection.source;
      createdRecruit.id = this.props.connection.id;
    }

    createdRecruit.createdBy = this.context.store.getState().user;
    this.context.store.dispatch(saveRecruit({services: this.context.store.getState().services, recruit: createdRecruit}));
  }

  render(){
    const { ...props } = this.props;
    return (
      <Modal show={this.state.create} onHide={this.close.bind(this)}>
        <Modal.Header closeButton>
          <Modal.Title>Who is this awesome person</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h5>Name</h5>
          <FormControl placeholder="Firstname" onChange={(e)=>{ this.setFirstname(e)}}/>
          <FormControl placeholder="Lastname" onChange={(e)=>{ this.setLastname(e)}}/>

        </Modal.Body>
        <Modal.Footer>
          <Button onClick={this.close.bind(this)}>Close</Button>
          <Button bsStyle="primary" onClick={this.save.bind(this)}>Save</Button>
        </Modal.Footer>
      </Modal>
    );
  }
}

export default withStyles(s)(Create);
