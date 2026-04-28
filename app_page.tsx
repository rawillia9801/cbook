"use client";
import { useMemo, useState } from 'react';
import { Search } from 'lucide-react';
import { recipes } from './data_recipes';
import RecipeCard from './component_recipecard';
import ClaudeChat from './component_claudechat';

export default function Home(){
 const [query,setQuery]=useState('');
 const filtered = useMemo(()=>recipes.filter(r=>
  r.title.toLowerCase().includes(query.toLowerCase()) ||
  r.category.toLowerCase().includes(query.toLowerCase()) ||
  r.ingredients.join(' ').toLowerCase().includes(query.toLowerCase())
 ),[query]);

 return <main style={{padding:'50px',maxWidth:'1200px',margin:'0 auto'}}>
   <h1 style={{fontSize:'56px',marginBottom:'10px'}}>🍽️ Cristy\'s Recipes</h1>
   <p style={{fontSize:'18px',marginBottom:'25px'}}>A beautifully searchable collection of all your family favorites.</p>
   <div style={{display:'flex',gap:'10px',margin:'25px 0'}}>
    <Search/>
    <input value={query} onChange={e=>setQuery(e.target.value)} placeholder='Search recipes, categories, ingredients...' style={{padding:'14px',width:'420px',borderRadius:'14px',border:'1px solid #ccc'}} />
   </div>
   <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(280px,1fr))',gap:'24px'}}>
    {filtered.map((recipe,i)=><RecipeCard key={i} recipe={recipe}/>)}
   </div>
   <ClaudeChat/>
 </main>
}
