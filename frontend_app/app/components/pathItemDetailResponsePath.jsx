import BaseComponent from '../lib/baseComponent';
import React from 'react';
import config from '../config';

const STYLE = {};

module.exports = BaseComponent.createClass({
	render: function() {
		var nodes = [];
		this.props.path.get('path').forEach(function(i){
			if( i.get('type') === 'node' && !i.get('hidden') ){
				nodes.push(i);
			}
		});
		var pathLink = config.siteUrl + '/path/get/' + this.props.path.get('id');

        return <div>
        	<h4>
        		<a href={pathLink}>
        			{this.props.path.get('title')}
        		</a>
        	</h4>
        	{nodes.map(function(n){
        		return <p key={n.get('id')}>{n.get('statement')}</p>
        	})}
        </div>;
	}
});