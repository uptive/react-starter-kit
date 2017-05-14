import React, { PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Edit.css';
import { Button, ButtonGroup, Glyphicon, FormGroup, FormControl, ControlLabel, Collapse, InputGroup, Modal } from 'react-bootstrap';
import FontAwesome from 'react-fontawesome';
import { formatLinkedInUrl, formatGithubUrl, formatFacebookUrl, formatEmailUrl } from "../../../helpers/connectionFormatHelper";
import { extractLinkedInId, extractFacebookId, extractGithubId } from "../../../helpers/idExtractors";
import { saveRecruit } from '../../../actions/recruit';


class Edit extends React.Component {
  static propTypes = {
    recruit: PropTypes.object,
    isEditing: PropTypes.bool,
  };

  static contextTypes = {
      store: React.PropTypes.object
  };

  constructor(props, context) {
    super(props, context);
    this.state = {
      isEditing: props.isEditing,
      recruit: null,
    };
  }

  componentWillReceiveProps(nextProps){
   this.setState({
     recruit: nextProps.recruit,
     isEditing: nextProps.isEditing,
   });

   if(nextProps.shouldSave){
     this.save();
   }
  }

  setLinkedInConnection(event){
    var modRecruit = this.state.recruit;
    modRecruit.connections.linkedIn = extractLinkedInId(event.target.value);
    this.setState({recruit: modRecruit});
  }

  setFacebookConnection(event){
    var modRecruit = this.state.recruit;
    modRecruit.connections.facebook = extractFacebookId(event.target.value);
    this.setState({recruit: modRecruit});
  }

  setGithubConnection(event){
    var modRecruit = this.state.recruit;
    modRecruit.connections.github = extractGithubId(event.target.value);
    this.setState({recruit: modRecruit});
  }

  setPhoneConnection(event){
    var modRecruit = this.state.recruit;
    modRecruit.connections.phone = event.target.value;
    this.setState({recruit: modRecruit});
  }

  setEmailConnection(event){
    var modRecruit = this.state.recruit;
    modRecruit.connections.mail = event.target.value;
    this.setState({recruit: modRecruit});
  }

  render() {
    if(!this.state.recruit || !this.state.recruit.connections){ return null; }
    return (
      <Modal show={this.state.isEditing} onHide={this.close.bind(this)}>
        <Modal.Header closeButton>
          <Modal.Title>Let everyone know what´s changed</Modal.Title>
        </Modal.Header>
          <h5>connections</h5>
          <FormControl placeholder="LinkedIn" value={formatLinkedInUrl(this.state.recruit.connections.linkedIn) || "" } onChange={(e)=>{ this.setLinkedInConnection(e)}}/>
          <FormControl placeholder="Facebook" value={formatFacebookUrl(this.state.recruit.connections.facebook)  || "" } onChange={(e)=>{ this.setFacebookConnection(e)}}/>
          <FormControl placeholder="Github" value={formatGithubUrl(this.state.recruit.connections.github)  || "" } onChange={(e)=>{ this.setGithubConnection(e)}}/>
          <FormControl placeholder="Phone" value={this.state.recruit.connections.phone  || "" } onChange={(e)=>{ this.setPhoneConnection(e)}}/>
          <FormControl placeholder="Email" value={this.state.recruit.connections.mail  || "" } onChange={(e)=>{ this.setEmailConnection(e)}}/>
        <Modal.Body>
          </Modal.Body>
        <Modal.Footer>
          <Button onClick={this.close.bind(this)}>Close</Button>
          <Button bsStyle="primary" onClick={this.save.bind(this)}>Save</Button>
        </Modal.Footer>
      </Modal>
    );
  }

  save(){
    this.context.store.dispatch(saveRecruit({services: this.context.store.getState().services, recruit: this.state.recruit}));

    this.setState({
      isEditing: false,
    });
  }

  close() {
    this.setState({
      isEditing: false,
    });
  }
}

export default withStyles(s)(Edit);
