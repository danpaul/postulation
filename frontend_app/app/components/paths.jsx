import BaseComponent from '../lib/baseComponent';
import React from 'react';
import PathPreview from './pathPreview.jsx';
import Paper from 'material-ui/Paper';

module.exports = BaseComponent.createClass({
	render: function(){
        const dataLocation = this.props.paths.get('dataLocation');
        return <Paper zDepth={2}>
            {this.props.paths.get('paths').map(function(p){
                return <PathPreview
                    dataLocation={dataLocation}
                    key={p.get('id')}
                    path={p}
                />
            })}
        </Paper>;
	}
});