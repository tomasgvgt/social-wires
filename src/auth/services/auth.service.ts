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
  async createUser(payload): Promise<any>{
    payload.password = await hashPassword(payload.password);
    let newUser = this.userRepo.create(payload);
    let savedUser: any= await this.userRepo.save(newUser);
    delete savedUser.password;
    delete savedUser.created_at;
    return savedUser;
  }
  authenticateUser(payload){
    //Authenticate password
    //Create a token with id
    //return requirements from project
  }

}
