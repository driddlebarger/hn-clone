import React from 'react';
import PostLink from './PostLink';
import './App.css';

const PostList = (props) => {

//DATA STRUCTURE:
//"by" : "dhouston",
// "descendants" : 71,
// "id" : 8863,
// "kids" : [ 8952, 9224 ]
// "score" : 111,
// "time" : 1175714200,
// "title" : "My YC app: Dropbox - Throw away your USB drive",
// "type" : "story",
// "url" : "http://www.getdropbox.com/u/2/screencast.html"

return (
	<div>
	<ul>
	{props.posts.map(item => 
	<li key={item.id}>
		<PostLink 
			type={item.type}
			title={item.title}
			url={item.url}
			author={item.by}
			timestamp={item.time}
			commentsCount={item.descendants}
			id={item.id}
			text={item.text}
			deleted={item.deleted}
			parent={item.parent}
		/>
	</li>
	)}
	</ul>
	<div>Load more...</div>
	</div>
)

}
export default PostList;
