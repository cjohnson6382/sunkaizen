import reducer from './reducer';
//	import ReduxThunk from 'redux-thunk';
import thunk from 'redux-thunk';
import { createStore, applyMiddleware } from 'redux';

export default function () {
	return createStore(
		reducer,
		applyMiddleware(thunk)
	);
}

//			applyMiddleware(ReduxThunk)