var BaseComponent = require('../lib/baseComponent');
var React = require('react');

module.exports = BaseComponent.createClass({
	render: function() {
		return <div className="loader" />;
	}
});