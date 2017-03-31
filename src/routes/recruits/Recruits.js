import React, { PropTypes, Component } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import Layout from '../../components/Layout';
import Link from '../../components/Link';
import ListItem from '../../components/Recruit/ListItem';
import CreateRecruit from '../../components/Recruit/Create';
import EditButton from '../../components/Action/ActionButton';
import ActionMenu from '../../components/Action/ActionMenu';
import s from './Recruits.css';
import { FormControl , InputGroup, Glyphicon, Button} from 'react-bootstrap';
import { findRecruits, createRecruit } from '../../actions/recruit';
import FontAwesome from 'react-fontawesome';

class Recruits extends Component {

  static contextTypes = {
      store: React.PropTypes.object
  };

  constructor(props, context) {
    super(props, context);

    this.state =  {
      searchQuery: "",
      recruits: [],
      newRecruit: null
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

  search(){
    this.context.store.dispatch(findRecruits({link: this.state.searchQuery, services: this.context.store.getState().services}));
  }

  linkChanged(event){
    this.setState({searchQuery: event.target.value});
  //  this.search();
  }

  handleSearchResultUpdated(newResult){
    if(!newResult){ return;}
    this.setState({ newRecruit: null });
    if(newResult.recruits.length == 0 && newResult.source){
      this.setState({
         newRecruit: { source: newResult.source, id: newResult.id }
       });
    }
    var recruitsFound = newResult.recruits;
    this.setState({
       recruits: recruitsFound
     });
  }

  handleCreateContentChange(){
    this.context.store.dispatch(createRecruit());
  };

  render(){
    return (
      <Layout>
        <div className={s.root}>
          <div className={s.container}>
            <h1 className={s.heading}>Find recruits</h1>
            <InputGroup>
              <FormControl type="text" value={this.state.searchQuery} placeholder="Search for a recruit" onChange={(e)=>{ this.linkChanged(e)}}/>
              <InputGroup.Button>
                <Button onClick={this.search.bind(this)}><Glyphicon glyph="search"/></Button>
              </InputGroup.Button>
            </InputGroup>
            {this.renderCreateRecruitSection()}
            {this.renderSearchResult()}
          </div>
          <CreateRecruit connection={this.state.newRecruit}/>
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
              <ListItem recruit={item}/>
            </li>
          ))}
        </ul>
      </div>

    );
  }

  renderCreateRecruitSection(){
    if(!this.state.newRecruit){ return null;}
    return (
      <div className={s.createRecruitSection}>
        <div onClick={this.handleCreateContentChange.bind(this)}><FontAwesome className={s.addRecruitIcon} name='plus-circle'/> Can't find the recruit. Press here to make a change to that.</div>
      </div>
    );
  };

}

export default withStyles(s)(Recruits);
