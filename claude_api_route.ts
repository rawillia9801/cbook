import Anthropic from '@anthropic-ai/sdk';

export async function askClaude(message:string){
 const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY! });
 const msg = await client.messages.create({
   model:'claude-3-5-sonnet-20241022',
   max_tokens:300,
   messages:[{role:'user',content:`You are a helpful cooking assistant. ${message}`}]
 });
 return msg.content;
}
