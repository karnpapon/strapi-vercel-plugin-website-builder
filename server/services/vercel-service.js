'use strict';

const axios = require('axios').default;
// const { getPluginService } = require('../utils/getPluginService');

// eslint-disable-next-line no-unused-vars
module.exports = ({ strapi }) => ({
	async getDeployments({ settings }) {
		const projectId = settings.projectId;
		const teamId = settings.teamId;
		const apiToken = settings.apiToken;
		const res = await this._getClient(apiToken).get(
			`/v6/now/deployments?projectId=${projectId}&limit=10${teamId ? `&teamId=${teamId}` : ''}`
		);
		return res.data;
	},

	async getDeployment({ id, settings }) {
		const apiToken = settings.apiToken;
		const res = await this._getClient(apiToken).get(`/v10/now/deployments/${id}`);
		return res.data;
	},

	async deploy({ target, settings }) {
		const projectId = settings.projectId;
		const triggers = settings.triggers;
		const apiToken = settings.apiToken;
		const res = await this._getClient(apiToken).get(
			`/v1/integrations/deploy/${projectId}/${triggers[target]}`
		);
		return res.data;
	},

	_getClient(apiToken) {
		if (!this._client) {
			this._client = axios.create({
				baseURL: 'https://api.vercel.com',
				headers: {
					Authorization: `Bearer ${apiToken}`,
					'Content-Type': 'application/json',
				},
			});
		}

		return this._client;
	},
});
