import { endpoints } from '../resources/scripts/endpoints';
import { fetchData, FETCH_METHODS } from './fetchData';

export enum ALIAS_MESSAGE_TYPES {
	E2EE_ACTIVATED = 'E2EE_ACTIVATED',
	FURTHER_STEPS = 'FURTHER_STEPS',
	UPDATE_SESSION_DATA = 'UPDATE_SESSION_DATA',
	VIDEOCALL = 'VIDEOCALL',
	USER_MUTED = 'USER_MUTED',
	USER_UNMUTED = 'USER_UNMUTED',
	REASSIGN_CONSULTANT = 'REASSIGN_CONSULTANT',
	MASTER_KEY_LOST = 'MASTER_KEY_LOST',
	REASSIGN_CONSULTANT_RESET_LAST_MESSAGE = 'REASSIGN_CONSULTANT_RESET_LAST_MESSAGE',
	APPOINTMENT_SET = 'APPOINTMENT_SET',
	APPOINTMENT_CANCELLED = 'APPOINTMENT_CANCELLED',
	APPOINTMENT_RESCHEDULED = 'APPOINTMENT_RESCHEDULED',
	INITIAL_APPOINTMENT_DEFINED = 'INITIAL_APPOINTMENT_DEFINED'
}
export interface ConsultantReassignment {
	toConsultantId: string;
	toConsultantName: string;
	toAskerName: string;
	fromConsultantId: string;
	fromConsultantName: string;
	status: ReassignStatus;
}

export enum ReassignStatus {
	REQUESTED = 'REQUESTED',
	CONFIRMED = 'CONFIRMED',
	REJECTED = 'REJECTED'
}
interface AliasMessageParams {
	rcGroupId: string;
	type: ALIAS_MESSAGE_TYPES;
	args?: ConsultantReassignment;
}

export const apiSendAliasMessage = async ({
	rcGroupId,
	type,
	args
}: AliasMessageParams): Promise<any> => {
	const url = `${endpoints.sendAliasMessage}`;

	return fetchData({
		url,
		headersData: { rcGroupId },
		method: FETCH_METHODS.POST,
		rcValidation: true,
		bodyData: JSON.stringify({
			messageType: type,
			args: args
		})
	});
};
