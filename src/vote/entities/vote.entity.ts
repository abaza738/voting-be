import { Topics } from "src/topic/entities/topic.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn, } from "typeorm";

@Entity()
export class Votes {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => Topics, (topic) => topic.id)
    topic: Topics;

    @Column({ type: 'varchar' })
    user: string;

    @Column({ type: 'varchar' })
    value: string;
}