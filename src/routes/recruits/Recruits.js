import React, { PropTypes, Component } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import Layout from '../../components/Layout';
import Link from '../../components/Link';
import ListItem from '../../components/Recruit/ListItem';
import s from './Recruits.css';
import { FormControl , InputGroup, Glyphicon, Button} from 'react-bootstrap';
import { findRecruits } from '../../actions/recruit';
import FontAwesome from 'react-fontawesome';

class Recruits extends Component {

  static contextTypes = {
      store: React.PropTypes.object
  };

  constructor(props, context) {
    super(props, context);

    this.state =  {
      searchQuery: "",
      recruits: []
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
    this.context.store.dispatch(findRecruits({link: this.state.searchQuery, services: this.context.store.getState().services}));
  }

  linkChanged(event){
    this.setState({searchQuery: event.target.value});
  }

  handleSearchResultUpdated(newResult){
    var recruitsFound = newResult.recruits;
    this.setState({
       recruits: recruitsFound
     });
  }

  render(){
    return (
      <Layout>
        <div className={s.root}>
          <div className={s.container}>
            <h1 className={s.heading}>Find recruits</h1>
            <InputGroup>
              <FormControl type="text" value={this.state.searchQuery} placeholder="Search for a recruit" onChange={(e)=>{ this.linkChanged(e)}}/>
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
              <ListItem recruit={item}/>
            </li>
          ))}
        </ul>
      </div>

    );
  }
}

export default withStyles(s)(Recruits);
