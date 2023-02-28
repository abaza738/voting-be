import { Topic } from "src/topic/entities/topic.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Session {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'varchar', unique: true })
    name: string;

    @OneToMany(() => Topic, (topic) => topic.name)
    topics: Topic[];
}
