import {
  ArgumentMetadata,
  BadRequestException,
  Injectable,
  PipeTransform,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from '../users/users.entity';

@Injectable()
export class ValIdIdPipe implements PipeTransform {
  constructor(
    @InjectRepository(UserEntity)
    public usersRepository: Repository<UserEntity>,
  ) {}

  async transform(id: any, metadata: ArgumentMetadata) {
    try {
      await this.usersRepository.findOneOrFail(id);
    } catch (err) {
      throw new BadRequestException('Id no existe');
    }

    return id;
  }
}
