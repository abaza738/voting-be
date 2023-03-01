import { Topic } from "src/topic/entities/topic.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn, } from "typeorm";

@Entity()
export class Vote {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => Topic, (topic) => topic.id)
    topic: Topic;

    @Column({ type: 'varchar' })
    user: string;

    @Column({ type: 'varchar' })
    value: string;
}