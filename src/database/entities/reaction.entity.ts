import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, ManyToOne, OneToMany } from 'typeorm';
import { User } from './user.entity';
import { Message } from './message.entity';

@Entity()
export class Reaction {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  reaction: string;

  @Column()
  author: string;

  @CreateDateColumn()
  created_at: Date;

  @ManyToOne(()=> User, (user)=> user.comments)
  user: User

  @ManyToOne(()=> Message, (message)=> message.comments)
  message: Message
}

