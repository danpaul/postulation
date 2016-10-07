import BaseComponent from '../lib/baseComponent';
import React from 'react';
import PathPreview from './pathPreview.jsx';
import Paper from 'material-ui/Paper';

module.exports = BaseComponent.createClass({
	render: function(){
        return <Paper zDepth={2}>
            {this.props.paths.get('paths').map(function(p){
                return <PathPreview
                    key={p.get('id')}
                    path={p}
                />
            })}
        </Paper>;
	}
});