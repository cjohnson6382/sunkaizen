
////////////////////////////////////
//
//	these four functions return actions for each of the basic CRUD operations
//
//		read/delete operations take an ID off of the field the user clicks
//
//		create/update operations get the value of the current inspection JSON from the local object store
//			the remote_action_middleware adds the JSON to these actions before emitting them to the server
//
//	note that there is a 'search' function below that's used to get a set of inspections
//		it's not part of the 'read' operation because users interact with it from a query textbox
//
////////////////////////////////////


export function createInspection() {
	return {
		type: 'CREATE',
		meta: { remote: true, db: true}
	};
}

export function readInspection(id) {
	return {
		type: 'READ',
		value: id.currentTarget.attributes.value.value,
		meta: { remote: true, db: true }
	};
}

export function updateInspection() {
	return {
		type: 'UPDATE',
		meta: { remote: true, db: true }
	};
}

export function deleteInspection(id) {
	return {
		type: 'DELETE',
		value: id.currentTarget.attributes.value.value,
		meta: { remote: true, db: true}
	};
}



//	query the server for inspections; filterd by the 'search' value in the object store
export function search () {
	return {
		type: 'SEARCH',
		meta: { remote: true, db: true }
	};
}



//	sets state to whatever came from the server
//		* this is slightly wasteful; the server never sends a partial state
//		* the size of the state in this app is not large enough to warrant the server sending only partial updates
export function setState (path, newState) {
	return {
		type: 'SET_STATE',
		path: path,
		value: newState
	};
}

//	whenever any field on our webform changes, save to the local store
export function setProp(name, value) {
	console.log('setProp: ', name, value);

	return {
		type: 'SET_PROP',
		name: name,
		value: value
	};
}

//	this is the same function as setProp, with a different path in the local store
//		setProp is for 'inspection' objects and the reducer dispatches a function withat that path prefix
export function setSearch(value) {
	return {
		type: 'SET_SEARCH',
		value: value
	};
}


//	sets a text status message that can be displayed in a butter bar
export function setButter(value) {
	return {
		type: 'SET_BUTTER',
		value: value
	};
}