import uuid from 'uuid';

//	I think that this is for the hashHistory, but I need to figure it out
export default function getClientId() {
	let id = localStorage.getItem('clientId');
	if (!id) {
		id = uuid.v4();
		localStorage.setItem('clientId', id);
	}
	return id;
}
