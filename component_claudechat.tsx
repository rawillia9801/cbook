"use client";
import { useState } from 'react';
import { MessageCircle } from 'lucide-react';

export default function ClaudeChat(){
 const [msg,setMsg]=useState('Hi Cristy — I am Claude Chef. Ask me for substitutions, dinners, desserts, or ingredient help.');
 const [input,setInput]=useState('');
 const askClaude=()=>{
   if(!input) return;
   setMsg('Claude Chef thinks: For "'+input+'", I suggest garlic, butter, fresh herbs, and a simple comforting preparation. Full Anthropic live responses connect when API key is added.');
   setInput('');
 }
 return <div style={{position:'fixed',right:'20px',bottom:'20px',background:'#fffdf9',padding:'22px',borderRadius:'22px',width:'320px',border:'1px solid #e8dccd',boxShadow:'0 10px 24px rgba(0,0,0,0.08)'}}>
   <MessageCircle />
   <h4>Claude Chef</h4>
   <p style={{lineHeight:'1.5',minHeight:'90px'}}>{msg}</p>
   <input value={input} onChange={e=>setInput(e.target.value)} placeholder='Ask Claude Chef...' style={{width:'100%',padding:'10px',marginBottom:'8px'}} />
   <button onClick={askClaude}>Send</button>
 </div>
}
