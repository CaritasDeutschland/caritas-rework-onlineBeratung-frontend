import { config } from '../resources/scripts/config';
import { fetchData, FETCH_METHODS, FETCH_SUCCESS } from './fetchData';
import { GROUP_CHAT_API } from './apiPutGroupChat';

export interface groupChatSettings {
	topic: string;
	startDate: string;
	startTime: string;
	duration: number;
	repetitive: boolean;
}

export interface chatLinkData {
	groupId: string;
}

export const apiCreateGroupChat = async (
	createChatItem: groupChatSettings
): Promise<chatLinkData> => {
	let url = config.endpoints.groupChatBase + GROUP_CHAT_API.CREATE;
	// to do: Put this in config.ts (Tarik)
	url = url.replace('/new', '/v2/new');
	const chatData = JSON.stringify({ ...createChatItem });

	return fetchData({
		url: url,
		method: FETCH_METHODS.POST,
		bodyData: chatData,
		responseHandling: [FETCH_SUCCESS.CONTENT]
	});
};

export const apiUpdateGroupChat = async (
	groupChatId: number,
	createChatItem: groupChatSettings
): Promise<chatLinkData> => {
	const url =
		config.endpoints.groupChatBase + groupChatId + GROUP_CHAT_API.UPDATE;
	const chatData = JSON.stringify({ ...createChatItem });

	return fetchData({
		url: url,
		method: FETCH_METHODS.PUT,
		bodyData: chatData,
		responseHandling: [FETCH_SUCCESS.CONTENT]
	});
};
