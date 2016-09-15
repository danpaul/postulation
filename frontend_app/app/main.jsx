var React = require('react');
var ReactDOM = require('react-dom');
var Root = require('./components/root.jsx');

import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';


// var data = require('./data');
// data.set('site', wpData);
// var controllers = new (require('./controllers'))
// 					  ({data: data, siteUrl: wpData.siteUrl});
var router = new(require('./router'))();
// 				({controllers: controllers, data: data});

var BaseComponent = React.createClass({
	componentDidMount: function(){
		// data.subscribe(this.forceUpdate.bind(this));
		// controllers.url.setParamsFromUrl();
		// router.navigate();
	},
	// render: function() {
	// 	return <Root
	// 		router={router}
	// 		data={data.getRoot()}
	// 		controllers={controllers} 	/>
	// }
	render: function() {
		return <MuiThemeProvider>
				<Root
					router={router} />
			</MuiThemeProvider>
	}
});

ReactDOM.render(<BaseComponent />, document.getElementById('app-container'));