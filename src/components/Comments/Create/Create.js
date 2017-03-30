import React, { PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Create.css';
import Date from './../../Date';
import { addComment } from '../../../actions/comments';
import { Button, FormControl } from 'react-bootstrap';


class Create extends React.Component {
  static propTypes = {
    commentKey: PropTypes.string,
    loggedInUser: PropTypes.object,
  };

  static contextTypes = {
      store: React.PropTypes.object
  };

  constructor(props, context) {
    super(props, context);

    this.state = {
      comment: ""
    };
  }

  handleChange(event){
   this.setState({
     comment: event.target.value
   });
  }

  handleAddComment(event){
    this.context.store.dispatch(addComment({
      key: this.props.commentKey,
      comment: {
        user: this.props.loggedInUser,
        text: this.state.comment
      },
      services: this.context.store.getState().services
    }));

    this.setState({
      comment: ""
    });
  }

  render() {
    if(!this.props.commentKey){ return null; }
    return (
      <div>

      <FormControl componentClass="textarea" placeholder="Write a comment" value={this.state.comment} onChange={(e) => this.handleChange(e)}/>
      <Button onClick={(e) => this.handleAddComment(e)} >Add comment</Button>
      </div>
    );
  }
}

export default withStyles(s)(Create);
