import { Content } from '@google/generative-ai';

export function createContent(text: string, image: string): Content[] {
  return [
    {
      role: 'user',
      parts: [
        {
          text,
        },
        {
          inlineData: {
            mimeType: 'image/png',
            data: image,
          },
        },
      ],
    },
  ];
}
