import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import { Table, Button } from 'react-bootstrap';

import { Link } from 'react-router'


import ButtonGrid from './ButtonGrid';

import {connect} from 'react-redux';
import * as actionCreators from '../action_creators';


export const InspectionList = React.createClass({
	mixins: [PureRenderMixin],
	getList: function () {
		return this.props.inspections_list || [];
	},
	getInspection: function (evt) {
		evt.preventDefault();
		console.log('in getInspection, evt: ', evt)
		this.props.getInspection(evt);
	},
	createInspection: function () { this.props.createInspection() },
	updateInspection: function () { this.props.updateInspection() },
	buildList: function () {
		const inspectionsJst = this.getList().map((inspection) => {
			let date = new Date(inspection.date).toISOString().substring(0, 10);
			return (
				<tr onClick={ this.getInspection } key={ inspection.id } value={ inspection.id } >
					<td><Link to={ '/inspection/' + inspection.id }>{ inspection.id }</Link></td>
					<td>{ date }</td>
	 	 			<td onClick={ this.props.deleteInspection } value={ inspection.id } >[X]</td>
				</tr>
			);
		});
		return inspectionsJst;

					//	<td>{ inspection.vendor }</td>
					//	<td>{ inspection.customer }</td>
					//	<td>{ inspection.invoice }</td>
					//	<td>{ inspection.serial }</td>

					//	<th width="5%">Id</th><th width="15%">Vendor</th><th width="15%">Customer</th>
					//	<th width="15%">Invoice</th><th width="15%">Serial</th><th width="15%">Date</th><th width="5%">Delete</th>

	},
	render: function () {
		return (
			<div>
				<Table striped bordered condensed hover>
					<thead>
						<tr>
							<th width="45%">Id</th><th width="65%">Date</th>
						</tr>
					</thead>
					<tbody>
						{ this.buildList() }
					</tbody>
				</Table>
			 	<ButtonGrid { ...this.props } />
			</div>
		);
	}
});

//	<Modal bsSize="large" show={ this.props.showmodal } >
//		<Modal.Header>
//			<Modal.Title>Ticket Properties</Modal.Title>
//		</Modal.Header>
//		<Modal.Body>
//			<Ticket { ...this.props } />
//		</Modal.Body>
//		<Modal.Footer>
//			<Button onClick={ this.saveTicket }>Save</Button>
//			<Button onClick={ this.hideModal }>Cancel</Button>
//		</Modal.Footer>
//	</Modal>

function mapStateToProps(state) {
	return {
		inspections: state.get('inspections'),
		inspection: state.get('inspection'),
	};
}


//	input: state.getIn(['ui', 'input']),
//	autocompletes: state.getIn(['autocomplete', 'options']),
//	popover: state.getIn(['autocomplete', 'countdown']),
//	autocompletes_visible: state.getIn(['ui', 'autocompletes_visible'])
//	showmodal: state.getIn(['ui', 'showmodal']),

export const InspectionListContainer = connect(
	mapStateToProps,
	actionCreators
)(InspectionList);
