//	this middleware checks whether a dispatched action needs to be emitted to the server;
//		dispatched actions with the property meta: { remote: true } go to the server

//	curry a 'socket' into this middleware so that we can emit the action
export default socket => store => next => action => {
	//	console.log('reducer middleware: ', action);

	if (action.meta && action.meta.remote) {
		//	CREATE and UPDATE need to append the local representation of an inspection to their action before they emit
		//	SEARCH needs to append the search string to its action
		switch (action.type) {
			case 'CREATE':
				action.query = store.getState().get('inspection') || '';
				break;
			case 'UPDATE':
				action.query = store.getState().get('inspection') || '';
				break;
			case 'SEARCH':
				action.query = store.getState().getIn(['search']) || '';
				break;
		}

		//	send the action to the server
		socket.emit('action', action);
	}
	
	//	once the middleware has done its work, pass the action back into the normal application flow (send it to the local reducer)
	return next(action);
};
