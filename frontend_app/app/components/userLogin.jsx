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
        this.props.controllers.user.submitLoginForm();
    },
    onChangeEmail: function(e){
        this.updateField('email', e.target.value);
    },
    onChangePassword: function(e){
        this.updateField('password', e.target.value);
    },
    onBlurEmail: function(e){
        this.props.controllers.user.validateLoginEmail();
    },
    onBlurPassword: function(e){
        this.props.controllers.user.validateLoginPassword();
    },
    updateField: function(field, value){
        var d= {field: field, value: value};
        this.props.controllers.user.updateLoginFieldValue(d);
        this.props.controllers.user.validateLoginForm();
    },
	render: function() {
		return <div>
            <Paper style={STYLE} zDepth={1} >
                    <TextField
                        floatingLabelText="Email"
                        value={this.props.formData.get('email')}
                        fullWidth={true}
                        errorText={this.props.formData.get('emailError')}
                        onChange={this.onChangeEmail}
                        onBlur={this.onBlurEmail}
                    />
                    <TextField
                        floatingLabelText="Password"
                        type="password"
                        value={this.props.formData.get('password')}
                        fullWidth={true}
                        onBlur={this.onBlurPassword}
                        errorText={this.props.formData.get('passwordError')}
                        onChange={this.onChangePassword}
                    />
                    <RaisedButton
                        onClick={this.handleSubmit}
                        label="Login"
                        secondary={true}
                        disabled={!this.props.formData.get('formIsValid')}
                        style={{float: 'right'}} />
            </Paper>
		</div>;
	}
});