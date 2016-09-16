import page from 'page';

module.exports = function(options){

	var c = options.controllers;

	page.start();

	page('/', function(){
		console.log('home');
	});

	page('/argument/create', function(){
		console.log('create argument');
	});

	page('*', function(){
		console.log('Route not found');
	});

	this.navigate = function(){
		page(window.location.pathname);
	}

}