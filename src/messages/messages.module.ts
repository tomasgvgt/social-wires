import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/database/database.module';
import { MessagesController } from './controllers/messages.controller';
import { MessagesService } from './services/messages.service';

@Module({
  imports: [DatabaseModule],
  controllers: [MessagesController],
  providers: [MessagesService]
})
export class MessagesModule {}
