import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, ManyToOne, OneToMany } from 'typeorm';
import { User } from './user.entity';
import { Message } from './message.entity';

@Entity()
export class Comment {
  @PrimaryGeneratedColumn()
  id: string;

  @Column({
    nullable: false
  })
  title: string;

  @Column({
    nullable: false,
    type: 'text'
  })
  text: string;

  @CreateDateColumn()
  created_at: Date;

  @ManyToOne(()=> User, (user)=> user.comments)
  user: User

  @ManyToOne(()=> Message, (message)=> message.comments)
  message: Message
}

