import {List, Map} from 'immutable';
import {expect} from 'chai';
import {db} from 'dbtest_setup';

import reducer from '../src/reducer';
//  import {getTicket, setTicket, listTickets, deleteTicket} from '../src/core';

import { dbFetcher } from '../src/core';


describe('application logic for DB queries', () => {
  
  //  setup the DB here so that all the specs can use it;
  //  maybe use ES6 generators + co for this? will keep the tests looking neat and clean....
  
  describe('the database is active', () => {
    it("checks that the admin db can be reached", () => {
      const admin = db.admin();
      expect(admin).to.be.ok;
    });
  });
  
  //  emit a socket.io event 'action' to server { meta: 'db', type: 'get', query: 10 }
  //  should dispatch a setState to the store, return the current state, and emit a 'state' event

  describe('get a ticket', () => {
    it("takes { meta: 'db', type: 'get', query: 10 } gets a ticket from DB, then adds it to state", () => {
      const initialState = Map();
      const action = { meta: 'db', type: 'get', query: 10 };
      
      const dispatchFunction = dbFetcher(db)(action.type)(action.query);
      //  disaptch function to reducer, which should hit thunk middleware if I did this right
      reducer(initialState, dispatchFunction);
      const nextState = store.getState();
      
      expect(nextState).to.equal(Map({ ticket: { id: 10, vendor: 'cow', customer: 'texas' } }));
    });
  });

  describe('update a ticket', () => {
    it("takes { meta: 'db', type: 'update', query: { id: 15, vendor: 'dog', customer: 'california' } } sets it in the db", () => {
      const state = Map();
      const action = { meta: 'db', type: 'update', query: { id: 15, vendor: 'dog', customer: 'california' } };
      
      const dispatchFunction = dbFetcher(db)(action.type)(action.query);

      db.collection('tickets').findOne({ _id: 15 })
        .then(ticket => {
          expect(ticket.id).to.equal(15);
          expect(ticket.vendor).to.equal('dog');
          expect(ticket.customer).to.equal('california');
        });
    });

  });

  describe('delete a ticket from the DB', () => {

    it("takes { meta: 'db', type: 'delete', query: 10 } deletes corresponding ticket from the DB", () => {
      const state = Map();
      const action = { meta: 'db', type: 'delete', query: 10 };
      
      const dispatchFunction = dbFetcher(db)(action.type)(action.query);
      //  disaptch function to reducer, which should hit thunk middleware if I did this right
      reducer(initialState, dispatchFunction);
      
      db.collection('tickets').findOne({ _id: 10 })
        .then(resp => {
          //  according to the docs, findOne on a non-entry returns null
          expect(resp).to.equal(null);
        });
    });

  });

  describe('search for tickets', () => {
    
    it("takes { meta: 'db', type: 'search', query: 'goat', before: [date] , after: [date] } and returns a list of tickets from the DB, then adds list to state", () => {
      const initialState = Map();
      
      //  dates are in the form of '2016-10-10', not timestamps (because frontend is stupid); convert the stamps or this will fail
      //  before: 1476057600, after: 1476748800
      const action1 = { meta: 'db', type: 'get', query: 10, before: 2016-10-18, after: 2016-10-10 };
      const action2 = { meta: 'db', type: 'get', query: 10, after: 2016-10-10 };
      const action3 = { meta: 'db', type: 'get', query: 10, before: 2016-10-18 };
      const action4 = { meta: 'db', type: 'get', query: 10 };

      const actions = [action1, action2, action3, action4];

      actions.map((action) => {
      const dispatchFunction = dbFetcher(db)(action.type)(action.query);
        //  disaptch function to reducer, which should hit thunk middleware if I did this right
        reducer(initialState, dispatchFunction);
        const nextState = store.getState();

        dbFetcher(action)
          .then(list => expect(nextState).to.equal(list) );

        store.set('ticket_list', List());
      });
      
      const dispatchFunction = dbFetcher(db)(action.type)(action.query);
      //  disaptch function to reducer, which should hit thunk middleware if I did this right
      reducer(initialState, dispatchFunction);
      const nextState = store.getState();
      
      expect(nextState).to.equal(Map({ ticket: { id: 10, vendor: 'cow', customer: 'texas' } }));
    });


    it('takes a search obj, stores it, executes a search, returns and stores a list of objects', () => {
      const search = { query: 'test', before: '2016-08-20', after: '2015-05-15'};
      const state = Map();
      const nextState = listTickets(state, search);

      it('stores a search obj', () => {
        expect(nextState.get('search')).to.equal(search);
      });
      
      it('stores and returns a list of objects', () => {
        expect(nextState.get('ticket_list')).to.equal(List(/* a list of the returned ticket objects */));
      });
      
      it('sets the ticket state to empty', () => {
        expect(nextState.get('')).to.equal();
      });
    });

  });

});