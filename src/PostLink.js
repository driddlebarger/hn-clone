import React from 'react';
import { Link } from "react-router-dom";
import convertTime from './convertTime';
import './App.css';

const PostList = (props) => {

//PROPS:
// type={item.type} // e.g story, or comment
// title={item.title}
// url={item.url}
// author={item.by}
// timestamp={item.time}
// commentsCount={item.descendants}
// id={item.id}
// text={item.text} 	// for comments only
// parent={item.parent} // for comments only

return(
<div>
	
	{ props.type=="comment" ? (
		<div className="comment-text">{props.text && props.text.length > 150 ? props.text.substring(0, 149) + '...' : props.text}</div>
		) : (
		<div className="title"><a href={props.url}>{props.title}</a></div>
		)
	}
	<div className="subtitle">
	by <Link to={`/user?id=${props.author}`}>{props.author}</Link> on {convertTime(props.timestamp)} {props.commentsCount > 0 ? <span>with <Link to={`/post?id=${props.id}`}>{props.commentsCount}</Link> comments</span> : ''}
	</div>
</div>
)
}

export default PostList;