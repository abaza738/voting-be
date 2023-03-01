import { Users } from "src/auth/entities/user.entity";
import { Topics } from "src/topic/entities/topic.entity";
import { Column, CreateDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class Sessions {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'varchar' })
    name: string;

    @Column({ type: 'varchar', nullable: true })
    description: string;

    @ManyToOne(() => Users, (user) => user.id)
    user: Users;

    @OneToMany(() => Topics, (topic) => topic.id)
    topics: Topics[];

    @CreateDateColumn({ type: 'datetime' })
    createdAt: Date;

    @UpdateDateColumn({ type: 'datetime' })
    updatedAt: Date;
}
