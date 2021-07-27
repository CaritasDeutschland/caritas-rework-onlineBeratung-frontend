import clsx from 'clsx';
import * as React from 'react';
import { config } from '../../resources/scripts/config';
import { translate } from '../../utils/translate';
import { Text } from '../text/Text';
import './legalInformationLinks.styles';

interface LegalInformationLinksProps {
	className?: string;
}

export const LegalInformationLinks = ({
	className
}: LegalInformationLinksProps) => {
	return (
		<div className={clsx(className, 'legalInformationLinks')}>
			<a href={config.urls.imprint}>
				<Text
					className="legalInformationLinks__linkLabel"
					text={translate('login.legal.infoText.impressum')}
					type="infoSmall"
				/>
			</a>
			<Text
				type="infoSmall"
				className="legalInformationLinks__separator"
				text=" | "
			/>
			<a href={config.urls.privacy}>
				<Text
					className="legalInformationLinks__linkLabel"
					text={translate('login.legal.infoText.dataprotection')}
					type="infoSmall"
				/>
			</a>
		</div>
	);
};
