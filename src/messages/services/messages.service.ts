import { Injectable, Inject } from '@nestjs/common';
import { Message } from 'src/database/entities/message.entity';
import { User } from 'src/database/entities/user.entity';
import { DataSource, Repository } from 'typeorm';

@Injectable()
export class MessagesService {
	private messageRepo: Repository<Message>;
	private userRepo: Repository<User>;
	constructor(
		@Inject('DATA_SOURCE')
		private dataSource: DataSource){
			this.messageRepo = this.dataSource.getRepository(Message);
			this.userRepo = this.dataSource.getRepository(User);
		}

	async createMessage(payload): Promise<any> {
		const newMessage = this.messageRepo.create({
			title: payload.title,
			text: payload.content,
			//Set user Id according to the ID sent in authentication.
		})
		return await this.messageRepo.save(newMessage);
	}

	async getAllMessages(): Promise <any> {
		return await this.messageRepo.find();
	}

	async getUserMessages(id): Promise<any> {
		let theUser: any = await this.userRepo.findOneBy({id});
		return await this.messageRepo.find({
			where: {user: theUser}
		})
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
