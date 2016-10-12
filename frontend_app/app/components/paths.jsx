import BaseComponent from '../lib/baseComponent';
import React from 'react';
import PathPreview from './pathPreview.jsx';
import Paper from 'material-ui/Paper';

module.exports = BaseComponent.createClass({
	render: function(){
        const self = this;
        const dataLocation = this.props.paths.get('dataLocation');
        return <div>
            {this.props.paths.get('paths').map(function(p, index){
                return <PathPreview
                    controllers={self.props.controllers}
                    dataLocation={dataLocation}
                    key={p.get('id')}
                    path={p}
                    index={index}
                />
            })}
        </div>;
	}
});