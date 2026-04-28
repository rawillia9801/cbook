"use client";
import { useMemo, useState, useEffect } from 'react';
import { Search } from 'lucide-react';
import { recipes as starterRecipes } from './data_recipes';
import RecipeCard from './component_recipecard';
import ClaudeChat from './component_claudechat';

const categories = ['Breakfast','Dinner','Dessert','Holiday','Southern'];
const colors:any = {Breakfast:'#d4a017',Dinner:'#6b8e23',Dessert:'#d16b86',Holiday:'#7a5c99',Southern:'#c96f28'};

export default function Home(){
 const [query,setQuery]=useState('');
 const [recipeList,setRecipeList]=useState<any[]>(starterRecipes);
 const [title,setTitle]=useState('');
 const [category,setCategory]=useState('Dinner');
 const [ingredients,setIngredients]=useState('');
 const [instructions,setInstructions]=useState('');
 const [image,setImage]=useState('');
 const [editIndex,setEditIndex]=useState<number|null>(null);
 const [showForm,setShowForm]=useState(false);
 const [viewRecipe,setViewRecipe]=useState<any|null>(null);

 useEffect(()=>{ const saved = localStorage.getItem('cristy_recipes'); if(saved) setRecipeList(JSON.parse(saved)); },[]);
 useEffect(()=>{ localStorage.setItem('cristy_recipes',JSON.stringify(recipeList)); },[recipeList]);

 const filtered = useMemo(()=>recipeList.filter(r=>
  r.title.toLowerCase().includes(query.toLowerCase()) ||
  r.category.toLowerCase().includes(query.toLowerCase()) ||
  r.ingredients.join(' ').toLowerCase().includes(query.toLowerCase())
 ),[query,recipeList]);

 const addRecipe = ()=>{
   if(!title) return;
   const newRecipe = {title,category,ingredients:ingredients.split(','),instructions,time:'Custom',image};
   if(editIndex!==null){ const updated=[...recipeList]; updated[editIndex]=newRecipe; setRecipeList(updated); setEditIndex(null); }
   else setRecipeList([newRecipe,...recipeList]);
   setTitle('');setIngredients('');setInstructions('');setImage('');setShowForm(false);
 }

 const deleteRecipe = (index:number)=> setRecipeList(recipeList.filter((_,i)=>i!==index));
 const editRecipe = (index:number)=>{ const r=recipeList[index]; setTitle(r.title); setCategory(r.category); setIngredients(r.ingredients.join(',')); setInstructions(r.instructions); setImage(r.image||''); setEditIndex(index); setShowForm(true); }

 return <main style={{padding:'36px',maxWidth:'1320px',margin:'0 auto'}}>
   <section style={{display:'grid',gridTemplateColumns:'1.2fr 0.8fr',gap:'24px',alignItems:'stretch',marginBottom:'34px'}}>
     <div style={{background:'#fffaf2',padding:'56px',borderRadius:'30px',boxShadow:'0 12px 30px rgba(0,0,0,0.06)'}}>
      <h1 style={{fontSize:'68px',marginBottom:'10px'}}>Cristy's Recipes</h1>
      <div style={{width:'120px',height:'3px',background:'#b88b5a',margin:'18px 0'}}></div>
      <p style={{fontSize:'21px',marginBottom:'30px'}}>Passed down favorites, handwritten memories, and every dish worth making again.</p>
      <div style={{display:'flex',gap:'10px',marginBottom:'24px'}}><Search/><input value={query} onChange={e=>setQuery(e.target.value)} placeholder='Search recipes, ingredients, categories...' style={{padding:'16px',width:'460px',borderRadius:'16px',border:'1px solid #d7c8b4'}} /></div>
      <div style={{display:'flex',gap:'12px',flexWrap:'wrap',marginBottom:'24px'}}>{categories.map((c,i)=><button key={i} onClick={()=>setCategory(c)} style={{background:colors[c]}}>{c}</button>)}<button onClick={()=>setShowForm(true)}>+ Add Recipe</button></div>
     </div>
     <div style={{borderRadius:'30px',background:'linear-gradient(135deg,#d6b28a,#f3e4d0)',minHeight:'320px',boxShadow:'0 12px 30px rgba(0,0,0,0.06)'}}></div>
   </section>

   <section>
    <h2 style={{fontSize:'36px',marginBottom:'22px'}}>Family Favorites</h2>
    <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(300px,1fr))',gap:'26px'}}>
      {filtered.map((recipe,i)=><div key={i}><RecipeCard recipe={recipe} onEdit={()=>editRecipe(i)} onView={()=>setViewRecipe(recipe)}/><button style={{marginTop:'8px',background:'#b22222'}} onClick={()=>deleteRecipe(i)}>Delete</button></div>)}
    </div>
   </section>
   <ClaudeChat/>
 </main>
}
