import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, ManyToOne, OneToMany } from 'typeorm';
import { User } from './user.entity';
import { Comment } from './comment.entity';
import { Reaction } from './reaction.entity';

@Entity()
export class Message {
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

  @ManyToOne(()=> User, (user)=> user.messages)
  user: User

  @OneToMany(()=> Comment, (comment)=> comment.message)
  comments: Comment[];

  @OneToMany(()=> Reaction, (reaction)=> reaction.message)
  reactions: Reaction[];
}

