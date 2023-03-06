import { Injectable, Inject } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { User } from 'src/database/entities/user.entity';

@Injectable()
export class AuthService {
  userRepo: Repository<User>;
  constructor(
    @Inject('DATA_SOURCE')
    private dataSource: DataSource
  ){
    this.userRepo = this.dataSource.getRepository(User);
  }
  
}
