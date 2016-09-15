var BaseComponent = require('../lib/baseComponent');
var MenuItem = require('./menuItem.jsx');
var React = require('react');

module.exports = BaseComponent.createClass({
	render: function() {
		var self = this;
		if( !this.props.menu.size ){ return null; }
		return <div>
			{this.props.menu.get('items').map(function(menuItem){
				return <MenuItem
						key={menuItem.get('id')}
						menuItem={menuItem}
						router={self.props.router} />
			})}
		</div>
	}
});