import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { hash } from 'bcrypt';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import {  UserSignUpDto } from './dto/user-signup.dto';
import { UserEntity } from './entities/user.entity';

@Injectable()
export class UsersService {

  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
  ) {}

  async signup(userSignUpDto:UserSignUpDto):Promise<UserEntity>{
    const userExits = await this.findUserByEmail(userSignUpDto.email);
    if(userExits) throw new BadRequestException('Email is not available')
    userSignUpDto.password = await hash(userSignUpDto.password , 10)
    const user = this.userRepository.create(userSignUpDto);
    return await this.userRepository.save(user);
  }

  create(createUserDto: CreateUserDto) {
    return 'This action adds a new user';
  }

  findAll() {
    return `This action returns all users`;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }

  async findUserByEmail(email){
    return this.userRepository.findOneBy({email});

  }
}
