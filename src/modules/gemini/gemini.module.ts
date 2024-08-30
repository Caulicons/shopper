import { Module } from '@nestjs/common';
import { GeminiProVisionModelProvider } from './providers/gemini.provider';
import { GeminiService } from './services/gemini.services';

@Module({
  providers: [GeminiService, GeminiProVisionModelProvider],
  exports: [GeminiService, GeminiProVisionModelProvider],
})
export class GeminiModule {}
