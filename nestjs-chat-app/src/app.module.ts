import { ChatController } from './chat/chat.controller';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ChatGateway } from './chat/chat.gateway';
import { ChatService } from './chat/chat.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Chat } from './chat/chat.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'nest-chat-app',
      database: 'nest-chat-app',
      entities: [Chat],
      synchronize: true,
    }),
    TypeOrmModule.forFeature([Chat]),
  ],
  controllers: [AppController, ChatController],
  providers: [AppService, ChatGateway, ChatService],
})
export class AppModule {}
