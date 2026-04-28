"use client";
import { useState } from 'react';
import { MessageCircle } from 'lucide-react';

export default function ClaudeChat(){
 const [msg,setMsg]=useState('Hi Cristy — I am Cristy\'s Helper. Ask me what to cook, what substitutes to use, or what to make with ingredients on hand.');
 const [input,setInput]=useState('');
 const askClaude=()=>{
   if(!input) return;
   const q=input.toLowerCase();
   if(q.includes('chicken')) setMsg('Cristy\'s Helper: Chicken goes beautifully with garlic butter pasta, creamy casseroles, or a quick baked herb dinner.');
   else if(q.includes('dessert')) setMsg('Cristy\'s Helper: A warm cobbler, brownies, or banana pudding would be perfect.');
   else if(q.includes('substitute')) setMsg('Cristy\'s Helper: I can help with swaps — tell me which ingredient you are missing.');
   else setMsg('Cristy\'s Helper: I suggest something warm, simple, and family-friendly. Try searching your saved recipes or ask for a meal idea.');
   setInput('');
 }
 return <div style={{position:'fixed',right:'20px',bottom:'20px',background:'#fffaf2',padding:'20px',borderRadius:'24px',width:'300px',border:'1px solid #d9ccb8',boxShadow:'0 12px 24px rgba(0,0,0,0.12)'}}>
   <MessageCircle />
   <h4 style={{marginBottom:'8px'}}>Cristy's Helper</h4>
   <p style={{lineHeight:'1.6',minHeight:'95px',fontSize:'14px'}}>{msg}</p>
   <input value={input} onChange={e=>setInput(e.target.value)} placeholder='Ask Cristy\'s Helper...' style={{width:'100%',padding:'10px',marginBottom:'8px',borderRadius:'10px',border:'1px solid #ccb79d'}} />
   <button onClick={askClaude}>Send</button>
 </div>
}
