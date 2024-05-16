import { Roles } from "src/utility/common/user-roles.enum";
import { Exclude } from 'class-transformer';

import {Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, Timestamp, UpdateDateColumn } from "typeorm"

@Entity('users') 
export class UserEntity {
    @PrimaryGeneratedColumn()
    id:number;

    @Column()
    name:string;

    @Column({unique:true})
    email:string;

    @Column({select:false})
    @Exclude()
    password:string;

    @Column({type:"enum" , enum:Roles , array:true , default : [Roles.USER]})
    roles:Roles[];

    @CreateDateColumn()
    CreatedAt:Timestamp;

    @UpdateDateColumn()
    UpdatedAt:Timestamp;


}