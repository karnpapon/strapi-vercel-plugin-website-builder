import React from 'react';
import { Thead, Tr, Th } from '@strapi/design-system/Table';
import { Typography } from '@strapi/design-system/Typography';

export const headers = ['Date', 'URL', 'State', 'Target'];

export const LogTableHeaders = () => {
	return (
		<Thead>
			<Tr>
				{headers.map((header, i) => (
					<Th key={i}>
						<Typography variant="sigma">{header}</Typography>
					</Th>
				))}
			</Tr>
		</Thead>
	);
};
