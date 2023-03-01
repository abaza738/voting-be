import { Injectable } from '@nestjs/common';
import { CreateSessionDto } from './dto/create-session.dto';
import { UpdateSessionDto } from './dto/update-session.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Sessions } from './entities/session.entity';
import { In, Repository } from 'typeorm';
import { Topics } from 'src/topic/entities/topic.entity';
import { Votes } from 'src/vote/entities/vote.entity';

@Injectable()
export class SessionService {
  constructor(
    @InjectRepository(Sessions) private sessionRepo: Repository<Sessions>,
    @InjectRepository(Votes) private voteRepo: Repository<Votes>,
  ) {}

  async create(req: any, createSessionDto: CreateSessionDto) {
    const newSession = this.sessionRepo.create({ ...createSessionDto, user: req.user });
    return this.sessionRepo.save(newSession);
  }

  async findAll(req: any) {
    return this.sessionRepo.find({ where: { user: req.user.id }, order: { updatedAt: 'DESC' } });
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
