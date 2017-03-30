import React, { PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './ListItem.css';
import Link from './../../Link';
import CountBadge from './../../Comments/CountBadge/CountBadge';
import FontAwesome from 'react-fontawesome';
import { Badge } from 'react-bootstrap';

function ListItem({ recruit }) {
  if(!recruit){ return (<div></div>); }

  return (
    <div className={s.container}>
    <Link to={formatRoute(recruit._id)} className={s.link}>
      <div>
        <div className={s.name}>
          { recruit.firstname + " " + recruit.lastname }
        </div>
        <div className={s.connections}>
          <FontAwesome className={linkedInIconStyle(recruit,s)} name='linkedin-square'/>
          <FontAwesome className={facebookIconStyle(recruit,s)} name='facebook-square'/>
          <FontAwesome className={githubIconStyle(recruit,s)} name='github-square'/>
          <FontAwesome className={phoneIconStyle(recruit,s)} name='phone-square'/>
          <FontAwesome className={mailIconStyle(recruit,s)} name='envelope'/>
        </div>
        <div className={s.comments}>
          <CountBadge commentKey={getCommentKey(recruit._id)}/>
        </div>
      </div>
    </Link>
    </div>
  );
}

function getCommentKey(id){
  return "recruit-" + id;
}

function formatRoute(id){
  return "/recruit/" + id;
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

export default withStyles(s)(ListItem);
