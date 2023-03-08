import { Controller, Get, Post, Patch, Delete, Param, Body, UseGuards, Req} from '@nestjs/common';
import { MessagesService } from '../services/messages.service';
import { CreateMessageDto } from '../dtos/create-message.dto';
import { CreateReactionDto} from '../dtos/create-reaction.dto';
import { CreateCommentDto } from '../dtos/create-comment.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';



@Controller('/wires/messages')
export class MessagesController {
  constructor(private readonly messagesService: MessagesService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  createMessage(@Req() request, @Body() payload: CreateMessageDto){
    return this.messagesService.createMessage(request.id, payload);
  }

  @Get()
  getAllMessages(){
    return this.messagesService.getAllMessages();
  }

  @Get('/me')
  @UseGuards(JwtAuthGuard)
  getUserMessages(@Req() request){
    console.log(request.id)
    return this.messagesService.getUserMessages(request.id);
  }

  @Get('/:id')
  @UseGuards(JwtAuthGuard)
  async getMessageById(@Req() request, @Param('id') id){
    const messageId = id;
    const userId: Promise<any> = await request.id;
    return this.messagesService.getMessageById(userId, messageId);
  }

  @Delete('/:id')
  @UseGuards(JwtAuthGuard)
  async deleteMessageFromUser(@Req() request, @Param('id') id){
    const messageId = id;
    const userId: Promise<any> = await request.id;
    return this.messagesService.deleteMessageFromUser(userId, messageId);
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
