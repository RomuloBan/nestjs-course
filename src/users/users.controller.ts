import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth } from '@nestjs/swagger';
import { Auth } from '../auth/auth.decorator';
import { ValIdIdPipe } from '../pipes/validId.pipe';
import { UserDTO } from './user.dto';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get()
  async getAllUsers(): Promise<UserDTO[]> {
    return await this.usersService.getAllUsers();
  }

  @Get('/me')
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  async getUserById(@Auth() { id }: UserDTO): Promise<UserDTO> {
    return await this.usersService.getUserById(id);
  }

  @Post()
  async newUser(@Body() user: UserDTO): Promise<UserDTO> {
    return await this.usersService.newUser(user);
  }

  @Put(':id')
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  async updateUser(
    @Param('id', ValIdIdPipe) id: string,
    @Body() user: UserDTO,
  ): Promise<UserDTO> {
    return await this.usersService.updateUser(id, user);
  }

  @Delete(':id')
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  async deleteUser(
    @Param('id', ValIdIdPipe) userId: string,
    @Auth() { id }: UserDTO,
  ): Promise<void> {
    if (id === userId) {
      return await this.usersService.deleteUser(id);
    } else {
      throw new UnauthorizedException('No estás autorizado');
    }
  }
}
