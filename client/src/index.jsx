import React from 'react';
import ReactDOM from 'react-dom';
import {Router, Route, hashHistory} from 'react-router';
import {createStore, applyMiddleware} from 'redux';
import {Provider} from 'react-redux';

import io from 'socket.io-client';

import {search, setSearch, setState, setButter} from './action_creators';
import reducer from './reducer';
import remoteActionMiddleware from './remote_action_middleware';


//	THESE NEED TO CHANGE WHEN I HAVE COMPONENTS FOR THE NEW FORMAT
import App from './components/App';
import {InspectionListContainer} from './components/InspectionList';
import {Inspection} from './components/Inspection';


//	THIS WILL CHANGE ONCE WE ARE UP ON HEROKU
//		const socket = io('http://cjohnson.ignorelist.com:8090');
const socket = io('http://localhost:8090');


//	make a store creator that applies middleware
const createStoreWithMiddleware = applyMiddleware(
	remoteActionMiddleware(socket)
)(createStore);

//	create the local object store
const store = createStoreWithMiddleware(reducer);

//	dispatch a 'search' action to get a list of inspections that have been performed
store.dispatch(search());


//	when the client receives an 'inspection' event from the server...
socket.on('inspection', inspection => {
	store.dispatch(setButter('received an inspection from the server'));
	store.dispatch(setState('inspection', inspection))
});

//	when the client receives an 'inspections' event from the server...
socket.on('inspections', inspections => {
	store.dispatch(setButter('received a list of inspections from the server'));
	store.dispatch(setState('inspections', inspections))
});


//	below is JSX that's automatically Babeled into real Javascript
const routes = <Route component={App}>
	<Route path="/" component={InspectionListContainer} />
	<Route path="/inspection/:id" component={Inspection} />
</Route>;

//	more JSX; puts the <Provider> into the app div on index.html
ReactDOM.render(
	<Provider store={store}>
		<Router history={hashHistory}>{routes}</Router>
	</Provider>,
	document.getElementById('app')
);
