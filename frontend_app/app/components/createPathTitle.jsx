import BaseComponent from '../lib/baseComponent';
import React from 'react';
import TextField from 'material-ui/TextField';

const style = {marginBottom: 10};

module.exports = BaseComponent.createClass({
    onChange: function(e){
console.log(e.target.value);
    },
	render: function() {
		return <TextField
                style={style}
                fullWidth={true}
                floatingLabelText="Path Title"
                onBlur={this.props.controllers.createPath.validateForm}
                value={this.props.title}
                errorText={this.props.error}
                onChange={this.props.controllers.createPath.onTitleChange}
            />;
	}
});