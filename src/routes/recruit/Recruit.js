import React, { PropTypes, Component } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import Layout from '../../components/Layout';
import Date from '../../components/Date';
import CommentList from '../../components/Comments/List';
import s from './Recruit.css';
import { FormControl , InputGroup, Glyphicon, Button, Badge } from 'react-bootstrap';
import { findRecruits, getRecruit } from '../../actions/recruit';

class Recruit extends Component {

  static contextTypes = {
      store: React.PropTypes.object
  };

  constructor(props, context) {
    super(props, context);

    this.state =  {
      recruit: {},
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
    });
  }

  render(){
    return (
      <Layout>
        <div className={s.root}>
          <div className={s.container}>
            <h3>{ this.state.recruit.firstname } { this.state.recruit.lastname }</h3>
            <CommentList commentKey={"recruit-" + this.props.id}/>
          </div>
        </div>
      </Layout>
    );
  }

}

export default withStyles(s)(Recruit);
