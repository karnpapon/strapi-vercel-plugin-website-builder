import React, { useState, useEffect } from 'react';
import { useMutation, useQueryClient } from 'react-query';
import Publish from '@strapi/icons/Play';
import { HeaderLayout } from '@strapi/design-system/Layout';
import { Button } from '@strapi/design-system/Button';
import { Alert } from '@strapi/design-system/Alert';
import Information from '@strapi/icons/Information';
import { requestPluginEndpoint } from '../../../../utils/requestPluginEndpoint';

const triggerBuild = (target) =>
	requestPluginEndpoint(`deployments/${target}`, {
		method: 'POST',
	});

export const HomeHeaderLayout = () => {
	const queryClient = useQueryClient();
	const [isAlertBoxOpened, setIsAlertBoxOpen] = useState(false);

	const mutation = useMutation(() => triggerBuild('production'), {
		onSuccess: () => {
			queryClient.invalidateQueries('build-vercel');
			window.location.reload();
		},
		onError: () => {
			setIsAlertBoxOpen(true);
		},
	});

	const handleTrigger = async () => mutation.mutate();

	return (
		<>
			{isAlertBoxOpened && mutation.error && (
				<Alert
					closeLabel="Close alert"
					title="Error: Building error."
					variant="danger"
					onClose={() => setIsAlertBoxOpen(false)}
				>
					{JSON.stringify(mutation.error)}
				</Alert>
			)}
			<HeaderLayout
				primaryAction={
					mutation.isLoading ? (
						<Button disabled startIcon={<Information />} loading size="L">
							Building...
						</Button>
					) : (
						<Button onClick={handleTrigger} variant="default" startIcon={<Publish />} size="L">
							Trigger Build
						</Button>
					)
				}
				title="▲ Vercel Website Builder"
				subtitle="deploy Vercel website in one click."
			/>
		</>
	);
};
