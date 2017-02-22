import React, { PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './List.css';
import Date from './../../Date';
import { getComments } from '../../../actions/comments';


class List extends React.Component {
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
    });
  }

  render() {
    if(!this.state.comments ){ return null; }
    return (
      <div className={s.commentBox}>
        <h5>Comments</h5>
        <ul className={s.comments}>
          {this.state.comments.map((item, index) => (
            <li key={index}>
              <div>
                <div><Date>{item.date}</Date> - {item.user}</div>
                <div>{item.text}</div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

export default withStyles(s)(List);
