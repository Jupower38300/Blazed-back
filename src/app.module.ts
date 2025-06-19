import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './users/users.entity';
import { UsersModule } from './users/users.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { APP_GUARD } from '@nestjs/core';
import { JwtGuard } from './auth/guards/jwt.guard';
import { ProfileModule } from './profile/profile.module';
import { IndustryModule } from './industry/industry.module';
import { MissionModule } from './mission/mission.module';
import { PostsModule } from './posts/posts.module';
import { CommentsModule } from './comments/comments.module';
import { ChatsModule } from './chats/chats.module';
import { MissionHistoryModule } from './mission_history/mission_history.module';
import { Profile } from './profile/entities/profile.entity';
import { Mission } from './mission/entities/mission.entity';
import { MissionHistory } from './mission_history/entities/mission_history.entity';
import { Chat } from './chats/entities/chat.entity';
import { Post } from './posts/entities/post.entity';
import { Comment } from './comments/entities/comment.entity';
import { Industry } from './industry/entities/industry.entity';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get<string>('DB_HOST'),
        port: configService.get<number>('DB_PORT'),
        database: configService.get<string>('DB_NAME'),
        username: configService.get<string>('DB_USERNAME'),
        password: configService.get<string>('DB_PASSWORD'),
        entities: [
          User,
          Profile,
          Mission,
          MissionHistory,
          Chat,
          Post,
          Comment,
          Industry,
        ],
        synchronize: true,
      }),
      inject: [ConfigService],
    }),
    UsersModule,
    AuthModule,
    ProfileModule,
    IndustryModule,
    MissionModule,
    PostsModule,
    CommentsModule,
    ChatsModule,
    MissionHistoryModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: JwtGuard,
    },
  ],
})
export class AppModule {}
