import {List, Map} from 'immutable';

export const INITIAL_STATE = Map({
	inspections: List([]),
	inspection: Map({}),
});


//	this function fires whenever the client emits an event that requires DB interaction
export const dbFetcher = db => type => action => {

	console.log('dbFetcher, action: ', action);

	switch (type) {
		case 'CREATE':
			return create(db, action);
		case 'READ':
			return read(db, action);
		case 'UPDATE':
			return update(db, action);
		case 'DELETE':
			return remove(db, action);
	}

	console.log('dbFetcher: action.type failed to match');
};


/////////////////////////////////
function create(db, action) {
	//	return action.value === ''
	return dispatch => {
		//	create syntax for DB....
		//	db.
	}
}
/////////////////////////////////

function read(db, action) {
	return action.type === 'list' ?
		dispatch => {
			//	I don't remember how mongo works exactly, but this is supposed to return all inspections should the client provide no query
			let query = action.query && action.query !== '' ? { $text: { $search: action.query } } : {};
			
			db.find(query).toArray()
				.then(list => {
					dispatch(setState(['inspections', List(list)]));
				})
				.catch(e => console.log(e.stack));
		}
		:
		dispatch => {
			db.findOne({ id: parseInt(action.value) })
				.then(inspection => dispatch(setState(['inspection', inspection])))
				.catch((e) => { console.log(e.trace) });
		};
}


function update(db, action) {
	return dispatch => {
		console.log('in update function; inspection to be inserted: ', action.query);

		let id = action.query.id;
		//	if you do not delete the _id of the query, then mongo complains about inserting a PK that already exists
		delete action.query._id;

		db.update({ id: id }, action.query, { upsert: true })
			.then(res => dispatch(setState(['logger', res])))
			.catch(e => console.log(e));
	};
}


function remove(db, action) {
	db.deleteOne({ id: parseInt(action.query) })
		.then(s => { return dispatch => console.log('deleted inspection; no state change') })
		.catch(e => console.log(e.trace));
}




//	action creators
export function setState (stateChange) {
	return {
		type: 'SET_STATE',
		payload: stateChange
	};
}

export function setStateIn (stateChange) {
	return {
		type: 'SET_STATE_IN',
		payload: stateChange
	};
}


//	reducer functions
export function mutate (state, change) {
	return state.set(...change);
}

export function mutateIn (state, change) {
	console.log('change in mutateIn: ', change);
	return state.setIn(...change);
}
