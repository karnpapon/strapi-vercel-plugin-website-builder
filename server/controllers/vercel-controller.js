'use strict';

const { getPluginService } = require('../utils/getPluginService');

module.exports = ({ strapi }) => ({
	/**
	 *  Fetch Vercel all deployments.
	 *
	 * @return {Array} deployments.
	 */
	async find(ctx) {
		try {
			const settings = await getPluginService(strapi, 'settingsService').get();
			const deployments = await getPluginService(strapi, 'vercelService').getDeployments({
				settings,
			});
			ctx.send({ data: { deployments } });
		} catch (error) {
			ctx.badRequest();
		}
	},

	/**
	 *  Fetch Vercel deployment by id.
	 *
	 * @return {Array} deployments.
	 */
	async findOne(ctx) {
		const { id } = ctx.params;
		try {
			const settings = await getPluginService(strapi, 'settingsService').get();
			const data = await getPluginService(strapi, 'vercelService').getDeployment({ id, settings });
			ctx.send(data);
		} catch (error) {
			ctx.send({ error: e }, 400);
		}
	},

	/**
	 *  deploy Vercel webite.
	 *
	 * @return {Array} deployments.
	 */
	async deploy(ctx) {
		const { target } = ctx.params;
		try {
			const settings = await getPluginService(strapi, 'settingsService').get();
			const data = await getPluginService(strapi, 'vercelService').deploy({ target, settings });
			ctx.send(data, 200);
		} catch (e) {
			ctx.send({ error: e }, 400);
		}
	},
});
