import BaseComponent from '../lib/baseComponent';
import React from 'react';

module.exports = BaseComponent.createClass({
	render: function(){
		return <div>
			<h2>{this.props.title}</h2>
			{this.props.children}
		</div>
	}
});