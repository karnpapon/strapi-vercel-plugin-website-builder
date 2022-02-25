'use strict';

const axios = require('axios').default;
const { getPluginService } = require('../utils/getPluginService');

module.exports = ({ strapi }) => ({
	/**
	 * Makes a request to the url specified in the plugin config
	 *
	 * @param {object} options
	 * @param {object} options.settings The plugin setting
	 * @param {string} options.trigger The type of trigger that started the build
	 *
	 * @return {Promise<object>} response The response data from the url
	 */
	build: async ({ settings, triggers }) => {
		let status = 500;
		try {
			let requestConfig = { method: 'POST', data: {}, url: settings.url };
			if (settings.headers) {
				requestConfig.headers = settings.headers;
			}

			if (settings.body) {
				requestConfig.data = settings.body;
			}
			const buildResponse = await axios(requestConfig);
			status = buildResponse.status;
		} catch (error) {
			if (error.response) {
				status = error.response.status;
			}
		} finally {
			getPluginService(strapi, 'logService').create({
				triggers,
				status,
				timestamp: Date.now(),
			});
		}
		return { status };
	},
});
