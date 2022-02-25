import React from 'react';
import PropTypes from 'prop-types';
import { Table, Tr, Td } from '@strapi/design-system/Table';
import { Typography } from '@strapi/design-system/Typography';
import { Badge } from '@strapi/design-system/Badge';
import moment from 'moment';

export const DATETIME_FORMAT = 'DD.MM.YYYY HH:mm:ss';

export const getColor = (state) => {
	switch (state) {
		case 'READY':
			return 'success200';
		case 'ERROR':
			return 'danger200';
		case 'QUEUED':
		case 'BUILDING':
			return 'neutral400';
	}
};

const DeploymentList = (props) => {
	const { deployment } = props;
	const create = moment(deployment.created).format(DATETIME_FORMAT);
	return (
		<>
			<Tr key={deployment.uid}>
				<Td>
					<Typography textColor="neutral800"> {create} </Typography>
				</Td>
				<Td>
					<Typography textColor="neutral800">{deployment.url}</Typography>
				</Td>
				<Td>
					<Badge backgroundColor={getColor(deployment.state)}>{deployment.state}</Badge>
				</Td>
				<Td>
					<Typography textColor="neutral800">{deployment.target}</Typography>
				</Td>
			</Tr>
		</>
	);
};

DeploymentList.propTypes = {
	deployment: PropTypes.shape({
		uid: PropTypes.string.isRequired,
		url: PropTypes.string.isRequired,
		state: PropTypes.string.isRequired,
		target: PropTypes.string.isRequired,
		created: PropTypes.number.isRequired,
	}).isRequired,
};

export { DeploymentList };
