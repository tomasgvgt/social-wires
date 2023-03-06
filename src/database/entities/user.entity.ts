import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, OneToMany } from 'typeorm';
import { Message } from './message.entity';
import { Comment } from './comment.entity';
import { Reaction } from './reaction.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({
    nullable: false
  })
  username: string;

  @Column({
    nullable: false
  })
  email: string;

  @Column({
    nullable: false
  })
  password: string

  @Column({
    nullable: false
  })
  fullname: string;

  @CreateDateColumn()
  created_at: Date;

  @OneToMany(()=> Message, (message)=> message.user)
  messages: Message[];

  @OneToMany(()=> Comment, (comment)=> comment.user)
  comments: Comment[];

  @OneToMany(()=> Reaction, (reaction)=> reaction.user)
  reactions: Reaction[];
}
