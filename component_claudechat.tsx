"use client";
import { useState } from 'react';
import { MessageCircle } from 'lucide-react';

export default function ClaudeChat(){
 const [msg,setMsg]=useState('Hi Cristy — I am Cristy\'s Helper. Ask me what to cook, what substitutes to use, or what to make with ingredients on hand.');
 const [input,setInput]=useState('');
 const [loading,setLoading]=useState(false);

 const askClaude=async()=>{
   if(!input || loading) return;
   const userMessage = input;
   setLoading(true);
   setMsg('Cristy\'s Helper is thinking...');
   setInput('');
   try{
     const res = await fetch('/api/helper',{
       method:'POST',
       headers:{'Content-Type':'application/json'},
       body:JSON.stringify({message:userMessage})
     });
     const data = await res.json();
     setMsg(data.reply || data.error || 'Cristy\'s Helper could not answer right now.');
   }catch{
     setMsg('Cristy\'s Helper could not answer right now.');
   }
   setLoading(false);
 }

 return <div style={{position:'fixed',right:'20px',bottom:'20px',background:'#fffaf2',padding:'20px',borderRadius:'24px',width:'300px',border:'1px solid #d9ccb8',boxShadow:'0 12px 24px rgba(0,0,0,0.12)'}}>
   <MessageCircle />
   <h4 style={{marginBottom:'8px'}}>Cristy's Helper</h4>
   <p style={{lineHeight:'1.6',minHeight:'95px',fontSize:'14px'}}>{msg}</p>
   <input value={input} onChange={e=>setInput(e.target.value)} placeholder='Ask Cristy\'s Helper...' style={{width:'100%',padding:'10px',marginBottom:'8px',borderRadius:'10px',border:'1px solid #ccb79d'}} />
   <button onClick={askClaude}>{loading?'Thinking...':'Send'}</button>
 </div>
}
