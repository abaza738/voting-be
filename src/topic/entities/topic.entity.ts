import { Sessions } from "src/session/entities/session.entity";
import { Votes } from "src/vote/entities/vote.entity";
import { Entity, Column, OneToMany, ManyToOne, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class Topics {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'varchar' })
    name: string;

    @OneToMany(() => Votes, (vote) => vote.id)
    votes: Votes[];

    @ManyToOne(() => Sessions, (session) => session.id)
    session: Sessions;

    @CreateDateColumn({ type: 'datetime' })
    createdAt: Date;

    @UpdateDateColumn({ type: 'datetime' })
    updatedAt: Date;
}