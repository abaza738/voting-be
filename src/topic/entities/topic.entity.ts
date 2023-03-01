import { Session } from "src/session/entities/session.entity";
import { Vote } from "src/vote/entities/vote.entity";
import { Entity, Column, OneToMany, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Topic {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'varchar' })
    name: string;

    @OneToMany(() => Vote, (vote) => vote.id)
    votes: Vote[];

    @ManyToOne(() => Session, (session) => session.id)
    session: Session;
}