import {ControlLabel, Grid, FormControl, Row, Col, Button} from 'react-bootstrap';
import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import { Link } from 'react-router'

/*
const ControlLabel = ReactBootstrap.ControlLabel;
const Grid = ReactBootstrap.Grid;
const FormControl = ReactBootstrap.FormControl;
const Row = ReactBootstrap.Row;
const Col = ReactBootstrap.Col;
const Button = ReactBootstrap.Button;

*/

export default React.createClass({
  mixins: [PureRenderMixin],
	keypress: function (evt) {
		if (evt.charCode === 13) this.submit();
	},
	submit: function () {
	  this.props.search();
	},
	create: function () {
		this.props.setState('inspection', {});
	},
	render: function () {
		return (
			<Grid>
				<Row>
					<Col sm={4}>
						<FormControl
							onChange={ this.props.setSearch }
							type="text"
							placeholder="Enter a Search Term"
							onKeyPress={ this.keypress }
						/>
					</Col>
					<Col sm={1}>
						<Button bsStyle="primary" onClick={ this.submit }>Submit</Button>
					</Col>
					<Col sm={1}>
						<Link to="/inspection/"><Button bsStyle="primary" onClick={ this.create } >New Inspection</Button></Link>
					</Col>
				</Row>
			</Grid>
		);
	}
});
