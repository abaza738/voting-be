import { Module } from '@nestjs/common';
import { SessionService } from './session.service';
import { SessionController } from './session.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Sessions } from './entities/session.entity';
import { Topics } from 'src/topic/entities/topic.entity';
import { Votes } from 'src/vote/entities/vote.entity';

@Module({
  controllers: [SessionController],
  imports: [TypeOrmModule.forFeature([Sessions, Topics, Votes])],
  providers: [SessionService]
})
export class SessionModule {}
