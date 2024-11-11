import React, { useState } from 'react'
import { Link, useNavigate} from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import CartModal from '../pages/shop/CartModal';
import avatarImg from "../assets/avatar.png"
import { useLogoutUserMutation } from '../redux/features/auth/authApi';
import { logout } from '../redux/features/auth/authSlice';

const Navbar = () => {

    const products = useSelector((state) => state.cart.products);
    const [isCartOpen, setisCartOpen] = useState(false);
    const handleCartToggle = () => {
        setisCartOpen(!isCartOpen)
    }


    const dispatch =  useDispatch();
    const {user} = useSelector((state) => state.auth);
    const [logoutUser] = useLogoutUserMutation();
    const navigate = useNavigate()

    const [isDropDownOpen, setIsDropDownOpen] = useState(false);
    const handDropDownToggle = () => {
        setIsDropDownOpen(!isDropDownOpen)
    }

    const adminDropDownMenus = [
        {label: "Dashboard", path: "/dashboard"},
        {label: "Manage Items", path: "/dashboard/manage-products"},
        {label: "All Orders", path: "/dashboard/manage-orders"},
        {label: "Add Product", path: "/dashboard/add-product"},
    ]

    const userDropDownMenus = [
        {label: "Profile", path: "/profile"},
    ]

    const dropdownMenus = user?.role === 'admin' ? [...adminDropDownMenus] : [...userDropDownMenus]

    const handleLogout = async () => {
        try {
            await logoutUser().unwrap();
            dispatch(logout())
            navigate('/')
        } catch (error) {
            console.error("Failed to log out", error)
        }
    }

    return (
        <header className='fixed-nav-bar w-nav'>
            <nav className='max-w-screen-2xl mx-auto px-4 flex justify-between items-center'>
                {/* logo */}
                
                <div className='nav__logo'>
                    <Link to="/">CARTY</Link>
                </div>

                <ul className='nav__links'>
                    <li className='link'><Link to="/">Home</Link></li>
                    <li className='link'><Link to="/shop">Shop</Link></li>
                    <li className='link'><Link to="/contact">Contact</Link></li>
                </ul>


                {/* nav icons */}
                <div className='nav__icons relative'>
                    <span>
                        <Link to="/search">
                            <i className="ri-search-line"></i>
                        </Link>
                    </span>
                    <span>
                        <button onClick={handleCartToggle} className='hover:text-primary'>
                            <i className="ri-shopping-bag-line"></i>
                            <sup className='text-sm inline-block px-1.5 text-white rounded-full  bg-primary text-center'>{products.length}</sup>
                        </button>
                    </span>
                    <span>
                        {
                          user &&  user ? (<>
                          <img 
                          onClick={handDropDownToggle}
                          src={user?.profileImage || avatarImg} alt="" className='size-6 rounded-full cursor-pointer'/>

                          {
                            isDropDownOpen && (
                                <div className='absolute right-0 mt-3 p-4 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-50'>
                                    <ul className='font-medium space-y-4 p-2'>
                                        {dropdownMenus.map((menu, index) => (
                                            <li key={index}>
                                                <Link 
                                                onClick={() => setIsDropDownOpen(false)}
                                                className='dropdown-items' to={menu.path}>{menu.label}</Link>
                                            </li>
                                        ))}
                                        <li><Link onClick={handleLogout} className='dropdown-items'>Logout</Link></li>
                                    </ul>
                                </div>
                            )
                          }
                          
                          </>) : (<Link to="login">
                                <i className="ri-user-line"><span>Login</span></i>
                            </Link>)
                        }
                        
                    </span>
                </div>

                
               
            </nav>
            {
                isCartOpen && <CartModal products={products} isOpen={isCartOpen} onClose={handleCartToggle}/>
            }
        </header>
    )
}

export default Navbar