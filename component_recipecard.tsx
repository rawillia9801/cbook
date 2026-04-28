import { ChefHat } from 'lucide-react';

export default function RecipeCard({recipe}:{recipe:any}){
 return (
  <div style={{border:'1px solid #ddd',padding:'20px',borderRadius:'16px',background:'#fff'}}>
   <ChefHat />
   <h3>{recipe.title}</h3>
   <p>{recipe.category} • {recipe.time}</p>
   <p>{recipe.ingredients.join(', ')}</p>
   <p>{recipe.instructions}</p>
  </div>
 )
}
