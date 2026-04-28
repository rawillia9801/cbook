"use client";
import { useMemo, useState } from 'react';
import { Search } from 'lucide-react';
import { recipes } from './data_recipes';
import RecipeCard from './component_recipecard';
import ClaudeChat from './component_claudechat';

const categories = ['Breakfast','Dinner','Dessert','Holiday','Southern'];

export default function Home(){
 const [query,setQuery]=useState('');
 const filtered = useMemo(()=>recipes.filter(r=>
  r.title.toLowerCase().includes(query.toLowerCase()) ||
  r.category.toLowerCase().includes(query.toLowerCase()) ||
  r.ingredients.join(' ').toLowerCase().includes(query.toLowerCase())
 ),[query]);

 return <main style={{padding:'40px',maxWidth:'1280px',margin:'0 auto'}}>
   <section style={{background:'#fffaf2',padding:'50px',borderRadius:'28px',boxShadow:'0 12px 30px rgba(0,0,0,0.06)',marginBottom:'30px',textAlign:'center'}}>
    <h1 style={{fontSize:'64px',marginBottom:'10px'}}>Cristy\'s Recipes</h1>
    <div style={{width:'120px',height:'3px',background:'#b88b5a',margin:'18px auto'}}></div>
    <p style={{fontSize:'20px',marginBottom:'30px'}}>A beautifully searchable collection of all your homemade family favorites.</p>
    <div style={{display:'flex',justifyContent:'center',gap:'10px',marginBottom:'24px'}}>
      <Search/>
      <input value={query} onChange={e=>setQuery(e.target.value)} placeholder='Search recipes, ingredients, categories...' style={{padding:'16px',width:'480px',borderRadius:'16px',border:'1px solid #d7c8b4'}} />
    </div>
    <div style={{display:'flex',justifyContent:'center',gap:'12px',flexWrap:'wrap'}}>
      {categories.map((c,i)=><button key={i}>{c}</button>)}
      <button>+ Add New Recipe</button>
    </div>
   </section>

   <section>
    <h2 style={{fontSize:'34px',marginBottom:'20px'}}>Featured Family Recipes</h2>
    <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(280px,1fr))',gap:'24px'}}>
      {filtered.map((recipe,i)=><RecipeCard key={i} recipe={recipe}/>)}
    </div>
   </section>
   <ClaudeChat/>
 </main>
}
