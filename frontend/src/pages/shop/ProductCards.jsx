import React from 'react'
import { Link } from 'react-router-dom'
import RatingStars from '../../components/RatingStars'
import { useDispatch } from 'react-redux'
import { addToCart } from '../../redux/features/cart/cartSlice'
import ShoppingCartCheckoutOutlinedIcon from '@mui/icons-material/ShoppingCartCheckoutOutlined';

const ProductCards = ({products}) => {
    const dispatch = useDispatch();
    const handleAddToCart = (product) => {
        dispatch(addToCart(product))
    }
    
  return (
    <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8'>
        {
            products.map((product, index) => (
                <div key={index} className='product__card'>
                    <div className='relative'>
                        <Link to={`/shop/${product._id}`}>
                        <img src={product.image} alt="product image" className='max-h-40 md:h-40 w-12 object-cover hover:scale-105 transition-all duration-300'
                            onError={
                                (e)=>{
                                    e.currentTarget.src = '/avatar.png'
                                    e.currentTarget.style.display = 'none';
                                    e.currentTarget.onerror = null;
                                }
                            }
                        />
                        </Link>

                        <div className='hover:block absolute top-3 right-3'>
                            <button
                           onClick={(e) => {
                            e.stopPropagation();
                            handleAddToCart(product)
                        }}
                            >

                            {/* <i className="ri-shopping-cart-2-line bg-primary p-1.5 text-white hover:bg-primary-dark"></i> */}
                            <ShoppingCartCheckoutOutlinedIcon className=" bg-primary p-0.5 text-white hover:bg-primary-dark"/>
                            </button>
                        </div>
                        
                    </div>

                    {/* product description */}
                    <div className='product__card__content'>
                        <h4>{product.name}</h4>
                        <p>${product.price} {product?.oldPrice ? <s>${product?.oldPrice}</s> : null}</p>
                        <RatingStars rating={product.rating}/>
                    </div>

                </div>
            ))
        }
    </div>
  )
}

export default ProductCards