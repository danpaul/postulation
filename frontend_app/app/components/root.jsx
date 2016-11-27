import AppBar from './appBar.jsx';
import BaseComponent from '../lib/baseComponent';
import CreatePath from './createPath.jsx';
import Drawer from './drawer.jsx';
import Home from './home.jsx';
import Path from './path.jsx';
import Paths from './paths.jsx';
import React from 'react';
import Snackbar from './snackbar.jsx';

module.exports = BaseComponent.createClass({
    componentDidMount: function(){
        this.props.controllers.user.init();
    },
    getCreatePath: function(options){
        if( options.view === 'createPath' ){
            return <div className="create-path-wrap">
                <CreatePath
                    controllers={this.props.controllers}
                    path={this.props.data.get('createPath')}
                />
            </div>;
        }
        return null;
    },
    getDrawer: function(options){
        return <Drawer
            controllers={this.props.controllers}
            open={this.props.data.getIn(['drawer', 'open'])}
        />
    },
    getHome: function(options){
        if( options.view === 'home' ){
            return <Home
                controllers={this.props.controllers}
                createPath={this.props.data.get('createPath')}
                recentPaths={this.props.data.get('recentPathsHome')}
            />
        }
    },
    getPath: function(options){
        if( options.view === 'path' ){
            return <Path
                controllers={this.props.controllers}
                createPath={this.props.data.get('createPath')}
                detailItem={this.props.data.get('detailItem')}
                user={this.props.data.get('user')}
                path={this.props.data.get('path')}
            />
        }
        return null;
    },
    getPaths: function(options){
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
            { this.getDrawer(options) }
            { this.getHome(options)}
            { this.getCreatePath(options) }
            { this.getPath(options) }
            { this.getPaths(options) }
            <Snackbar snackbar={this.props.data.get('snackbar')} />
		</div>;
	}
});