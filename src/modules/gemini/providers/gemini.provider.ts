import { GenerativeModel, GoogleGenerativeAI } from '@google/generative-ai';
import { Provider } from '@nestjs/common';
import {
  GENERATION_CONFIG,
  SAFETY_SETTINGS,
} from '../../../config/gemini.config';
import { GEMINI_PRO_VISION_MODEL } from '../constants/gemini.constant';
import { env } from '../../../config/env.config';

export const GeminiProVisionModelProvider: Provider<GenerativeModel> = {
  provide: GEMINI_PRO_VISION_MODEL,
  useFactory: () => {
    const genAI = new GoogleGenerativeAI(env.GEMINI.KEY);
    return genAI.getGenerativeModel({
      model: env.GEMINI.PRO_VISION_MODEL,
      generationConfig: GENERATION_CONFIG,
      safetySettings: SAFETY_SETTINGS,
    });
  },
};
