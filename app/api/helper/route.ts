import Anthropic from '@anthropic-ai/sdk';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const { message } = await req.json();

    if (!message || typeof message !== 'string') {
      return NextResponse.json({ error: 'Message is required.' }, { status: 400 });
    }

    if (!process.env.ANTHROPIC_API_KEY) {
      return NextResponse.json(
        { error: 'ANTHROPIC_API_KEY is not configured.' },
        { status: 500 }
      );
    }

    const anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

    const response = await anthropic.messages.create({
      model: 'claude-3-5-sonnet-20241022',
      max_tokens: 500,
      system:
        "You are Cristy's Helper, a warm practical recipe assistant inside Cristy's Recipes. Help with substitutions, meal ideas, recipe planning, cooking tips, and ways to use ingredients. Keep answers friendly, concise, and useful.",
      messages: [{ role: 'user', content: message }],
    });

    const text = response.content
      .map((part) => (part.type === 'text' ? part.text : ''))
      .join('\n')
      .trim();

    return NextResponse.json({ reply: text || 'I can help with that recipe.' });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: 'Cristy\'s Helper could not answer right now.' },
      { status: 500 }
    );
  }
}
