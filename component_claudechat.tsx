"use client";
import { useState } from 'react';

export default function ClaudeChat(){
 const [msg,setMsg]=useState('Hi Cristy — I am Cristy\'s Helper. Need a dinner idea, dessert suggestion, or ingredient substitution?');
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

 return <div style={{background:'#efe1c8',padding:'28px',borderRadius:'28px',border:'1px solid #dbc9ab',boxShadow:'0 10px 24px rgba(0,0,0,0.07)'}}>
   <h3 style={{fontSize:'28px',marginBottom:'12px'}}>Cristy's Helper</h3>
   <p style={{lineHeight:'1.7',minHeight:'82px',marginBottom:'14px'}}>{msg}</p>
   <input value={input} onChange={e=>setInput(e.target.value)} placeholder='Ask for cooking help...' style={{width:'100%',padding:'12px',marginBottom:'10px'}} />
   <button onClick={askClaude}>{loading?'Thinking...':'Ask Helper'}</button>
 </div>
}
