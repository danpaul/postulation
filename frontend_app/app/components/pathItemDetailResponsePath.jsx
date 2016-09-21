import BaseComponent from '../lib/baseComponent';
// import PathItemDetailResponsePath from './pathItemDetailResponsePath.jsx;'
import React from 'react';

const STYLE = {};

module.exports = BaseComponent.createClass({
	// var nodes = [];
	// this.props.path.get('paths').forEach(function(i){

	// })


	render: function() {
		var nodes = [];
		this.props.path.get('path').forEach(function(i){
			if( i.get('type') === 'node' ){
				nodes.push(i);
			}
		});
        return <div>
        	<h4><a>{this.props.path.get('title')}</a></h4>
        	{nodes.map(function(n){
        		return <p key={n.get('id')}>{n.get('statement')}</p>
        	})}
        </div>;
	}
});