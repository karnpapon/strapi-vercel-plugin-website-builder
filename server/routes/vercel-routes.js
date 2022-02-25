'use strict';

module.exports = [
	{
		method: 'GET',
		path: '/deployments',
		handler: 'vercelController.find',
	},
	{
		method: 'GET',
		path: '/deployments/:id',
		handler: 'vercelController.findOne',
	},
	{
		method: 'POST',
		path: '/deployments/:target',
		handler: 'vercelController.deploy',
	},
];
