import { Steps } from 'intro.js-react';
import * as React from 'react';
import { useContext, useCallback, useRef } from 'react';
import { useHistory } from 'react-router-dom';

import 'intro.js/introjs.css';
import './walkthrough.styles.scss';
import { UserDataContext } from '../../globalState';
import { apiPatchConsultantData } from '../../api';
import steps from './steps';
import { useTranslation } from 'react-i18next';
import { useAppConfig } from '../../hooks/useAppConfig';

export const Walkthrough = () => {
	const { t: translate } = useTranslation();

	const ref = useRef<any>();
	const settings = useAppConfig();
	const { userData, reloadUserData } = useContext(UserDataContext);
	const history = useHistory();

	const onChangeStep = useCallback(() => {
		ref.current.props.steps.forEach((step, key) => {
			if (step.element) {
				ref.current.introJs._introItems[key].element =
					document.querySelector(step.element);
				ref.current.introJs._introItems[key].position = step.position
					? step.position
					: 'bottom';
			}
		});
	}, [ref]);

	const stepsData = steps();
	// Sometimes when not even showing the modal the steps are triggering the on exist callback so it was causing
	// to enable the WalkThrough and this way prevents from render
	if (!userData.isWalkThroughEnabled || !settings.enableWalkthrough) {
		return null;
	}

	return (
		<Steps
			ref={ref}
			enabled={!userData.twoFactorAuth.isShown}
			onExit={() => {
				apiPatchConsultantData({
					walkThroughEnabled: !userData.isWalkThroughEnabled
				})
					.then(reloadUserData)
					.catch(console.log);
			}}
			steps={stepsData.map((step) => ({
				...step,
				title: translate(step.title),
				intro: translate(step.intro)
			}))}
			initialStep={0}
			options={{
				hidePrev: true,
				nextLabel: translate('walkthrough.step.next'),
				prevLabel: translate('walkthrough.step.prev'),
				doneLabel: translate('walkthrough.step.done'),
				showProgress: false,
				showBullets: true,
				showStepNumbers: false
			}}
			onBeforeChange={(nextStepIndex) => {
				if (stepsData[nextStepIndex]?.path) {
					history.push(stepsData[nextStepIndex].path);
					onChangeStep();
				}
			}}
		/>
	);
};
