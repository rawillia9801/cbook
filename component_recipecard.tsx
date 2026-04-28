import { ChefHat } from 'lucide-react';

export default function RecipeCard({recipe}:{recipe:any}){
 return (
  <div style={{border:'1px solid #eee',padding:'24px',borderRadius:'22px',background:'#fffdf9',boxShadow:'0 10px 24px rgba(0,0,0,0.08)'}}>
   <ChefHat size={28} />
   <h3 style={{fontSize:'24px',marginTop:'12px'}}>{recipe.title}</h3>
   <span style={{display:'inline-block',background:'#f1e3c6',padding:'6px 12px',borderRadius:'20px',margin:'8px 0'}}>{recipe.category}</span>
   <p><strong>{recipe.time}</strong></p>
   <p>{recipe.ingredients.join(', ')}</p>
   <p style={{marginTop:'12px',lineHeight:'1.5'}}>{recipe.instructions}</p>
  </div>
 )
}
