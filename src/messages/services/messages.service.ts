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

	async createMessage(id, payload): Promise<any> {
		const user = await this.userRepo.findOneBy({id});
		const newMessage = this.messageRepo.create({
			title: payload.title,
			text: payload.content,
			
		})
		newMessage.user = user;
		return await this.messageRepo.save(newMessage);
	}

	async getAllMessages(): Promise <any> {
		return await this.messageRepo.find();
	}

	async getUserMessages(id): Promise<any> {
		let user: any = await this.userRepo.findOne({
			where: {id},
			relations: ['messages']
		});
		return user.messages;
	}

	async getMessageById(userId, messageId): Promise<any> {

		const message = await this.messageRepo.findOne({
			where: {
				id: messageId,
				user: {id: userId}
			}
		});
		return message

		//const child = await childRepository.findOne({ where: { id: childId, parent: { id: parentId } } });
	}

	async deleteMessageFromUser(userId, messageId): Promise<any> {
		const message = await this.getMessageById(userId, messageId)
		console.log(message);
		await this.messageRepo.remove(message);
		return `Message successfully deleted`
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
