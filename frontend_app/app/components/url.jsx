var BaseComponent = require('../lib/baseComponent');
var React = require('react');

module.exports = BaseComponent.createClass({
	updateUrl: function(){
        try{
            var url = this._getUrl() + this._getQueryString(this.props.urlState.toJS());
            window.history.pushState(null, null, url);
        } catch(e) { console.log(console.log(e)); }
	},
	_getQueryString: function(params){
		var queryString = '';
		for( var key in params ){
		    if( queryString !== '' ){ queryString += '&'; }
		    else{  queryString += '?'; }
		    queryString += key + "=" + encodeURIComponent(params[key]);
		}
		return queryString;
	},
	_getUrl: function(){
		return [location.protocol, '//', location.host, location.pathname].join('');
	},
	render: function() {
		if( !this.props.urlState ){ return null; }
		this.updateUrl();
		return null;
	}
});