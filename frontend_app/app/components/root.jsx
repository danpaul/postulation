import AppBar from './appBar.jsx';
import BaseComponent from '../lib/baseComponent';
import CreatePath from './createPath.jsx';
import Home from './home.jsx';
import Path from './path.jsx';
import Paths from './paths.jsx';
import React from 'react';

module.exports = BaseComponent.createClass({
    componentDidMount: function(){
        this.props.controllers.user.init();
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
    getHome(options){
        if( options.view === 'home' ){
            return <Home
                controllers={this.props.controllers}
                createPath={this.props.data.get('createPath')}
                recentPaths={this.props.data.get('recentPathsHome')}
            />
        }
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
    getPaths(options){
        if( options.view === 'paths' ){
            return <Paths
                controllers={this.props.controllers}
                paths={this.props.data.get('recentPaths')}
            />
        }
        return null;
    },
	render: function() {
        const options = {view: this.props.data.get('view')};
		return <div>
            <AppBar
                user={this.props.data.get('user')}
                controllers={this.props.controllers}
            />
            { this.getHome(options)}
            { this.getCreatePath(options) }
            { this.getPath(options) }
            { this.getPaths(options) }
		</div>;
	}
});