var page = require('page');

page.start();
page('/test', function(){
	console.log('test called');
})

console.log(window.location)
// page(window.location.pathname);
// page(window.location.pathname);


// console.log(page.start());

module.exports = function(options){

	// var controllers = options.controllers;
	// var data = options.data;

	// var navigate = this.navigate = function(params = null){
	// 	if( params ){ data.set('urlState', params); }
	// 	var urlState = data.get('urlState').toJS();
	// 	var page = urlState.page ? urlState.page : null;
	// 	if( urlState.cat ){
	// 		return controllers.post.load({cat: urlState.cat, page: page});
	// 	} else if( urlState.p ) {
	// 		return controllers.post.loadPost({p: urlState.p});
	// 	} else if( urlState.page_id ) {
	// 		return controllers.page.load({page: urlState.page_id});
	// 	} else if( urlState.tag ) {
	// 		return controllers.post.load({tag: urlState.tag, page: page});
	// 	} else if( urlState.view === 'home' ){
	// 		return controllers.post.load({categoryId: urlState.cat, page: page});
	// 	} else {
	// 		return this.navigate({view: 'home'});
	// 	}
	// }

	// this.goBack = function(){
	// 	var currentPage = data.get('currentPage');
	// 	var nextPage = (currentPage && currentPage > 1) ? (currentPage - 1) : 1;
	// 	this.goToPage(nextPage);
	// }

	// this.goForward = function(){
	// 	var currentPage = data.get('currentPage');
	// 	var nextPage = currentPage ? (currentPage + 1) : 1;
	// 	this.goToPage(nextPage);
	// }

	// this.goToPage = function(page){
	// 	data.set('currentPage', page);
	// 	data.set(['urlState', 'page'], page);
	// 	navigate();
	// }

 //    window.addEventListener("popstate", function(){
 //    	controllers.url.setParamsFromUrl();
 //    	navigate();
 //    });
}