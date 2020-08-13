import * as React from 'react';
import { translate } from '../../../resources/ts/i18n/translate';

interface SendMessageButtonProps {
	clicked?: boolean;
	deactivated?: number;
	handleSendButton: Function;
}

export const SendMessageButton = (props: SendMessageButtonProps) => {
	return (
		<span
			onClick={() => props.handleSendButton()}
			className={`inputIcon__wrapper ${
				props.clicked ? 'inputIcon__wrapper--clicked' : ''
			} ${props.deactivated ? 'inputIcon__wrapper--deactivated' : ''}`}
			title={translate('enquiry.write.input.button.title')}
		>
			<svg
				id="sendMessage"
				className="textarea__icon inputField__icon"
				xmlns="http://www.w3.org/2000/svg"
				xmlnsXlink="http://www.w3.org/1999/xlink"
				width="72"
				height="72"
				viewBox="0 0 72 72"
			>
				<defs>
					<path
						id="paper-plane-a"
						d="M8.7878386,60.2337835 C8.5388849,60.3404779 8.27085355,60.3954934 8,60.3954934 C6.8954305,60.3954934 6,59.5000629 6,58.3954934 L6,43.1273989 C6,42.1477087 6.70966458,41.312233 7.67644995,41.1537436 L40.8571429,35.7142857 L7.67644995,30.2748279 C6.70966458,30.1163385 6,29.2808627 6,28.3011725 L6,13.033078 C6,12.7622245 6.0550155,12.4941931 6.16170994,12.2452394 C6.59682118,11.2299799 7.77257903,10.7596767 8.7878386,11.194788 L61.7106565,33.8759957 C62.1826863,34.0782941 62.5588095,34.4544174 62.761108,34.9264471 C63.1962192,35.9417067 62.7259161,37.1174645 61.7106565,37.5525758 L8.7878386,60.2337835 Z"
					/>
				</defs>
				<g fill="none" fillRule="evenodd">
					<mask id="paper-plane-b" fill="#fff">
						<use xlinkHref="#paper-plane-a" />
					</mask>
					<rect
						width="72.22"
						height="72.203"
						fill="#000"
						fillRule="nonzero"
						mask="url(#paper-plane-b)"
					/>
				</g>
			</svg>
		</span>
	);
};
