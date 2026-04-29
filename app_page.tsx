"use client";
import { useMemo, useState, useEffect } from 'react';
import { Search } from 'lucide-react';
import { recipes as starterRecipes } from './data_recipes';
import RecipeCard from './component_recipecard';
import ClaudeChat from './component_claudechat';

const categories = ['Breakfast','Dinner','Dessert','Holiday','Southern'];
const colors:any = {Breakfast:'#e0b24f',Dinner:'#6f9b8a',Dessert:'#d98686',Holiday:'#7e8fb7',Southern:'#c48b5a'};

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
 const filtered = useMemo(()=>recipeList.filter(r=>r.title.toLowerCase().includes(query.toLowerCase())||r.category.toLowerCase().includes(query.toLowerCase())||r.ingredients.join(' ').toLowerCase().includes(query.toLowerCase())),[query,recipeList]);
 const addRecipe = ()=>{ if(!title) return; const newRecipe={title,category,ingredients:ingredients.split(','),instructions,time:'Custom',image,serves:'4'}; if(editIndex!==null){const updated=[...recipeList];updated[editIndex]=newRecipe;setRecipeList(updated);setEditIndex(null);} else setRecipeList([newRecipe,...recipeList]); setTitle('');setIngredients('');setInstructions('');setImage('');setShowForm(false); };
 const deleteRecipe = (index:number)=> setRecipeList(recipeList.filter((_,i)=>i!==index));
 const editRecipe = (index:number)=>{ const r=recipeList[index]; setTitle(r.title); setCategory(r.category); setIngredients(r.ingredients.join(',')); setInstructions(r.instructions); setImage(r.image||''); setEditIndex(index); setShowForm(true); };

 return <main style={{padding:'34px',maxWidth:'1380px',margin:'0 auto'}}>
 {showForm && <div onClick={()=>setShowForm(false)} style={{position:'fixed',inset:0,background:'rgba(0,0,0,0.5)',display:'flex',alignItems:'center',justifyContent:'center',zIndex:999}}><div onClick={(e)=>e.stopPropagation()} style={{background:'#fffdf8',padding:'28px',borderRadius:'24px',width:'520px',display:'grid',gap:'10px'}}><h2>{editIndex!==null?'Edit Recipe':'Add New Recipe'}</h2><input value={title} onChange={e=>setTitle(e.target.value)} placeholder='Recipe title' style={{padding:'12px'}} /><input value={ingredients} onChange={e=>setIngredients(e.target.value)} placeholder='Ingredients comma separated' style={{padding:'12px'}} /><input value={image} onChange={e=>setImage(e.target.value)} placeholder='Image URL' style={{padding:'12px'}} /><textarea value={instructions} onChange={e=>setInstructions(e.target.value)} placeholder='Instructions' style={{padding:'12px',minHeight:'90px'}} /><button onClick={addRecipe}>{editIndex!==null?'Save Changes':'+ Add Recipe'}</button></div></div>}
 {viewRecipe && <div onClick={()=>setViewRecipe(null)} style={{position:'fixed',inset:0,background:'rgba(0,0,0,0.5)',display:'flex',alignItems:'center',justifyContent:'center',zIndex:998}}><div onClick={(e)=>e.stopPropagation()} style={{background:'#fffdf8',padding:'30px',borderRadius:'24px',width:'620px'}}><h2 style={{fontSize:'34px'}}>{viewRecipe.title}</h2><p style={{marginTop:'10px'}}>{viewRecipe.instructions}</p><p style={{marginTop:'14px'}}>{viewRecipe.ingredients.join(', ')}</p></div></div>}

 <section style={{display:'grid',gridTemplateColumns:'1.05fr 0.95fr',gap:'26px',marginBottom:'36px'}}>
  <div style={{background:'rgba(255,250,242,0.88)',padding:'54px',borderRadius:'34px',boxShadow:'0 12px 30px rgba(73,106,120,0.10)'}}>
   <p style={{fontStyle:'italic',fontSize:'24px',marginBottom:'10px',color:'#5d7f8c'}}>From Cristy\'s shore kitchen...</p>
   <h1 style={{fontSize:'72px',marginBottom:'12px'}}>Cristy's Recipes</h1>
   <p style={{fontSize:'19px',marginBottom:'28px'}}>A seaside collection of family comfort food, sweet memories, and favorite dishes worth keeping forever.</p>
   <div style={{display:'flex',gap:'10px',marginBottom:'22px'}}><Search/><input value={query} onChange={e=>setQuery(e.target.value)} placeholder='Search all recipes...' style={{padding:'16px',width:'460px'}} /></div>
   <div style={{display:'flex',gap:'10px',flexWrap:'wrap'}}>{categories.map((c,i)=><button key={i} onClick={()=>setCategory(c)} style={{background:colors[c]}}>{c}</button>)}<button onClick={()=>setShowForm(true)}>+ Add Recipe</button></div>
  </div>
  <div style={{background:'rgba(255,250,242,0.88)',padding:'28px',borderRadius:'34px',boxShadow:'0 12px 30px rgba(73,106,120,0.10)'}}>
   <div style={{height:'320px',borderRadius:'26px',backgroundImage:'url(https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80)',backgroundSize:'cover',backgroundPosition:'center'}}></div>
   <h3 style={{fontSize:'28px',marginTop:'16px',color:'#5d7f8c'}}>Lighthouse Favorite</h3>
   <h2 style={{fontSize:'34px',marginTop:'10px'}}>{recipeList[0]?.title}</h2>
   <p style={{marginTop:'12px',lineHeight:'1.7'}}>{recipeList[0]?.instructions}</p>
  </div>
 </section>

 <h2 style={{fontSize:'38px',marginBottom:'22px',color:'#4f6d78'}}>Coastal Recipe Collection</h2>
 <section style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(320px,1fr))',gap:'24px',marginBottom:'34px'}}>
 {filtered.map((recipe,i)=><RecipeCard key={i} recipe={recipe} onEdit={()=>editRecipe(i)} onView={()=>setViewRecipe(recipe)} onDelete={()=>deleteRecipe(i)}/>)}
 </section>
 <section style={{marginBottom:'34px'}}><ClaudeChat/></section>
 <section style={{background:'rgba(239,245,247,0.92)',padding:'30px',borderRadius:'26px',display:'flex',justifyContent:'space-between',alignItems:'center'}}><div><h3 style={{fontSize:'28px'}}>Save another shore favorite?</h3><p>Add treasured family dishes to Cristy's coastal collection.</p></div><button onClick={()=>setShowForm(true)} style={{background:'#5f8ea0'}}>Submit Recipe</button></section>
 </main>
}
