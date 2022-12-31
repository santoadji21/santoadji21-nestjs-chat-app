import { Controller, Get, Post, Res } from '@nestjs/common';
import { ChatService } from './chat.service';

@Controller()
export class ChatController {
  constructor(private readonly chatService: ChatService) {}

  @Get('/api/chat')
  async Chat(@Res() res) {
    const messages = await this.chatService.getMessages();
    res.json(messages);
  }

  @Post('/api/chat')
  async PostChat(@Res() res) {
    // create chat app end point
    const messages = await this.chatService.getMessages();
    res.json(messages);
  }
}
