var React = require('react');
var shallowCompare = require('react-addons-shallow-compare');

module.exports = {
	createClass: function(component){
		if( !component.shouldComponentUpdate ){
			// if using strictly immuatable state, will prevent unecessary re-renders
			component.shouldComponentUpdate = function(nextProps, nextState){
				return shallowCompare(this, nextProps, nextState);
			}
		}
		if( !component.render ){
			component.render = function(){ return null; }
		}
		return React.createClass(component);
	}
};