import AppBar from './appBar.jsx';
import BaseComponent from '../lib/baseComponent';
import CreatePath from './createPath.jsx';
import Path from './path.jsx';
import User from './user.jsx';
import React from 'react';

module.exports = BaseComponent.createClass({
	render: function() {
        var view = this.props.data.get('view');
		return <div>
            <AppBar />
            <User
                controllers={this.props.controllers}
                user={this.props.data.get('user')}
                view={view}
            />
            <CreatePath
                controllers={this.props.controllers}
                path={this.props.data.get('createPath')}
                visible={view === 'createPath'}
            />
            <Path
                controllers={this.props.controllers}
                createPath={this.props.data.get('createPath')}
                detailItem={this.props.data.get('detailItem')}
                path={this.props.data.get('path')}
                visible={view === 'path'}
            />
		</div>;
	}
});