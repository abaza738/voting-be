import { User } from "src/auth/entities/user.entity";
import { Topic } from "src/topic/entities/topic.entity";
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Session {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'varchar', unique: true })
    name: string;

    @ManyToOne(() => User, (user) => user.id)
    user: User;

    @OneToMany(() => Topic, (topic) => topic.id)
    topics: Topic[];
}
