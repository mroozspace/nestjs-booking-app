import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UsersService } from './users.service';
import { CurrentUser } from '../current-user.decorator';
import { UserDocument } from './model/user.schema';
import { JwtAuthGuard } from '../guards/jwt-auth.guard copy';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}
  @Get('all') // for debugging
  async getUsers() {
    return this.usersService.find();
  }

  @Post()
  async createUser(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  // necessary to install cookie-parser if still gets 401
  async getUser(@CurrentUser() user: UserDocument) {
    return user;
  }
}
