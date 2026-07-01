export const imageViewer = (name)=>{
    if (!name) return '/placeholder-product.png'
    return `http://localhost:8000/images/${name}`
}