import { Controller, Get} from '@nestjs/common';
import { AppService } from './app.service';

@Controller('wires/')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getGreeting(): string {
    return this.appService.getGreeting();
  }
}
