import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './index.css';
import App from './App';
import User from './User';
import Post from './Post';

ReactDOM.render(

<Router>
	<Switch>
		<Route exact path="/" component={App} />
		<Route path="/user" component={User} />
		<Route path="/post" component={Post} />
	</Switch>
</Router>

, document.getElementById('root'));

// Router logic
// '/' --> render App component
// '/user' --> render User component with params


