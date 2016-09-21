import BaseComponent from '../lib/baseComponent';
import Paper from 'material-ui/Paper';
import PathItemDetailResponsePath from './pathItemDetailResponsePath.jsx';
import React from 'react';

const STYLE = {};

module.exports = BaseComponent.createClass({
	render: function() {
		if( !this.props.paths.size ){ return null; }
        return <Paper style={STYLE} zDepth={2}>
        	{this.props.paths.map(function(p){
        		return <PathItemDetailResponsePath
        			key={p.get('id')}
        			path={p}
        		/>
        	})}
        </Paper>;
	}
});