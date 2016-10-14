import BaseComponent from '../lib/baseComponent';
import Paper from 'material-ui/Paper';
import React from 'react';

import helpers from '../lib/helpers';

const STYLE = { 
                marginTop: 10,
                marginBottom: 10,
                width: '100%'    };

module.exports = BaseComponent.createClass({
	handleLinkClick: function(){
		var d = {item: this.props.link};
        if( !this.props.focused ){
            this.props.controllers.path.setDetailItem(d);
        } else {
            this.props.controllers.path.unsetDetailItem(d);
        }
	},
	render: function() {
		if( this.props.link.get('hidden') ){ return null; }
        return <Paper
                style={STYLE}
                zDepth={this.props.focused ? 2 : 1}
                onClick={this.handleLinkClick} >
                <div className="link-wrap">
                    <div className="icon-link" />
                </div>
        </Paper>
	}
});