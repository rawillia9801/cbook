export default function RecipeCard({recipe,onEdit,onView,onDelete}:{recipe:any,onEdit?:()=>void,onView?:()=>void,onDelete?:()=>void}){
 return (
  <div style={{border:'1px solid #e5d7c0',borderRadius:'28px',background:'#fffdf8',boxShadow:'0 14px 28px rgba(0,0,0,0.08)',overflow:'hidden',position:'relative'}}>
   <div style={{height:'210px',backgroundImage:`url(${recipe.image})`,backgroundSize:'cover',backgroundPosition:'center'}}></div>
   <div style={{position:'absolute',top:'14px',right:'16px',fontSize:'22px'}}>♡</div>
   <div style={{padding:'22px'}}>
    <span style={{display:'inline-block',background:'#eddcb8',padding:'6px 14px',borderRadius:'18px',marginBottom:'10px'}}>{recipe.category}</span>
    <h3 style={{fontSize:'27px',margin:'8px 0'}}>{recipe.title}</h3>
    <p style={{fontSize:'14px',color:'#8a6f58',marginBottom:'12px'}}>⏱ {recipe.time} &nbsp;&nbsp; 🍽 Serves {recipe.serves}</p>
    <p style={{lineHeight:'1.6',minHeight:'54px'}}>{recipe.instructions}</p>
    <div style={{display:'flex',gap:'8px',marginTop:'16px',flexWrap:'wrap'}}>
      <button style={{background:'#7b9b59'}} onClick={onView}>View Recipe</button>
      <button style={{background:'#b88b5a'}} onClick={onEdit}>Edit</button>
      <button style={{background:'#b64034'}} onClick={onDelete}>Delete</button>
    </div>
   </div>
  </div>
 )
}
