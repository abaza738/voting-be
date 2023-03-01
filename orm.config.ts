import { Users } from 'src/auth/entities/user.entity';
import { Sessions } from 'src/session/entities/session.entity';
import { Topics } from 'src/topic/entities/topic.entity';
import { Votes } from 'src/vote/entities/vote.entity';
import { SqliteConnectionOptions } from 'typeorm/driver/sqlite/SqliteConnectionOptions'

export const config: SqliteConnectionOptions = {
  type: 'sqlite',
  migrationsRun: true,
  database: 'db',
  entities: [Users, Sessions, Topics, Votes,],
  synchronize: true,
  logging: true,
};
