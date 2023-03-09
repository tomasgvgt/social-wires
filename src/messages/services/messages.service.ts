import { Injectable, Inject } from '@nestjs/common';
import { Message } from 'src/database/entities/message.entity';
import { User } from 'src/database/entities/user.entity';
import { Comment } from 'src/database/entities/comment.entity';
import { Reaction } from 'src/database/entities/reaction.entity';
import { DataSource, Repository } from 'typeorm';

@Injectable()
export class MessagesService {
	private messageRepo: Repository<Message>;
	private userRepo: Repository<User>;
	private commentRepo: Repository<Comment>;
	private reactionRepo: Repository<Reaction>;
	constructor(
		@Inject('DATA_SOURCE')
		private dataSource: DataSource){
			this.messageRepo = this.dataSource.getRepository(Message);
			this.userRepo = this.dataSource.getRepository(User);
			this.commentRepo = this.dataSource.getRepository(Comment);
			this.reactionRepo = this.dataSource.getRepository(Reaction);
		}

	async createMessage(id, payload): Promise<any> {
		const user = await this.userRepo.findOneBy({id});
		console.log("user: " + user);
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

	async createReaction(userId, messageId, payload): Promise<any> {
		let message = await this.messageRepo.findOne({
			where: {
				id: messageId,
			}
		});
		if(message === null) return "Message doesn't exist";
		let messageFromThesameUser = await this.messageRepo.findOne({
			where: {
				id: messageId,
				user: {id: userId}
			}
		});
		if(messageFromThesameUser !== null) return "A user cant  react to its messages"
		const newReaction = this.reactionRepo.create({
			reaction: payload.reaction,
			author: payload.author,
		})
		newReaction.message = message;
		await this.reactionRepo.save(newReaction);
		return message
	}

	async createComment(userId, messageId, payload): Promise<any> {
		let message = await this.messageRepo.findOne({
			where: {
				id: messageId,
			}
		});
		if(message === null) return "Message doesn't exist";
		let messageFromThesameUser = await this.messageRepo.findOne({
			where: {
				id: messageId,
				user: {id: userId}
			}
		});
		if(messageFromThesameUser !== null) return "A user cant comment its messages"
		const newComment = this.commentRepo.create({
			comment: payload.comment,
			author: payload.author,
		})
		newComment.message = message;
		await this.commentRepo.save(newComment);
		return newComment;
	}
}
