import config from './config';
import React from 'react';
import ReactDOM from 'react-dom';
import Root from './components/root.jsx';
import injectTapEventPlugin from 'react-tap-event-plugin';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import data from './data';
import Controllers from './controllers';
import Router from './router';

injectTapEventPlugin();

var controllers = new Controllers({data: data, siteUrl: config.siteUrl});
var router = new Router({controllers: controllers});

var BaseComponent = React.createClass({
	componentDidMount: function(){
		data.subscribe(this.forceUpdate.bind(this));
		router.navigate();
	},
	render: function() {
		return <MuiThemeProvider>
				<Root
					router={router}
					data={data.getRoot()}
					controllers={controllers} />
			</MuiThemeProvider>
	}
});

ReactDOM.render(<BaseComponent />, document.getElementById('app-container'));