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

 return <main style={{padding:'40px'}}>
   <h1 style={{fontSize:'48px'}}>📖 CBook</h1>
   <p>Search all your favorite recipes instantly.</p>
   <div style={{display:'flex',gap:'10px',margin:'20px 0'}}>
    <Search/>
    <input value={query} onChange={e=>setQuery(e.target.value)} placeholder='Search recipes, categories, ingredients...' style={{padding:'12px',width:'350px'}} />
   </div>
   <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(260px,1fr))',gap:'20px'}}>
    {filtered.map((recipe,i)=><RecipeCard key={i} recipe={recipe}/>)}
   </div>
   <ClaudeChat/>
 </main>
}
