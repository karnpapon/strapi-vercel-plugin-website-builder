'use strict';

const yup = require('yup');

const pluginConfigSchema = yup
	.object()
	.shape({
		projectId: yup.string().required('VERCEL_PROJECT_ID is required'),
		apiToken: yup.string().required('VERCEL_TOKEN is required'),
		triggers: yup
			.object()
			.shape({
        production: yup.string().required("VERCEL_TRIGGER_PRODUCTION is required"),
				type: yup.string().oneOf(['manual', 'cron', 'event']).required("trigger type is required"),
			})
			.required('triggers is required'),
	})
	.required('A config is required');

module.exports = {
	pluginConfigSchema,
};
