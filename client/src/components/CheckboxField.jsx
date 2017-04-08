import React from 'react';
import {Checkbox, FormGroup, ControlLabel, Col} from 'react-bootstrap';
import PureRenderMixin from 'react-addons-pure-render-mixin';

export default React.createClass({
	onChange: function (evt) {
		this.props.setProp(evt.target.attributes.name.value, evt.target.value);
	},
	getVal: function () {
		return this.props.inspection[this.props.name];
	},
	render: function () {
		return (
			<FormGroup controlId={ this.props.name + "Checkbox" }>
				<Col smOffset={ 1 } >
					<Checkbox name={ this.props.name } value={ this.getVal() } onChange={ this.onChange }>{ this.props.name }</Checkbox>
				</Col>
			</FormGroup>
		);
	}
});
