import Anthropic from '@anthropic-ai/sdk';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const { message } = await req.json();

    if (!message || typeof message !== 'string') {
      return NextResponse.json({ reply: 'Please ask me a cooking question.' });
    }

    if (!process.env.ANTHROPIC_API_KEY) {
      return NextResponse.json({ reply: 'Cristy\'s Helper is not connected yet, but I can still help with recipe ideas.' });
    }

    const anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

    const response = await anthropic.messages.create({
      model: 'claude-3-5-sonnet-20241022',
      max_tokens: 400,
      system:
        "You are Cristy's Helper, a warm personal kitchen assistant for Cristy. Cristy loves the beach, ocean themes, and lighthouses. Speak warmly while helping with meals, substitutions, desserts, pantry ideas, and family cooking inspiration.",
      messages: [{ role: 'user', content: message }],
    });

    const text = response.content.map((part:any) => part.type === 'text' ? part.text : '').join('\n').trim();

    return NextResponse.json({ reply: text || 'Let me help you find something delicious.' });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ reply: 'Cristy\'s Helper had trouble answering. Please ask again.' });
  }
}
