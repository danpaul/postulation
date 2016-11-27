import BaseComponent from '../lib/baseComponent';
import React from 'react';
import Snackbar from 'material-ui/Snackbar';

module.exports = BaseComponent.createClass({
    render: function(){
        return <Snackbar
                open={this.props.snackbar.get('open')}
                message={this.props.snackbar.get('message')}
                autoHideDuration={3000}
            />
        ;
    }
});