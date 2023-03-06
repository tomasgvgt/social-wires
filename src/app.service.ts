import { Injectable, Inject } from '@nestjs/common';

@Injectable()
export class AppService {
  getGreeting(): string {
    return 'Welcome to Social Wires'
  }
}
