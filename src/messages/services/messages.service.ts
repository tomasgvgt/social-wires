import { Injectable, Inject } from '@nestjs/common';
import { Message } from 'src/database/entities/message.entity';
import { DataSource, Repository } from 'typeorm';

@Injectable()
export class MessagesService {
	private messageRepo: Repository<Message>;
	constructor(
		@Inject('DATA_SOURCE')
		private dataSource: DataSource){
			this.messageRepo = this.dataSource.getRepository(Message);
		}

	createMessage(payload): any {
		const newMessage = this.messageRepo.create({
			title: payload.title,
			text: payload.content,
			//Set user Id according to the ID sent in authentication.
		})
		return this.messageRepo.save(newMessage);
	}

	async getAllMessages(): Promise <any> {
		return await this.messageRepo.find();
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
