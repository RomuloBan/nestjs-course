import * as bcrypt from 'bcrypt';
import { BeforeInsert, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
@Entity('users')
export class UserEntity {
  @PrimaryGeneratedColumn('uuid')
  readonly userId: string;

  @Column({
    unique: true,
  })
  readonly name: string;

  @Column({
    nullable: true,
  })
  readonly lastName: string;

  @Column({ type: 'varchar', length: 70, nullable: true })
  password: string;

  @BeforeInsert()
  async hashPassword() {
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password, salt);
  }

  validatePassword(password: string): boolean {
    return bcrypt.compareSync(password, this.password);
  }

  constructor(
    userId: string,
    name: string,
    lastName: string,
    password: string,
  ) {
    this.userId = userId;
    this.name = name;
    this.lastName = lastName;
    this.password = password;
  }
}
