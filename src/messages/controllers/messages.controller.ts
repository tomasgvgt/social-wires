import { Controller, Get, Post, Patch, Delete, Param, Body} from '@nestjs/common';
import { MessagesService } from '../services/messages.service';
import { CreateMessageDto } from '../dtos/create-message.dto';
import { CreateReactionDto} from '../dtos/create-reaction.dto';
import { CreateCommentDto } from '../dtos/create-comment.dto';



@Controller('/wires/messages')
export class MessagesController {
  constructor(private readonly messagesService: MessagesService) {}
  @Post()
  createMessage(@Body() payload: CreateMessageDto){
    return this.messagesService.createMessage(payload);
  }

  @Get()
  getAllMessages(){
    return this.messagesService.getAllMessages();
  }

  @Get('/me')
  getUserMessages(){
    return this.messagesService.getUserMessages();
  }

  @Get('/:id')
  getMessageById(@Param('id') id: number){
    return this.messagesService.getMessageById(id);
  }

  @Delete('/:id')
  deleteMessageFromUser(@Param('id') id: number){
    return this.messagesService.deleteMessageFromUser(id);
  }

  @Patch('/reaction/:id')
  createReaction(@Param('id') id: number, @Body() payload: CreateReactionDto){
    return this.messagesService.createReaction(id, payload);
  }

  @Patch('/comment/:id')
  createComment(@Param('id') id: number , @Body() payload: CreateCommentDto){
    return this.messagesService.createComment(id, payload);
  }

}
