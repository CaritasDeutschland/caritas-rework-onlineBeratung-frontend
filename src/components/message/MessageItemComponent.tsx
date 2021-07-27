import * as React from 'react';
import { useContext, useEffect, useState } from 'react';
import { getPrettyDateFromMessageDate } from '../../utils/dateHelpers';
import {
	UserDataContext,
	ActiveSessionGroupIdContext,
	SessionsDataContext,
	getActiveSession,
	hasUserAuthority,
	AUTHORITIES,
	ConsultingTypeInterface
} from '../../globalState';
import {
	SESSION_TYPES,
	getChatItemForSession
} from '../session/sessionHelpers';
import { ForwardMessage } from './ForwardMessage';
import { MessageMetaData } from './MessageMetaData';
import { CopyMessage } from './CopyMessage';
import { MessageUsername } from './MessageUsername';
import { markdownToDraft } from 'markdown-draft-js';
import { stateToHTML } from 'draft-js-export-html';
import { convertFromRaw, ContentState } from 'draft-js';
import { urlifyLinksInText } from '../messageSubmitInterface/richtextHelpers';
import { VideoCallMessage } from './VideoCallMessage';
import { FurtherSteps } from './FurtherSteps';
import { MessageAttachment } from './MessageAttachment';
import './message.styles';
import { isVoluntaryInfoSet } from './messageHelpers';
import { translate } from '../../utils/translate';

enum MessageType {
	FURTHER_STEPS = 'FURTHER_STEPS',
	FORWARD = 'FORWARD',
	UPDATE_SESSION_DATA = 'UPDATE_SESSION_DATA',
	VIDEOCALL = 'VIDEOCALL',
	FINISHED_CONVERSATION = 'FINISHED_CONVERSATION'
}

export interface ForwardMessageDTO {
	message: string;
	rcUserId: string;
	timestamp: any;
	username: string;
}

export interface VideoCallMessageDTO {
	eventType: 'IGNORED_CALL';
	initiatorRcUserId: string;
	initiatorUserName: string;
}
export interface MessageItem {
	id?: number;
	message: string;
	messageDate: string | number;
	messageTime: string;
	username: string;
	askerRcId?: string;
	userId: string;
	consultant?: {
		username: string;
	};
	groupId?: string;
	isNotRead: boolean;
	alias?: {
		forwardMessageDTO?: ForwardMessageDTO;
		videoCallMessageDTO?: VideoCallMessageDTO;
		messageType: MessageType;
	};
	attachments?: MessageService.Schemas.AttachmentDTO[];
	file?: MessageService.Schemas.FileDTO;
}

interface MessageItemComponentProps extends MessageItem {
	isOnlyEnquiry?: boolean;
	isMyMessage: boolean;
	type: string;
	clientName: string;
	resortData: ConsultingTypeInterface;
}

