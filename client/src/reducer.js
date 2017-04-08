import {List, Map} from 'immutable';

//	CRUD actions do nothing locally
//		all changes are on the server side, which then propagates state back down to client
function create(state) { return state }
function read(state) { return state }
function update(state) { return state }
function remove(state) { return state }

function search(state) { return state }

//	state.merge merges each of the objects in the newState to the old state;
//	state.set replaces the old store with the new store
function setState (state, path, newState) {
	console.log('reducer called setState', path, newState);
	return state.set(path, newState);
	//	return state.merge(newState);
}

//	I might actually need to dispatch a different action to set a 'query'
function setInspectionProp(state, name, value) {
	return state.setIn(['inspection', name], value);
}

//	sets the value of the search query whenever the query textbox is modified
function setSearch(state, value) { return state.set('search', value) }

//	sets text that would appear in a butter bar
function setButter(state, value) { return state.set('butter', value) }


const INITIAL_STATE = Map({
	ui: Map()
});

export default function(state = INITIAL_STATE, action) {
	switch (action.type) {
		case 'CREATE':
			return create(state);
		case 'READ':
			return read(state);
		case 'UPDATE':
			return update(state);
		case 'DELETE':
			return remove(state);
		case 'SET_STATE':
			return setState(state, action.path, action.value);
		case 'SET_PROP':
			return setInspectionProp(state, action.name, action.value);
		case 'SET_SEARCH':
			return setSearch(state, action.value);
		case 'SET_BUTTER':
			return setButter(state, action.value);
	}
	return state;
}
