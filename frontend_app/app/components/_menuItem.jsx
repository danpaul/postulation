var BaseComponent = require('../lib/baseComponent');
var React = require('react');

var MenuItem = BaseComponent.createClass({
	handleClick: function(){
		var l = this.props.menuItem.get('object');
		var id = this.props.menuItem.get('object_id');
		switch(l){
			case('category'):
				this.props.router.navigate({cat: id});
				break;
			case('page'):
				this.props.router.navigate({page_id: id});
				break;
			case('post'):
				this.props.router.navigate({p: id});
				break;
			case('post_tag'):
				this.props.router.navigate({tag: id});
				break;
			default:
				console.log(new Error('Unknown link type'), l);
		}
	},
	render: function() {
		var self = this;
		var children = null;
		if( this.props.menuItem.get('children') ){
			children = <div>
				{this.props.menuItem.get('children').map(function(menuItem){
					return <MenuItem key={menuItem.get('id')} {...self.props} menuItem={menuItem} />
				})}
			</div>
		}
		var style={marginBottom: '0.5rem', display: 'block'};
		if( this.props.menuItem.get('object') === 'custom' ){
			var link = <a style={style} href={this.props.menuItem.get('url')} target="_blank">
				{this.props.menuItem.get('title')}
			</a>
		} else {
			var link =  <a style={style} onClick={this.handleClick} >
				{this.props.menuItem.get('title')}
			</a>
		}
		return <div>
			{link}
			{children}
		</div>
	}
});

module.exports = MenuItem;