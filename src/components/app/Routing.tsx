import * as React from 'react';
import { useContext, useEffect, useMemo } from 'react';
import { Route } from 'react-router-dom';
import {
	RouterConfigUser,
	RouterConfigConsultant,
	RouterConfigTeamConsultant,
	RouterConfigMainConsultant,
	RouterConfigPeerConsultant,
	RouterConfigAnonymousAsker
} from './RouterConfig';
import { AbsenceHandler } from './AbsenceHandler';
import {
	UserDataContext,
	hasUserAuthority,
	AUTHORITIES
} from '../../globalState';
import { history } from './app';
import { SessionsListWrapper } from '../sessionsList/SessionsListWrapper';
import { NavigationBar } from './NavigationBar';
import { Header } from '../header/Header';
import { FinishedAnonymousConversationHandler } from './FinishedAnonymousConversationHandler';

interface routingProps {
	logout?: Function;
}

export const Routing = (props: routingProps) => {
	const { userData } = useContext(UserDataContext);

	const routerConfig = useMemo(() => {
		if (hasUserAuthority(AUTHORITIES.VIEW_ALL_PEER_SESSIONS, userData)) {
			return RouterConfigMainConsultant();
		}
		if (hasUserAuthority(AUTHORITIES.USE_FEEDBACK, userData)) {
			return RouterConfigPeerConsultant();
		}
		if (
			hasUserAuthority(AUTHORITIES.CONSULTANT_DEFAULT, userData) &&
			userData.inTeamAgency
		) {
			return RouterConfigTeamConsultant();
		}
		if (hasUserAuthority(AUTHORITIES.CONSULTANT_DEFAULT, userData)) {
			return RouterConfigConsultant();
		}
		if (hasUserAuthority(AUTHORITIES.ANONYMOUS_DEFAULT, userData)) {
			return RouterConfigAnonymousAsker();
		}
		return RouterConfigUser();
	}, [userData]);

	useEffect(() => {
		history.push(
			'/sessions/' +
				(hasUserAuthority(AUTHORITIES.CONSULTANT_DEFAULT, userData)
					? 'consultant/sessionPreview'
					: 'user/view')
		);
	}, []); // eslint-disable-line react-hooks/exhaustive-deps

	return (
		<div className="app__wrapper">
			<NavigationBar
				routerConfig={routerConfig}
				handleLogout={() => props.logout()}
			/>

			<section className="contentWrapper">
				<Header />
				<div className="contentWrapper__list">
					{useMemo(
						() =>
							routerConfig.listRoutes.map(
								(route: any, index: any): JSX.Element => (
									<Route
										key={index}
										path={route.path}
										component={SessionsListWrapper}
									/>
								)
							),
						[routerConfig.listRoutes]
					)}
				</div>
				<div className="contentWrapper__detail">
					{useMemo(
						() =>
							routerConfig.detailRoutes.map(
								(route: any, index: any): JSX.Element => (
									<Route
										exact
										key={index}
										path={route.path}
										component={(props) => (
											<route.component
												{...props}
												type={route.type || null}
											/>
										)}
									/>
								)
							),
						[routerConfig.detailRoutes]
					)}

					{((hasUserProfileRoutes) => {
						if (hasUserProfileRoutes) {
							return (
								<div className="contentWrapper__userProfile">
									{routerConfig.userProfileRoutes.map(
										(
											route: any,
											index: any
										): JSX.Element => (
											<Route
												exact
												key={index}
												path={route.path}
												component={(props) => (
													<route.component
														{...props}
														type={
															route.type || null
														}
													/>
												)}
											/>
										)
									)}
								</div>
							);
						}
					})(typeof routerConfig.userProfileRoutes !== 'undefined')}
				</div>

				<div className="contentWrapper__profile">
					{useMemo(
						() =>
							routerConfig.profileRoutes?.map(
								(route: any, index: any): JSX.Element => (
									<Route
										exact
										key={index}
										path={route.path}
										component={(props) => (
											<route.component
												{...props}
												type={route.type || null}
											/>
										)}
									/>
								)
							),
						[routerConfig.profileRoutes]
					)}
				</div>
			</section>
			{hasUserAuthority(AUTHORITIES.CONSULTANT_DEFAULT, userData) && (
				<AbsenceHandler />
			)}
			{hasUserAuthority(AUTHORITIES.ANONYMOUS_DEFAULT, userData) && (
				<FinishedAnonymousConversationHandler />
			)}
		</div>
	);
};
