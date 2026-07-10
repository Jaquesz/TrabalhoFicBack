import { Controller, Post, Get, Body, Param, Patch, Delete, UnauthorizedException } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

  

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}
  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);     }
  @Get()
  findAll() {  return this.usersService.findAll(); }

  @Get("/:id")
  findOne(@Param("id") id: string) {return this.usersService.findOne(id)}

  @Patch("/:id")
  update(@Param("id") id: string, @Body() dto: UpdateUserDto) {return this.usersService.update(id, dto)}

  @Delete("/:id")
  delete(@Param("id") id: string) {return this.usersService.Delete(id)}

  @Post('/login')
  async login(@Body() body: { email: string }) {
    const users = await this.usersService.findAll();
    const user = users.find(u => u.email === body.email);
    
    if (!user) {
      throw new UnauthorizedException('E-mail não cadastrado no banco de dados.');
    }
    
    return user;
  }
}
