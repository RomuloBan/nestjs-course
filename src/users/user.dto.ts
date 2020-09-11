import { ApiProperty } from '@nestjs/swagger';

export class UserDTO {
  @ApiProperty()
  readonly id?: string;

  @ApiProperty()
  readonly name: string;

  @ApiProperty()
  readonly lastName?: string;

  @ApiProperty()
  readonly password?: string;

  constructor(id: string, name: string, lastName: string, password: string) {
    this.id = id;
    this.name = name;
    this.lastName = lastName;
    this.password = password;
  }
}
