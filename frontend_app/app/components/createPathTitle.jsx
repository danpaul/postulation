import BaseComponent from '../lib/baseComponent';
import React from 'react';
import TextField from 'material-ui/TextField';

const style = {marginBottom: 10, fontWeight: 'bold'};

module.exports = BaseComponent.createClass({
    onBlur: function(e){
        var d = {dataLocation: this.props.dataLocation};
        this.props.controllers.createPath.validateForm(d);
    },
    onChange: function(e){
        var d = {dataLocation: this.props.dataLocation, value: e.target.value};
        this.props.controllers.createPath.onTitleChange(d);
    },
	render: function(){
		return <TextField
                style={style}
                fullWidth={true}
                floatingLabelText="Path Title"
                onBlur={this.onBlur}
                value={this.props.title}
                errorText={this.props.error}
                onChange={this.onChange}
            />;
	}
});