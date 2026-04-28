"use client";
import { useState } from 'react';
import { MessageCircle } from 'lucide-react';

export default function ClaudeChat(){
 const [msg,setMsg]=useState('Hi — I am Claude Chef.');
 return <div style={{position:'fixed',right:'20px',bottom:'20px',background:'#fff',padding:'20px',borderRadius:'18px',width:'280px',border:'1px solid #ccc'}}>
   <MessageCircle />
   <h4>Claude Chef</h4>
   <p>{msg}</p>
   <button onClick={()=>setMsg('Claude backend connected. Waiting for Anthropic API key for live cooking assistance.')}>Wake Chef</button>
 </div>
}
