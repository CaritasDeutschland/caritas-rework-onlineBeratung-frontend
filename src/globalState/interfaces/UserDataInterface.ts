export interface UserDataInterface {
	absenceMessage?: string;
	absent: boolean;
	agencies: [AgencyDataInterface];
	consultingTypes?: [
		{ [consultingType: number]: ConsultingTypeDataInterface }
	];
	email?: string;
	firstName?: string;
	formalLanguage: boolean;
	grantedAuthorities: [string];
	hasAnonymousConversations: boolean;
	inTeamAgency: boolean;
	lastName?: string;
	userId: string;
	userName: string;
}

export interface AgencyDataInterface {
	city: string;
	consultingType: number;
	description: string;
	id: number;
	name: string;
	offline: boolean;
	postcode: string;
	teamAgency: boolean;
	url?: string;
	external?: boolean;
}

export interface ConsultingTypeDataInterface {
	agency: AgencyDataInterface;
	isRegistered: boolean;
	sessionData: Object;
}
