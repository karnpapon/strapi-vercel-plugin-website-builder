import React, { useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import styled from 'styled-components';

import { Box } from '@strapi/design-system/Box';
import { Loader } from '@strapi/design-system/Loader';
import { Badge } from '@strapi/design-system/Badge';
import { Typography } from '@strapi/design-system/Typography';
import { Grid } from '@strapi/design-system/Grid';

import moment from 'moment';

import { requestPluginEndpoint } from '../../../../utils/requestPluginEndpoint';
import { getColor, DATETIME_FORMAT } from '../DeploymentList';

const DeploymentInfoDesc = styled(Typography)`
	margin-bottom: 0.5rem;
	display: flex;

	.label {
		font-weight: bolder;
		width: 7rem;
	}

	a {
		color: black;
	}
`;

const DeployImage = styled.div`
	align-items: center;
	display: flex;

	&:hover {
		opacity: 0.5;
	}
`;

const DeploymentInfo = styled.div`
	width: 100%;
	grid-column: 3 / -1;
	grid-template-columns: repeat(2, minmax(0, 1fr));
`;

const fetchDeployments = ({ id }) => requestPluginEndpoint(`deployments/${id}`);
const urlize = (url) => {
	return `https://${url}`;
};

const DeploymentLast = (props) => {
	const { deployment: deploy } = props;

	if (!deploy) return <Box>No last deployment found</Box>;

	const {
		data: deployment,
		error,
		isLoading,
	} = useQuery('get-deployment', () => fetchDeployments({ id: deploy.uid }));

	if (isLoading) {
		return (
			<Box padding={0} background="neutral100">
				<Loader>loading data...</Loader>
			</Box>
		);
	}

	if (error) return <Box>Error occured during fetching last deployment</Box>;

	return (
		<Box
			padding={[11, 6, 1]}
			background="neutral0"
			color="neutral700"
			shadow="filterShadow"
			hiddenXS
		>
			<Grid gap={5} gridCols={4}>
				<DeployImage>
					{deployment.readyState === 'READY' ? (
						<a
							href={urlize(deployment.url)}
							target="_blank"
							style={{ width: '400px', height: '250px', display: 'block' }}
						>
							<img
								height="250"
								title={deployment.url}
								alt={deployment.url}
								src={`https://api.microlink.io?url=${urlize(
									deployment.url
								)}&screenshot=true&meta=false&embed=screenshot.url`}
							/>
						</a>
					) : (
						<div className="waiting">Waiting for deployment to finish...</div>
					)}
				</DeployImage>
				<DeploymentInfo>
					<DeploymentInfoDesc className="mb-4">
						<p className="label">DEPLOYMENT</p>
						<div>
							<a href={urlize(deployment.url)} target="_blank">
								{deployment.url}
							</a>
						</div>
					</DeploymentInfoDesc>
					<DeploymentInfoDesc>
						<div className="label">DOMAINS</div>
						<div>
							{deployment.alias.map((alias) => (
								<div key={alias}>
									<a href={urlize(alias)} target="_blank">
										{alias}
									</a>
								</div>
							))}
						</div>
					</DeploymentInfoDesc>
					<DeploymentInfoDesc>
						<div className="label">STATE</div>
						<div>
							<Badge backgroundColor={getColor(deployment.readyState)}>
								{deployment.readyState}
							</Badge>
							{deployment.readyState === 'READY' &&
								` (${moment(deployment.ready).format(DATETIME_FORMAT)})`}
						</div>
					</DeploymentInfoDesc>
					<DeploymentInfoDesc>
						<div className="label">CREATED</div>
						<div>{moment(deployment.createdAt).format(DATETIME_FORMAT)}</div>
					</DeploymentInfoDesc>
					<DeploymentInfoDesc>
						<div className="label">TARGET</div>
						<div>{deployment.target}</div>
					</DeploymentInfoDesc>
				</DeploymentInfo>
			</Grid>
		</Box>
	);
};

export default DeploymentLast;
