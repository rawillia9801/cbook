"use client";
import { useMemo, useState } from "react";
import { Search, ChefHat, MessageCircle } from "lucide-react";

const starterRecipes = [
  { title: "Grandma's Pancakes", category: "Breakfast", ingredients: ["Flour", "Milk", "Eggs"], time: "20 min" },
  { title: "Creamy Chicken Pasta", category: "Dinner", ingredients: ["Chicken", "Pasta", "Cream"], time: "35 min" },
  { title: "Chocolate Brownies", category: "Dessert", ingredients: ["Cocoa", "Butter", "Sugar"], time: "40 min" }
];

export default function Home() {
  const [query, setQuery] = useState("");
  const [chat, setChat] = useState("Hi! I'm Claude Chef. Ask me what to cook.");

  const filtered = useMemo(() => starterRecipes.filter(r =>
    r.title.toLowerCase().includes(query.toLowerCase()) ||
    r.category.toLowerCase().includes(query.toLowerCase()) ||
    r.ingredients.join(' ').toLowerCase().includes(query.toLowerCase())
  ), [query]);

  return (
    <main style={{padding:'40px',fontFamily:'Arial'}}>
      <h1 style={{fontSize:'42px'}}>📖 CBook</h1>
      <p>Your searchable AI cookbook.</p>
      <div style={{display:'flex',gap:'10px',margin:'20px 0'}}>
        <Search />
        <input value={query} onChange={e=>setQuery(e.target.value)} placeholder="Search recipes or ingredients..." style={{padding:'10px',width:'320px'}} />
      </div>
      <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(240px,1fr))',gap:'20px'}}>
        {filtered.map((r,i)=>(<div key={i} style={{border:'1px solid #ddd',padding:'20px',borderRadius:'16px'}}>
          <ChefHat />
          <h3>{r.title}</h3>
          <p>{r.category} • {r.time}</p>
          <p>{r.ingredients.join(', ')}</p>
        </div>))}
      </div>
      <div style={{position:'fixed',right:'20px',bottom:'20px',border:'1px solid #ccc',padding:'20px',borderRadius:'20px',width:'300px',background:'#fff'}}>
        <MessageCircle />
        <h4>Claude Chef</h4>
        <p>{chat}</p>
        <button onClick={()=>setChat('Claude API route ready — add your Anthropic key and I will answer cooking questions dynamically.')}>Test AI</button>
      </div>
    </main>
  );
}
