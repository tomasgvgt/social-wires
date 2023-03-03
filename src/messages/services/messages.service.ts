import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm/data-source';
import { Message } from '../../database/entities/message.entity';
import { Repository } from 'typeorm/repository/Repository';

@Injectable()
export class MessagesService {
	//constructor(@Inject('DATA_SOURCE') private db: DataSource){
	//}
	createMessage(payload): any {
		return {
			id: "",
			user: "",
			title: payload.title,
			text: payload.content,
			comments: [],
			reactions: [],
			createdAt: "" 
		}
	}

	async getAllMessages(): Promise <any> {
		//let messageRepo: Repository<Message> = this.db.getRepository(Message);
		//return await messageRepo.find();
	}

	getUserMessages(): string {
		return `Authenticated User Messages`;
	}

	getMessageById(id: number): string {
		return `Message with Id ${id}`;
	}

	deleteMessageFromUser(id: number): string {
		return `Message ${id} successfully deleted`
	}

	createReaction(id, payload): any {
		return {
			id,
			user: "",
			title: "",
			text: "",
			comments: [],
			reactions: [
				{
					"author": payload.author,
					"reaction:": payload.reaction
				}
			],
			createdAt: "" 
		}
	}

	createComment(id, payload): any {
		return {
			id,
			user: "",
			title: "",
			text: "",
			comments: [],
			reactions: [],
			createdAt: "" 
		}
	}
}
