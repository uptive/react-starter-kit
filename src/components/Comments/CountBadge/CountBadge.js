import React, { PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './CountBadge.css';
import { getComments } from '../../../actions/comments';
import { Badge } from 'react-bootstrap';
import FontAwesome from 'react-fontawesome';

class CountBadge extends React.Component {
  static propTypes = {
    commentKey: PropTypes.string,
  };

  static contextTypes = {
      store: React.PropTypes.object
  };

  constructor(props, context) {
    super(props, context);

    this.state = {
      comments: [],
      loaded: false
    };
    this.changeHandler = this.context.store.subscribe(() => this.handleChange(this));
  }

  componentDidMount(){
    this.context.store.dispatch(getComments({key: this.props.commentKey, services: this.context.store.getState().services}));
  }

  componentWillUnmount(){
    if(this.changeHandler){
      this.changeHandler();
    }
  }

  handleChange(){
    this.setState({
      comments: this.context.store.getState().comments[this.props.commentKey],
      loaded: true,
    });
  }

  render() {
    var commentCount = "";
    if(this.state.loaded && this.props.commentKey && this.state.comments){ commentCount = this.state.comments.length};
    return (
        <Badge><FontAwesome className={s.connection} name='comments'/> { commentCount }</Badge>
    );
  }
}


export default withStyles(s)(CountBadge);
