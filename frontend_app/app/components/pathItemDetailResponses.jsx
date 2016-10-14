import BaseComponent from '../lib/baseComponent';
import Paper from 'material-ui/Paper';
import PathPreview from './pathPreview.jsx';
import React from 'react';

const STYLE = {};

module.exports = BaseComponent.createClass({
	render: function() {
		if( !this.props.paths.size ){ return null; }
        return <Paper style={STYLE} zDepth={0}>
        	{this.props.paths.map(function(p){
        		return <PathPreview
        			key={p.get('id')}
        			path={p}
        		/>
        	})}
        </Paper>;
	}
});