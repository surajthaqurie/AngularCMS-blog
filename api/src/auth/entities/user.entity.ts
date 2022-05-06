import { Post } from 'src/post/entities/post.entity';
import {
  BeforeInsert,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import * as bcrypt from 'bcryptjs';
import { Exclude } from 'class-transformer';
import { UserRoles } from '../user.role';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column()
  email: string;

  @Column({ select: false })
  // @Exclude()
  password: string;

  @Column({ default: null })
  profilePic: string;

  @Column({ type: 'enum', enum: UserRoles, default: UserRoles.Reader })
  roles: UserRoles;

  /********Relationship *************/
  @OneToMany(() => Post, (post) => post.user)
  posts: Post[];

  /******* Event listener *************/
  @BeforeInsert()
  async hashPassword() {
    this.password = await bcrypt.hash(this.password, 10);
  }
}
