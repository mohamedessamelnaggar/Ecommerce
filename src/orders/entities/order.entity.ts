import { UserEntity } from "src/users/entities/user.entity";
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn, Timestamp } from "typeorm";
import { OrderStatus } from "../enums/order-status.enum";
import { shippingEntity } from "./shipping.entity";

@Entity({name:'orders'})
export class OrderEntity {

    @PrimaryGeneratedColumn()
    id:number;
    
    @CreateDateColumn()
    orderAt:Timestamp;

    @Column({type:"enum" , enum:OrderStatus , default:OrderStatus.PROCESSING} )
    status:string;

    @Column({nullable:true})
    shippedAT:Date;

    @Column({nullable:true})
    deliveredAt:Date;

    @ManyToOne(()=>UserEntity , (user)=>user.orders)
    ordersUpdateBy:UserEntity;


    @OneToOne(()=>shippingEntity , (ship)=>ship.order ,{cascade:true})
    @JoinColumn()
    shippingAddress:shippingEntity;
    
}
