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
		if( this.props.node.get('hidden') ){ return null; }
		var zDepth = 1;
		if( this.props.focused ){ zDepth = 2; }
        return <Paper style={STYLE} zDepth={zDepth} onClick={this.handleNodeClick}>
            {this.props.node.get('statement')}
        </Paper>;
	}
});