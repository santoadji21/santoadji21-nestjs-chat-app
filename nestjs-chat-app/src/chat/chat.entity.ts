import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
} from 'typeorm';

@Entity()
export class Chat {
  @PrimaryGeneratedColumn('uuid')
  id: number;

  @Column({
    default: 'Anonymous',
  })
  name: string;

  @Column()
  message: string;

  @CreateDateColumn()
  created_at: Date;
}
