import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return `Hello World! ${process.env.GEMINI_API_KEY}`;
  }
}
