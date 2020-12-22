declare namespace MessageService {
	namespace Schemas {
		export interface AttachmentDTO {
			/**
			 * example:
			 * filename.png
			 */
			'title': string;
			/**
			 * example:
			 * file
			 */
			'type': string;
			/**
			 * example:
			 * Description
			 */
			'description': string;
			/**
			 * example:
			 * /file-upload/ijxact7nd5SMpSwiS/file.png
			 */
			'title_link': string;
			/**
			 * example:
			 * true
			 */
			'title_link_download': boolean;
			/**
			 * example:
			 * /file-upload/ijxact7nd5SMpSwiS/file.png
			 */
			'image_url': string;
			/**
			 * example:
			 * image/png
			 */
			'image_type': string;
			/**
			 * example:
			 * 36461
			 */
			'image_size': number;
			/**
			 * example:
			 * /9j/2wBDAAYEBQYFBAYGBQY
			 */
			'image-preview'?: string;
		}
		export interface FileDTO {
			/**
			 * example:
			 * M73fE4WhYF4peYB3s
			 */
			_id: string;
			/**
			 * example:
			 * filename.jpg
			 */
			name: string;
			/**
			 * example:
			 * image/jepg
			 */
			type: string;
		}
		export interface ForwardMessageDTO {
			/**
			 * example:
			 * Lorem ipsum dolor sit amet, consetetur...
			 */
			message: string;
			/**
			 * Full qualified timestamp
			 * example:
			 * 2018-11-15T09:33:00.057Z
			 */
			timestamp: string;
			/**
			 * example:
			 * asker23
			 */
			username: string;
			/**
			 * example:
			 * ag89h3tjkerg94t
			 */
			rcUserId: string;
		}
		export interface MasterKeyDTO {
			/**
			 * example:
			 * sdj8wnFNASj324!ksldf9
			 */
			masterKey: string;
		}
		export interface MessageDTO {
			/**
			 * example:
			 * Lorem ipsum dolor sit amet, consetetur...
			 */
			message: string;
			/**
			 * example:
			 * true
			 */
			sendNotification?: boolean;
		}
		export interface MessageStreamDTO {
			messages: MessagesDTO[];
			/**
			 * example:
			 * 2
			 */
			count: string;
			/**
			 * example:
			 * 0
			 */
			offset: string;
			/**
			 * example:
			 * 2
			 */
			total: string;
			/**
			 * example:
			 * true
			 */
			success: string;
			/**
			 * example:
			 * true
			 */
			cleaned: string;
		}
		export interface MessagesDTO {
			/**
			 * example:
			 * M73fE4WhYF4peYB3s
			 */
			_id: string;
			alias?: ForwardMessageDTO;
			/**
			 * example:
			 * fR2Rz7dmWmHdXE8uz
			 */
			rid: string;
			/**
			 * example:
			 * Lorem ipsum dolor sit amet, consetetur...
			 */
			msg: string;
			/**
			 * Full qualified timestamp
			 * example:
			 * 2018-11-15T09:33:00.057Z
			 */
			ts: string;
			u: UserDTO;
			unread: boolean;
			mentions: string[];
			channels: string[];
			/**
			 * Full qualified timestamp
			 * example:
			 * 2018-11-15T09:33:00.057Z
			 */
			_updatedAt: string;
			attachments?: AttachmentDTO[];
			file?: FileDTO;
		}
		export interface UserDTO {
			/**
			 * example:
			 * vppRFqjrzTsTZ6iEn
			 */
			_id: string;
			/**
			 * example:
			 * test
			 */
			username: string;
			/**
			 * example:
			 * Mustermax
			 */
			name: string;
		}
	}
}
declare namespace Paths {
	namespace CreateFeedbackMessage {
		export interface HeaderParameters {
			RCToken: Parameters.RCToken;
			RCUserId: Parameters.RCUserId;
			RCFeedbackGroupId: Parameters.RCFeedbackGroupId;
		}
		namespace Parameters {
			export type RCFeedbackGroupId = string;
			export type RCToken = string;
			export type RCUserId = string;
		}
		export type RequestBody = MessageService.Schemas.MessageDTO;
		namespace Responses {
			export interface $201 {}
			export interface $400 {}
			export interface $401 {}
			export interface $403 {}
			export interface $500 {}
		}
	}
	namespace CreateMessage {
		export interface HeaderParameters {
			RCToken: Parameters.RCToken;
			RCUserId: Parameters.RCUserId;
			RCGroupId: Parameters.RCGroupId;
		}
		namespace Parameters {
			export type RCGroupId = string;
			export type RCToken = string;
			export type RCUserId = string;
		}
		export type RequestBody = MessageService.Schemas.MessageDTO;
		namespace Responses {
			export interface $201 {}
			export interface $400 {}
			export interface $401 {}
			export interface $403 {}
			export interface $500 {}
		}
	}
	namespace FindDraftMessage {
		export interface HeaderParameters {
			RCGroupId: Parameters.RCGroupId;
		}
		namespace Parameters {
			export type RCGroupId = string;
		}
		namespace Responses {
			export type $200 = string;
			export interface $204 {}
			export interface $400 {}
			export interface $401 {}
			export interface $403 {}
			export interface $500 {}
		}
	}
	namespace ForwardMessage {
		export interface HeaderParameters {
			RCToken: Parameters.RCToken;
			RCUserId: Parameters.RCUserId;
			RCGroupId: Parameters.RCGroupId;
		}
		namespace Parameters {
			export type RCGroupId = string;
			export type RCToken = string;
			export type RCUserId = string;
		}
		export type RequestBody = MessageService.Schemas.ForwardMessageDTO;
		namespace Responses {
			export interface $201 {}
			export interface $400 {}
			export interface $401 {}
			export interface $403 {}
			export interface $500 {}
		}
	}
	namespace GetMessageStream {
		export interface HeaderParameters {
			RCToken: Parameters.RCToken;
			RCUserId: Parameters.RCUserId;
		}
		namespace Parameters {
			export type Count = number;
			export type Offset = number;
			export type RCToken = string;
			export type RCUserId = string;
			export type RcGroupId = string;
		}
		export interface QueryParameters {
			rcGroupId: Parameters.RcGroupId;
			offset: Parameters.Offset;
			count: Parameters.Count;
		}
		namespace Responses {
			export type $200 = MessageService.Schemas.MessageStreamDTO;
			export interface $204 {}
			export interface $400 {}
			export interface $401 {}
			export interface $403 {}
			export interface $500 {}
		}
	}
	namespace SaveDraftMessage {
		export interface HeaderParameters {
			RCGroupId: Parameters.RCGroupId;
		}
		namespace Parameters {
			export type RCGroupId = string;
		}
		export type RequestBody = string;
		namespace Responses {
			export interface $200 {}
			export interface $201 {}
			export interface $400 {}
			export interface $401 {}
			export interface $403 {}
			export interface $500 {}
		}
	}
	namespace UpdateKey {
		export type RequestBody = MessageService.Schemas.MasterKeyDTO;
		namespace Responses {
			export interface $202 {}
			export interface $401 {}
			export interface $403 {}
			export interface $409 {}
			export interface $500 {}
		}
	}
}
