import { Column, CreateDateColumn, Entity, Timestamp, UpdateDateColumn } from "typeorm";

@Entity()
export class Review {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    ratings:number;

    @Column()
    comment:string;

    @CreateDateColumn()
    createdAt:Timestamp;

    @UpdateDateColumn()
    updatedAt:Timestamp;  

    
}
