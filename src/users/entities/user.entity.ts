import { Roles } from "src/utility/common/user-roles.enum";
import { Exclude } from 'class-transformer';

import {Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, Timestamp, UpdateDateColumn } from "typeorm"
import { CategoryEntity } from "src/categories/entities/category.entity";

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

    @OneToMany(()=>CategoryEntity , (cat)=>cat.addedBy)
    categories:CategoryEntity[];


}