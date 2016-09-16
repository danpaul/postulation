import BaseComponent from '../lib/baseComponent';
import React from 'react';
import CreateNode from './createNode.jsx';

module.exports = BaseComponent.createClass({
	render: function() {
        if( !this.props.visible ){ return null; }
		return <div>
            <CreateNode />            
		</div>;
	}
});