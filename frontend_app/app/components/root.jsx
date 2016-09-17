import AppBar from './appBar.jsx';
import CreatePath from './createPath.jsx';
import BaseComponent from '../lib/baseComponent';
import React from 'react';

module.exports = BaseComponent.createClass({
	componentWillMount: function(){
		// this.props.controllers.menu.loadMain();
	},
	render: function() {
		return <div>
            <AppBar />
            <div className="container">
                <div className="grid">
                    <CreatePath
                        controllers={this.props.controllers}
                        path={this.props.data.get('createPath')}
                        visible={this.props.data.get('view') === 'createPath'}
                    />
                </div>
            </div>
		</div>;
	}
});