import { Injectable } from '@nestjs/common';
import { CreateSessionDto } from './dto/create-session.dto';
import { UpdateSessionDto } from './dto/update-session.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Session } from './entities/session.entity';
import { In, Repository } from 'typeorm';
import { Topic } from 'src/topic/entities/topic.entity';
import { Vote } from 'src/vote/entities/vote.entity';

@Injectable()
export class SessionService {
  constructor(
    @InjectRepository(Session) private sessionRepo: Repository<Session>,
    @InjectRepository(Vote) private voteRepo: Repository<Vote>,
  ) {}

  create(createSessionDto: CreateSessionDto) {
    return 'This action adds a new session';
  }

  async findAll(req: any) {
    console.log(req.user);
    const mySessions = await this.sessionRepo.find({ where: { user: req.user }});
    const votes = await this.voteRepo.find({ where: {  user: req.user }});
    const otherSessions = await this.sessionRepo.find({ where: { topics: [...votes.map(v => v.topic)] }})
    return [...mySessions, ...otherSessions];
  }

  findOne(name: string) {
    return this.sessionRepo.findOneBy({ name: name });
  }

  update(id: number, updateSessionDto: UpdateSessionDto) {
    return `This action updates a #${id} session`;
  }

  remove(id: number) {
    return `This action removes a #${id} session`;
  }
}
