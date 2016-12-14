import page from 'page';

module.exports = function(options){

	var c = options.controllers;

	page.start();

	page('/', function(){
		c.view.showHome();
	});

	page('/about', function(){
		c.view.showAbout();
	});

	page('/path/create', function(){
		c.path.showCreate();
	});

	page('/path/get/:id', function(ctx){
		c.path.show({id: ctx.params.id});
	});

	page('/paths/recent', function(ctx){
		c.path.showRecent({page: 1});
	});

	page('/paths/recent/:page', function(ctx){
		c.path.show({page: ctx.params.page});
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
		if( window.location.pathname === '/' ){
			page('/about');
		} else {
			page(window.location.pathname);
		}
	}
}