import React from 'react';
import { Link } from "react-router-dom";
import convertTime from './convertTime';
import './App.css';

const Comment = (props) => {
// text={comment.text}
// author={comment.by}
// timestamp={comment.time}
// commentsCount={comment.descendants}
// id={comment.id}	

return(
<div className="comment">
	<div className="subtitle">
	by <Link to={`/user?id=${props.author}`}>{props.author}</Link> on {convertTime(props.timestamp)} 
	</div>
	<div className="comment-text">
		<div dangerouslySetInnerHTML={{ __html: props.text }} />

	</div>
</div>
)
}

export default Comment;