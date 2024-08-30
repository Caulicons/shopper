import { GenerativeModel } from '@google/generative-ai';
import {
  Inject,
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { GEMINI_PRO_VISION_MODEL } from '../constants/gemini.constant';
import { GenAiResponse } from '../dto/response.interface';
import { createContent } from '../helpers/createContent.helper';

@Injectable()
export class GeminiService {
  private readonly logger = new Logger(GeminiService.name);

  constructor(
    @Inject(GEMINI_PRO_VISION_MODEL)
    private readonly proVisionModel: GenerativeModel,
  ) {}

  async generateTextFromImageBase64(
    prompt: string,
    image: string,
  ): Promise<GenAiResponse> {
    try {
      const contents = createContent(prompt, image);

      const { totalTokens } = await this.proVisionModel.countTokens({
        contents,
      });
      this.logger.log(`Tokens: ${JSON.stringify(totalTokens)}`);

      const text = (
        await this.proVisionModel.generateContent({ contents })
      ).response.text();

      this.logger.log(JSON.stringify(text));
      return { totalTokens, text };
    } catch (err) {
      if (err instanceof Error) {
        throw new InternalServerErrorException(err.message, err.stack);
      }
      throw err;
    }
  }
}
