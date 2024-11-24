import React from "react";
import { Link } from "react-router-dom";
import RatingStars from "../../components/RatingStars";
import { useDispatch } from "react-redux";
import { addToCart } from "../../redux/features/cart/cartSlice";
import ShoppingCartCheckoutOutlinedIcon from "@mui/icons-material/ShoppingCartCheckoutOutlined";

const ProductCards = ({ product }) => {
  const dispatch = useDispatch();
  const handleAddToCart = (product) => {
    dispatch(addToCart(product));
  };

  return (
    <>
      <Link to={`/shop/${product._id}`}>
        <div class="group border-gray-100/30 flex flex-col justify-between w-full max-w-xs h-100 self-center overflow-hidden rounded-lg border bg-white shadow-md ">
          
            <img
              className="peer  top-0 right-0 h-full w-full object-cover"
              src={product.image}
              alt="product image"
            />
        
            
          <div className="mt-4 px-5 pb-5">
            <a href="#">
              <h5 class="text-xl tracking-tight text-black">{product.name}</h5>
            </a>
            <div class="mt-2 mb-5 flex items-center justify-between text-black">
              <p>
                ${product.price}{" "}
                {product?.oldPrice ? <s>${product?.oldPrice}</s> : null}
              </p>
            </div>
            <RatingStars rating={product.rating} />
            
          </div>

          <div className="mt-4 px-5 pb-5">
          <a class="hover:border-white/40 flex items-center justify-center rounded-md border border-transparent bg-blue-600 px-5 py-2.5 text-center text-sm font-medium text-white focus:outline-none focus:ring-4 focus:ring-blue-300">
              <ShoppingCartCheckoutOutlinedIcon className="p-0.5 text-white" />
              Add to cart
            </a>
          </div>
        </div>
      </Link>
    </>
  );
};

export default ProductCards;
