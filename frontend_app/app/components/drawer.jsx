import BaseComponent from '../lib/baseComponent';
import Divider from 'material-ui/Divider';
import Drawer from 'material-ui/Drawer';
import React from 'react';
import MenuItem from 'material-ui/MenuItem';
import page from 'page';

module.exports = BaseComponent.createClass({
    handleCreateNewPathClick: function(){
        this.props.controllers.drawer.toggle();
        page('/path/create');
    },
    handleAboutClick: function(){
        this.props.controllers.drawer.toggle();
        page('/about');
    },
    handleToggle: function(){
        this.props.controllers.drawer.toggle();
    },
    render: function(){
        return <Drawer
          docked={false}
          width={300}
          open={this.props.open}
          onRequestChange={this.handleToggle}
        >
            <MenuItem onTouchTap={this.handleAboutClick}>About</MenuItem>
            <Divider />
            <MenuItem onTouchTap={this.handleCreateNewPathClick}>Create New path</MenuItem>
        </Drawer>
    }
});