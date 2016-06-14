// Simulate config options from your production environment by
// customising the .env file in your project's root folder.
require('dotenv').load();

// Require keystone
var keystone = require('keystone');
var handlebars = require('express-handlebars');
var social = require('keystone-social-login');

// Initialise Keystone with your project's configuration.
// See http://keystonejs.com/guide/config for available options
// and documentation.

keystone.init({

	'name': 'House Manager',
	'brand': 'MGSoft',

	'sass': 'public',
	'static': 'public',
	'favicon': 'public/favicon.ico',
	'views': 'templates/views',
	'view engine': 'hbs',

	'custom engine': handlebars.create({
		layoutsDir: 'templates/views/layouts',
		partialsDir: 'templates/views/partials',
		defaultLayout: 'default',
		helpers: new require('./templates/views/helpers')(),
		extname: '.hbs',
	}).engine,

	'auto update': true,
	'session': true,
	'auth': true,
	'user model': 'User',

});

//Social Media Logins

social.config({
    keystone: keystone,
    providers: {
        // google: {
        //     clientID: 'your-client-id',
        //     clientSecret: 'your-client-secret'
        // },
        // facebook: {
        //     clientID: 'your-client-id',
        //     clientSecret: 'your-client-secret'
        // },
        github: {
            clientID: '40477c44871f44365255',
            clientSecret: 'bc122fd6a2ea2931ec8c4f235ee98a4bfa087f98'
        },
        // twitter: {
        //     clientID: 'your-client-id',
        //     clientSecret: 'your-client-secret'
        // }
    }
});

// Load your project's Models

keystone.import('models');

// Setup common locals for your templates. The following are required for the
// bundled templates and layouts. Any runtime locals (that should be set uniquely
// for each request) should be added to ./routes/middleware.js

keystone.set('locals', {
	_: require('underscore'),
	env: keystone.get('env'),
	utils: keystone.utils,
	editable: keystone.content.editable,
});

// Load your project's Routes

keystone.set('routes', require('./routes'));

social.start();


// Switch Keystone Email defaults to handlebars

keystone.Email.defaults.templateExt = 'hbs';
keystone.Email.defaults.templateEngine = require('handlebars');


// Configure the navigation bar in Keystone's Admin UI

keystone.set('nav', {
	posts: ['posts', 'post-categories'],
	galleries: 'galleries',
	enquiries: 'enquiries',
	users: 'users',
});

// Start Keystone to connect to your database and initialise the web server

keystone.start();
