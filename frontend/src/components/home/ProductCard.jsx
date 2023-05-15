import React from "react";
// import ReactStars from "react-rating-stars-component";
import { Link } from "react-router-dom";

const options = {
  edit: false,
};
const ProductCard = ({ product }) => {
  return (
    <Link className="productCard" to={`/product/${product._id}`}>
      <img src={product.images[0].url} alt={`image ${product._id}`} />
      <p>{product.name}</p>
      <div>
        {/* <ReactStars /> */}
        <span>(256Reviews)</span>
      </div>
      <span>{`Rs.${product.price}`}</span>
    </Link>
  );
};

export default ProductCard;
