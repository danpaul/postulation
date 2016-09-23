import BaseComponent from '../lib/baseComponent';
import React from 'react';
import FlatButton from 'material-ui/FlatButton';
import Paper from 'material-ui/Paper';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';

const STYLE = {
    margin: 20,
};

module.exports = BaseComponent.createClass({

    handleSubmit: function(){

    },
    onChangeUsername: function(e){
        this.updateField('username', e.target.value);
    },
    onBlurUsername: function(e){
        this.props.controllers.user.validateRegisterUsername();
    },
    updateField: function(field, value){
        var d= {field: field, value: value};
        this.props.controllers.user.updateRegisterFieldValue(d);
    },
	render: function() {
		return <div>
            <Paper style={STYLE} zDepth={1} >
                    <TextField
                        floatingLabelText="Username"
                        value={this.props.formData.get('username')}
                        multiLine={true}
                        fullWidth={true}
                        errorText={this.props.formData.get('usernameError')}
                        onChange={this.onChangeUsername}
                        onBlur={this.onBlurUsername}
                    />
                    <RaisedButton
                        onClick={this.handleSubmit}
                        label="Register"
                        secondary={true}
                        disabled={true}
                        style={{float: 'right'}} />
            </Paper>
		</div>;
	}
});