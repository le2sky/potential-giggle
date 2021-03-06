import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { ConfigModule } from '@nestjs/config';
import emailConfig from './config/emailConfig';
import { validationSchema } from './config/validationSchema';
import { TypeOrmModule } from '@nestjs/typeorm';
import authConfig from './config/authConfig';
import { EmailModule } from './email/email.module';
import { HealthCheckController } from './health-check/health-check.controller';
import { TerminusModule } from '@nestjs/terminus';
import { HttpModule } from '@nestjs/axios';
import { DogHealthIndicator } from './health-check/dog.health';
import { CqrsModule } from '@nestjs/cqrs';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: `${__dirname}/config//env/.${process.env.NODE_ENV}.env`,
      load: [emailConfig, authConfig],
      isGlobal: true,
      validationSchema,
    }),
    // WinstonModule.forRoot({
    //   transports: [
    //     new winston.transports.Console({
    //       level: process.env.NODE_ENV === 'production' ? 'info' : 'silly',
    //       format: winston.format.combine(
    //         winston.format.timestamp(),
    //         nestWinstonModuleUtilities.format.nestLike('MyApp', {
    //           prettyPrint: true,
    //         }),
    //       ),
    //     }),
    //   ],
    // }),
    TypeOrmModule.forRoot(),
    UsersModule,
    EmailModule,
    TerminusModule,
    HttpModule,
    CqrsModule,
  ],
  controllers: [HealthCheckController],
  providers: [DogHealthIndicator],
})
export class AppModule {}
