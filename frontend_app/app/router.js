import page from 'page';

module.exports = function(options){

	var c = options.controllers;

	page.start();

	page('/', function(){
		c.view.showHome();
	});

	page('/path/create', function(){
		c.path.showCreate();
	});

	page('/path/get/:id', function(ctx){
		c.path.show({id: ctx.params.id});
	});

	page('/user/login', function(ctx){
		c.user.showLogin();
	})

	page('/user/register', function(ctx){
		c.user.showRegister();
	})

	page('*', function(){
		console.log('Route not found');
	});

	this.navigate = function(){
		page(window.location.pathname);
	}

}