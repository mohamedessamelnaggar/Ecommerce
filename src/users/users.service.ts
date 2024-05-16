import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { hash ,compare } from 'bcrypt';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import {  UserSignUpDto } from './dto/user-signup.dto';
import { UserEntity } from './entities/user.entity';
import { UserSignInDto } from './dto/user-signin.dto';
import { sign } from 'jsonwebtoken';

@Injectable()
export class UsersService {

  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
  ) {}

  async signUp(userSignUpDto:UserSignUpDto):Promise<UserEntity>{
    const userExits = await this.findUserByEmail(userSignUpDto.email);
    if(userExits) throw new BadRequestException('Email is not available')
    userSignUpDto.password = await hash(userSignUpDto.password , 10)
    const user = this.userRepository.create(userSignUpDto);
    return await this.userRepository.save(user);
  }

  async signIn(userSignInDto:UserSignInDto):Promise<UserEntity>{
  
    const userExits = await this.userRepository
    .createQueryBuilder('users')
    .addSelect('users.password')
    .where('users.email=:email',{email: userSignInDto.email}).getOne();
    if(!userExits) throw new BadRequestException('Bad Credentials');
    const matchPassword = await compare(userSignInDto.password, userExits.password );
    if(!matchPassword) throw new BadRequestException("UnMatched Password");
    return userExits;

  }



  create(createUserDto: CreateUserDto) {
    return 'This action adds a new user';
  }

  async findAll() {
    return await this.userRepository.find();
  }

  async findOne(id: number):Promise<UserEntity> {
    return await this.userRepository.findOneBy({id});
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

  async accessToken(user:UserEntity):Promise<string>{
    return  sign({id:user.id , email:user.email},process.env.ACCESS_TOKEN_SECRET_KEY,{expiresIn:process.env.ACCESS_TOKEN_EXPIRE_TIME});

  }

}
