import { Injectable, Inject } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { User } from 'src/database/entities/user.entity';
import { hashPassword, verifyPassword } from '../helpers/password';

@Injectable()
export class AuthService {
  userRepo: Repository<User>;
  constructor(
    @Inject('DATA_SOURCE')
    private dataSource: DataSource
  ){
    this.userRepo = this.dataSource.getRepository(User);
  }
  createUser(payload){
    const payload.password = hashPassword(payload.password);
    //Save new user 
    //return requirements from project
  }
  authenticateUser(payload){
    //Authenticate password
    //Create a token with id
    //return requirements from project
  }

}
