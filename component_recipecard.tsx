export default function RecipeCard({recipe,onEdit,onView}:{recipe:any,onEdit?:()=>void,onView?:()=>void}){
 const bannerStyle = recipe.image ? {backgroundImage:`url(${recipe.image})`,backgroundSize:'cover',backgroundPosition:'center'} : {background:'linear-gradient(135deg,#d8b892,#f4e6d1)'};
 return (
  <div style={{border:'1px solid #eadfce',padding:'0',borderRadius:'24px',background:'#fffdf9',boxShadow:'0 14px 30px rgba(0,0,0,0.08)',overflow:'hidden'}}>
   <div style={{height:'180px',...bannerStyle}}></div>
   <div style={{padding:'22px'}}>
    <span style={{display:'inline-block',background:'#f1e3c6',padding:'6px 12px',borderRadius:'20px',marginBottom:'10px'}}>{recipe.category}</span>
    <h3 style={{fontSize:'26px',margin:'8px 0'}}>{recipe.title}</h3>
    <p><strong>{recipe.time}</strong></p>
    <p style={{color:'#6b5b4a'}}>{recipe.ingredients.join(', ')}</p>
    <p style={{marginTop:'12px',lineHeight:'1.6'}}>{recipe.instructions.slice(0,90)}...</p>
    <div style={{display:'flex',gap:'10px',marginTop:'16px'}}>
      <button style={{background:'#7b9b59'}} onClick={onEdit}>Edit</button>
      <button style={{background:'#d97706'}} onClick={onView}>View</button>
    </div>
   </div>
  </div>
 )
}
