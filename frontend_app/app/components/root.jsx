import AppBar from './appBar.jsx';
import BaseComponent from '../lib/baseComponent';
import CreatePath from './createPath.jsx';
import Path from './path.jsx';
import User from './user.jsx';
import React from 'react';

module.exports = BaseComponent.createClass({
    getUser: function(options){
        if( options.view === 'register' || options.view === 'login' ){
            return <User
                controllers={this.props.controllers}
                user={this.props.data.get('user')}
                view={options.view}
            />
        }
        return null;
    },
    getCreatePath(options){
        if( options.view === 'createPath' ){
            return <CreatePath
                controllers={this.props.controllers}
                path={this.props.data.get('createPath')}
            />
        }
        return null;
    },
    getPath(options){
        if( options.view === 'path' ){
            return <Path
                controllers={this.props.controllers}
                createPath={this.props.data.get('createPath')}
                detailItem={this.props.data.get('detailItem')}
                path={this.props.data.get('path')}
            />
        }
        return null;
    },
	render: function() {
        var view = this.props.data.get('view');
		return <div>
            <AppBar />
            { this.getUser({view: view}) }
            { this.getCreatePath({view: view}) }
            { this.getPath({view: view}) }
		</div>;
	}
});