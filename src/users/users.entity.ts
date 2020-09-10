import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('users')
export class UserEntity {
  @PrimaryGeneratedColumn('uuid')
  readonly userId: string;

  @Column({
    unique: true,
  })
  name: string;

  @Column({
    nullable: true,
  })
  readonly lastName: string;

  constructor(userId: string, name: string) {
    this.userId = userId;
    this.name = name;
    console.log('Creo User Entity para ' + this.name);
  }
}
