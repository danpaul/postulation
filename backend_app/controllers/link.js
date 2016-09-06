var _ = require('underscore');

module.exports = function(options){
	var m = options.models;
	var r = options.response;

	// /**
	//  * @param  {array}  options.nodes
	//  * @param  {int}  options.path
	//  */
	// this.formatLinksFromNodes = function(options){
	// 	if( !options || !options.nodes || !options.path ){
	// 		console.log(new Error('Missing options'));
	// 		return null;
	// 	}
	// 	var links = [];
	// 	for( var i = 0; i < options.nodes.length - 1; i++ ){
	// 		var link = {path: options.path};
	// 		link.from = options.nodes[i];
	// 		if( i < (options.nodes.length - 1) ){
	// 			link.to = options.nodes[i + 1];
	// 		}
	// 		if( i === (options.nodes.length - 2) ){
	// 			link.to_final = true;
	// 		}
	// 		links.push(link);
	// 	}
	// 	return links;
	// }
}