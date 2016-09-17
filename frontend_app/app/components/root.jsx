import AppBar from './appBar.jsx';
import CreatePath from './createPath.jsx';
import BaseComponent from '../lib/baseComponent';
import React from 'react';

module.exports = BaseComponent.createClass({
	render: function() {
		return <div>
            <AppBar />
            <CreatePath
                controllers={this.props.controllers}
                path={this.props.data.get('createPath')}
                visible={this.props.data.get('view') === 'createPath'}
            />
		</div>;
	}
});