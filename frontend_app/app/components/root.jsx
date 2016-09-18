import AppBar from './appBar.jsx';
import BaseComponent from '../lib/baseComponent';
import CreatePath from './createPath.jsx';
import Path from './path.jsx';
import React from 'react';

module.exports = BaseComponent.createClass({
	render: function() {
        var view = this.props.data.get('view');
		return <div>
            <AppBar />
            <CreatePath
                controllers={this.props.controllers}
                path={this.props.data.get('createPath')}
                visible={view === 'createPath'}
            />
            <Path
                controllers={this.props.controllers}
                path={this.props.data.get('path')}
                visible={view === 'path'}
            />
		</div>;
	}
});