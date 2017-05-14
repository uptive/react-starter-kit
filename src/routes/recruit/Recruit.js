import React, { PropTypes, Component } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import Layout from '../../components/Layout';
import Date from '../../components/Date';
import CommentList from '../../components/Comments/List';
import CommentCreate from '../../components/Comments/Create';
import ActionButton from '../../components/Action/ActionButton';
import ActionMenu from '../../components/Action/ActionMenu';
import Edit from '../../components/Recruit/Edit';
import s from './Recruit.css';
import { FormControl , InputGroup, Glyphicon, Button, Badge, Grid, Row, Col } from 'react-bootstrap';
import { findRecruits, getRecruit, editRecruit } from '../../actions/recruit';
import FontAwesome from 'react-fontawesome';
import { formatLinkedInUrl, formatGithubUrl, formatFacebookUrl, formatEmailUrl } from "../../helpers/connectionFormatHelper";

class Recruit extends Component {

  static contextTypes = {
      store: React.PropTypes.object
  };

  constructor(props, context) {
    super(props, context);

    this.state =  {
      loggedInUser: this.context.store.getState().user,
      recruit: {},
      isEditing: false
    };
    this.changeHandler = this.context.store.subscribe(() => this.handleChange(this));
  }

  componentDidMount(){
    this.context.store.dispatch(getRecruit({id: this.props.id, services: this.context.store.getState().services}));
  }


  componentWillUnmount(){
    if(this.changeHandler){
      this.changeHandler();
    }
  }

  handleChange(){
    this.setState({
      recruit: this.context.store.getState().recruits.recruit || {},
      isEditing: false
    });
  }

  render(){
    return (
      <Layout>
        <div className={s.root}>
          <div className={s.container}>
            <h3>{ this.state.recruit.firstname } { this.state.recruit.lastname }</h3>
            {this.renderConnections(this.state.recruit.connections)}
            <CommentList commentKey={getCommentKey(this.props.id)}/>
            <CommentCreate commentKey={getCommentKey(this.props.id)} loggedInUser={this.state.loggedInUser}/>
          </div>
        </div>
        <Edit recruit={this.state.recruit} isEditing={this.state.isEditing}/>
        <ActionMenu> { this.renderActionButtonsContianer() } </ActionMenu>
      </Layout>
    );
  }

  renderActionButtonsContianer(){
    if(!this.state.recruit){ return; };
    return (
      <div>
        <ActionButton text="Edit" icon="pencil" onClick={this.handleEditContentChange.bind(this)}/>
      </div>);
  }

  handleEditContentChange(){
    this.setState({isEditing: true});
  };

  renderConnections(connections){
    if(!connections){ return; }

    var connectionList =[];
    if(connections.linkedIn){connectionList.push({icon:"linkedin-square", text:formatLinkedInUrl(connections.linkedIn), link: formatLinkedInUrl(connections.linkedIn)})};
    if(connections.facebook){connectionList.push({icon:"facebook-square", text: formatFacebookUrl(connections.facebook), link: formatFacebookUrl(connections.facebook)})};
    if(connections.github){connectionList.push({icon:"github-square", text: formatGithubUrl(connections.github), link: formatGithubUrl(connections.github)})};
    if(connections.phone){connectionList.push({icon:"phone-square", text: connections.phone, link: connections.phone})};
    if(connections.mail){connectionList.push({icon:"envelope", text: connections.mail, link: formatEmailUrl(connections.mail)})};

    return (
      <div>
        <h5>Contact</h5>
        {connectionList.map((item, index) => (
          <div key={index}>
            <div className={s.iconContainer}><FontAwesome name={item.icon}/></div>
            <div className={s.connectionContainer}>
              <a className={s.link} href={item.link} target="BLANK">
                {item.text}
              </a>
            </div>
          </div>
        ))}
      </div>
    );
  }
}

function getCommentKey(id){
  return "recruit-" + id;
}

export default withStyles(s)(Recruit);
