"use client";
import { useState } from 'react';
import { MessageCircle } from 'lucide-react';

export default function ClaudeChat(){
 const [msg,setMsg]=useState('Hi Cristy — I am Claude Chef. Ask me for substitutions, dinners, desserts, or ingredient help.');
 return <div style={{position:'fixed',right:'20px',bottom:'20px',background:'#fffdf9',padding:'22px',borderRadius:'22px',width:'300px',border:'1px solid #e8dccd',boxShadow:'0 10px 24px rgba(0,0,0,0.08)'}}>
   <MessageCircle />
   <h4>Claude Chef</h4>
   <p style={{lineHeight:'1.5'}}>{msg}</p>
   <button onClick={()=>setMsg('Claude backend connected. Anthropic live answers will activate once API key is added.')}>Wake Chef</button>
 </div>
}
