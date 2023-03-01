import { Module } from '@nestjs/common';
import { SessionService } from './session.service';
import { SessionController } from './session.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Session } from './entities/session.entity';
import { Topic } from 'src/topic/entities/topic.entity';
import { Vote } from 'src/vote/entities/vote.entity';

@Module({
  controllers: [SessionController],
  imports: [TypeOrmModule.forFeature([Session, Topic, Vote])],
  providers: [SessionService]
})
export class SessionModule {}
