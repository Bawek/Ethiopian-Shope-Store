import React from "react";

const ProductShowcase = ({ product }) => {
  return (
    <div className="flex flex-wrap justify-around">
      {product.map((product) => (
        <div key={product.id} className="w-48 mx-4 text-center">
          <img src={product.image} alt={product.name} />
          <h3>{product.name}</h3>
          <p>{product.description}</p>
          <p>{product.price}</p>
          <button>Add to Cart</button>
        </div>
      ))}
    </div>
  );
};

export default ProductShowcase;
