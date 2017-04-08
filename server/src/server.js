import Server from 'socket.io';
import { dbFetcher } from './core';
import { Map, List } from 'immutable';

import {MongoClient} from 'mongodb';

export function startServer(store) {
	const io = new Server().attach(8090);
	MongoClient.connect("mongodb://localhost:27017/inspections")
		.then((db) => {
		 	let dbHandle = db.collection('forms');
			store.subscribe(
				() => {
					io.emit('inspections', List(store.getState().get('inspections')));
					io.emit('inspection', Map(store.getState().get('inspection')));
					console.log('store state after emit: ', store.getState());
				}
			);
		
			io.on('connection', (socket) => {
				socket.emit('state', store.getState().toJS());
				socket.on('action', (action) => {
					//	console.log('server received an action: ', action);
					if (action.meta.db) {
						store.dispatch(dbFetcher(dbHandle)(action.type)(action));
					} else {
						store.dispatch(action);
					}
				});
			});
		})
		.then(() => { return })
		.catch((e) => console.log('error of some kind: ', e));
}
