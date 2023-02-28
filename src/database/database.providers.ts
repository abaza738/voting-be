import { SqliteConnectionOptions } from 'typeorm/driver/sqlite/SqliteConnectionOptions'

export const config: SqliteConnectionOptions = {
  type: 'sqlite',
  migrationsRun: true,
  database: '../../db',
  entities: ['dist/**/*.entity{.ts,.js}'],
  synchronize: true,
  logger: 'debug',
  logging: true,
}