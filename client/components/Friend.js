import React from 'react';
import { Link } from 'react-router';

const Friend = (props) => {
  return (
    <div>
      <img src={props.img}></img>
      <Link to={`/browseprofile/${props.otherID}`}>{props.username}</Link>
    </div>
  );
}

export default Friend;
