import page from 'page';

module.exports = function(options){

	var c = options.controllers;

	page.start();

	page('/', function(){
		console.log('home');
	});

	page('/path/create', function(){
		c.path.showCreate();
	});

	page('/path/get/:id', function(ctx){
		c.path.show({id: ctx.params.id});
	});

	page('*', function(){
		console.log('Route not found');
	});

	this.navigate = function(){
		page(window.location.pathname);
	}

}