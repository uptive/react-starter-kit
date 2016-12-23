import React, { PropTypes, Component } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import Layout from '../../components/Layout';
import Link from '../../components/Link';
import s from './Recruits.css';
import { FormControl , InputGroup, Glyphicon, Button, Badge} from 'react-bootstrap';
import { findRecruits } from '../../actions/recruit';
import FontAwesome from 'react-fontawesome';

class Recruits extends Component {

  static contextTypes = {
      store: React.PropTypes.object
  };

  constructor(props, context) {
    super(props, context);

    this.state =  {
      link: "",
      recruits:[]
    };
    this.changeHandler = this.context.store.subscribe(() => this.handleChange(this));
  }

  componentWillUnmount(){
    if(this.changeHandler){
      this.changeHandler();
    }
  }

  handleChange(){
    this.handleSearchResultUpdated(this.context.store.getState().recruits.search_result);
  }

  searchButtonClicked(){
    this.context.store.dispatch(findRecruits({link: this.state.link, token: this.context.store.getState().runtime.jwtToken}));
  }

  linkChanged(event){
    this.setState({link: event.target.value});
  }

  handleSearchResultUpdated(newResult){
    var recruitsFound = [];


    if(newResult.result === "FOUND_EXACT_MATCH"){
      recruitsFound.push(newResult.recruit)
      console.log(newResult.recruit)
    }

    this.setState({
       recruits: recruitsFound,

     });
  }

  render(){
    return (
      <Layout>
        <div className={s.root}>
          <div className={s.container}>
            <h1 className={s.heading}>Find recruits</h1>
            <InputGroup>
              <FormControl type="text" value={this.state.link} placeholder="Search for a recruit" onChange={(e)=>{ this.linkChanged(e)}}/>
              <InputGroup.Button>
                <Button onClick={this.searchButtonClicked.bind(this)}><Glyphicon glyph="search"/></Button>
              </InputGroup.Button>
            </InputGroup>
            {this.renderSearchResult()}
          </div>
        </div>
      </Layout>
    );
  }

  renderSearchResult(){
    var recruits = this.state.recruits;
    if(recruits.length <= 0) {return;}
    return (
      <div className={s.searchResultContainer}>
        <h4>Search result </h4>
        <ul className={s.searchResultList}>
          {recruits.map((item, index) => (
            <li key={index}>
              <Link to={formatRoute(item._id)} className={s.link}>
                <div>
                  <div className={s.name}>
                    { item.firstname + " " + item.lastname }
                  </div>
                  <div className={s.connections}>
                    <FontAwesome className={linkedInIconStyle(item,s)} name='linkedin-square'/>
                    <FontAwesome className={facebookIconStyle(item,s)} name='facebook-square'/>
                    <FontAwesome className={githubIconStyle(item,s)} name='github-square'/>
                    <FontAwesome className={phoneIconStyle(item,s)} name='phone-square'/>
                    <FontAwesome className={mailIconStyle(item,s)} name='envelope'/>
                  </div>
                  {this.renderComments(item)}
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </div>

    );
  }

  renderComments(item){
    var commentCount = 0;
    if(item && item.comments){ commentCount = item.comments.length};

    return (
      <div className={s.comments}>
        <Badge><FontAwesome className={s.connection} name='comments'/> { commentCount }</Badge>
      </div>
    );
  }
}

function linkedInIconStyle(item, s){
  if(item && item.connections && item.connections.linkedIn){ return s.activeConnection;}
  return s.inactiveConnection;
}

function facebookIconStyle(item, s){
  if(item && item.connections && item.connections.facebook){ return s.activeConnection;}
  return s.inactiveConnection;
}

function githubIconStyle(item, s){
  if(item && item.connections && item.connections.github){ return s.activeConnection;}
  return s.inactiveConnection;
}

function phoneIconStyle(item, s){
  if(item && item.connections && item.connections.phone){ return s.activeConnection;}
  return s.inactiveConnection;
}

function mailIconStyle(item, s){
  if(item && item.connections && item.connections.mail){ return s.activeConnection;}
  return s.inactiveConnection;
}

function formatRoute(id){
  return "/recruit/" + id;
}

export default withStyles(s)(Recruits);
