import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import {connect} from 'react-redux';

import checklist from '../checklist.js'

import * as actionCreators from '../action_creators';

import { Form } from 'react-bootstrap';

import CheckboxField from './CheckboxField';

class Inspection extends React.Component {
	constructor (props) {
		super(props);
		this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
	}

	submit () {
		this.props.updateInspection()
	}

	setProp (prop, value) {
		this.props.setProp([prop, value])
	}
	
	buildInspection () {
		const inspectionJst = checklist.fields.map((field) => {
			return (<CheckboxField {...this.props} name={field} />)
		});
		return inspectionJst
	}
	
	render () {
		return (
			<Form horizontal onSubmit={ this.submit } autoComplete="off" >
				{ this.buildInspection() }
			</Form>
		);
	}
}