export const MessageItemComponent = (props: MessageItemComponentProps) => {
	const { userData } = useContext(UserDataContext);
	const { sessionsData } = useContext(SessionsDataContext);
	const { activeSessionGroupId } = useContext(ActiveSessionGroupIdContext);
	const [showAddVoluntaryInfo, setShowAddVoluntaryInfo] = useState<boolean>();
	const activeSession = getActiveSession(activeSessionGroupId, sessionsData);
	const rawMessageObject = markdownToDraft(props.message);
	const contentStateMessage: ContentState = convertFromRaw(rawMessageObject);
	const renderedMessage = contentStateMessage.hasText()
		? urlifyLinksInText(stateToHTML(contentStateMessage))
		: '';
	const hasRenderedMessage = renderedMessage && renderedMessage.length > 0;
	const chatItem = getChatItemForSession(activeSession);

	useEffect(() => {
		if (hasUserAuthority(AUTHORITIES.ASKER_DEFAULT, userData)) {
			const sessionData =
				userData.consultingTypes[chatItem.consultingType]?.sessionData;
			setShowAddVoluntaryInfo(
				!isVoluntaryInfoSet(sessionData, props.resortData)
			);
		}
	}, []); // eslint-disable-line react-hooks/exhaustive-deps

	const getMessageDate = () => {
		if (props.messageDate) {
			return (
				<div className="messageItem__divider">
					{typeof props.messageDate === 'number'
						? getPrettyDateFromMessageDate(props.messageDate)
						: props.messageDate}
				</div>
			);
		}
		return null;
	};

	const getUsernameType = () => {
		if (props.isMyMessage) {
			return 'self';
		}
		if (props.alias?.forwardMessageDTO) {
			return 'forwarded';
		}
		if (props.username === 'system') {
			return 'system';
		}
		if (isUserMessage()) {
			return 'user';
		}
		return 'consultant';
	};

	const isUserMessage = () =>
		props.userId === props.askerRcId ||
		(chatItem.moderators && !chatItem.moderators.includes(props.userId));
	const showForwardMessage = () =>
		hasRenderedMessage &&
		activeSession.type !== SESSION_TYPES.ENQUIRY &&
		chatItem.feedbackGroupId &&
		hasUserAuthority(AUTHORITIES.USE_FEEDBACK, userData) &&
		!activeSession.isFeedbackSession;

	const videoCallMessage: VideoCallMessageDTO =
		props.alias?.videoCallMessageDTO;
	const isFurtherStepsMessage =
		props.alias?.messageType === MessageType.FURTHER_STEPS;
	const isUpdateSessionDataMessage =
		props.alias?.messageType === MessageType.UPDATE_SESSION_DATA;
	const isVideoCallMessage =
		props.alias?.messageType === MessageType.VIDEOCALL;
	const isFinishedConversationMessage =
		props.alias?.messageType === MessageType.FINISHED_CONVERSATION;

	const messageContent = (): JSX.Element => {
		if (isFurtherStepsMessage) {
			return (
				<FurtherSteps
					consultingType={chatItem.consultingType}
					resortData={props.resortData}
				/>
			);
		} else if (isUpdateSessionDataMessage) {
			return (
				<FurtherSteps
					onlyShowVoluntaryInfo={true}
					handleVoluntaryInfoSet={() =>
						setShowAddVoluntaryInfo(false)
					}
					consultingType={chatItem.consultingType}
					resortData={props.resortData}
				/>
			);
		} else if (isFinishedConversationMessage) {
			return (
				<span className="messageItem__message--system">
					{translate('anonymous.session.systemMessage.chatFinished')}
				</span>
			);
		} else if (
			isVideoCallMessage &&
			videoCallMessage.eventType === 'IGNORED_CALL'
		) {
			return (
				<VideoCallMessage
					videoCallMessage={videoCallMessage}
					activeSessionUsername={
						activeSession.user?.username ||
						activeSession.consultant?.username
					}
					activeSessionAskerRcId={activeSession.session.askerRcId}
				/>
			);
		} else {
			return (
				<>
					<MessageUsername
						alias={props.alias?.forwardMessageDTO}
						isMyMessage={props.isMyMessage}
						isUser={isUserMessage()}
						type={getUsernameType()}
						userId={props.userId}
						username={props.username}
					></MessageUsername>

					<div
						className={
							props.isMyMessage && !props.alias
								? `messageItem__message messageItem__message--myMessage`
								: props.alias
								? `messageItem__message messageItem__message--forwarded`
								: `messageItem__message`
						}
					>
						<span
							dangerouslySetInnerHTML={{
								__html: renderedMessage
							}}
						></span>
						{props.attachments &&
							props.attachments.map((attachment, key) => (
								<MessageAttachment
									key={key}
									attachment={attachment}
									file={props.file}
									hasRenderedMessage={hasRenderedMessage}
								/>
							))}
						{activeSession.isFeedbackSession && (
							<CopyMessage
								right={props.isMyMessage}
								message={renderedMessage}
							></CopyMessage>
						)}
						{showForwardMessage() && (
							<ForwardMessage
								right={props.isMyMessage}
								message={props.message}
								messageTime={props.messageTime}
								askerRcId={props.askerRcId}
								groupId={chatItem.feedbackGroupId}
								username={props.username}
							></ForwardMessage>
						)}
					</div>
				</>
			);
		}
	};

	if (
		isFurtherStepsMessage &&
		hasUserAuthority(AUTHORITIES.CONSULTANT_DEFAULT, userData)
	) {
		return null;
	} else if (isUpdateSessionDataMessage && !showAddVoluntaryInfo) {
		return null;
	}

	return (
		<div
			className={`messageItem ${
				props.isMyMessage ? 'messageItem--right' : ''
			} ${isVideoCallMessage ? 'videoCallMessage' : ''}`}
		>
			{getMessageDate()}
			<div
				className={`
					messageItem__messageWrap
					${props.isMyMessage ? 'messageItem__messageWrap--right' : ''}
					${isFurtherStepsMessage ? 'messageItem__messageWrap--furtherSteps' : ''}
				`}
			>
				{messageContent()}

				<MessageMetaData
					isMyMessage={props.isMyMessage}
					isNotRead={props.isNotRead}
					messageTime={props.messageTime}
					type={getUsernameType()}
					isReadStatusDisabled={
						isVideoCallMessage || isFinishedConversationMessage
					}
				></MessageMetaData>
			</div>
		</div>
	);
};
