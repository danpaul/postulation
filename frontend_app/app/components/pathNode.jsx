import BaseComponent from '../lib/baseComponent';
import Paper from 'material-ui/Paper';
import React from 'react';

const STYLE = {padding: 10, cursor: 'pointer'};

module.exports = BaseComponent.createClass({
	handleNodeClick: function(){
		var d = {item: this.props.node};
		this.props.controllers.path.setDetailItem(d);
	},
	render: function() {
        return <Paper style={STYLE} zDepth={1} onClick={this.handleNodeClick}>
            {this.props.node.get('statement')}
        </Paper>;
	}
});