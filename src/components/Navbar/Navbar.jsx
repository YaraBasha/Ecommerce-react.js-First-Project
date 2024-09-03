import { useContext, useEffect, useState } from 'react'
import classes from "./Navbar.module.css";
import logo from "../../assets/finalProject assets/freshcart-logo.svg"
import { NavLink, useLocation } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import { CartContext } from '../../context/CartContext';
import { SearchContext, useSearch } from '../../context/SearchContext';


export default function Navbar() {

    const { accessToken, setAccessToken } = useContext(AuthContext);
    const { setIsFiltered } = useContext(SearchContext)
    const { numOfCartItems } = useContext(CartContext);
    const { setGlobalSearchTerm } = useSearch(); // Get setGlobalSearchTerm from context
    const [menuOpen, setMenuOpen] = useState(false);
    // const [searchTerm, setSearchTerm] = useState('');




    //useLocation:
    const [searchBarVisible, setSearchBarVisible] = useState(false);
    const location = useLocation();

    useEffect(() => {
        const currentPath = location.pathname;
        if (currentPath === "/products" || currentPath === "/") {
            setSearchBarVisible(true);
        } else {
            setSearchBarVisible(false);
        }
    }, [location]);



    function toggleMenu() {
        setMenuOpen(!menuOpen);
    }

    function handleLogout() {
        localStorage.removeItem("accessToken");
        setAccessToken(null);
    }


    function handleSearchChange(e) {
        const term = e.target.value;
        if (term.length === 0) {
            setIsFiltered(false);
            // setSearchTerm("");
        }
        else {
            // setSearchTerm(term);
            setGlobalSearchTerm(term);
            setIsFiltered(true);
        }
    }
    function handleSearchBlur() {
        setIsFiltered(false);
    }

    return (
        <>
            <nav className="bg-gray-100 p-4 static lg:fixed top-0 end-0 start-0 z-50">
                <div className="container mx-auto flex flex-wrap items-center justify-between">
                    <Link to={""} className="flex items-center">
                        <img src={logo} alt="Fresh Cart Logo" className="h-8 mr-3" />
                    </Link>

                    {/* Search Bar for Desktop */}

                    <div className="hidden md:block relative">
                        {accessToken && searchBarVisible ?
                            <input
                                type="text"
                                placeholder="Search..."
                                // value={searchTerm}
                                onChange={handleSearchChange}
                                onBlur={handleSearchBlur}
                                className="block w-full p-2 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-green-500 focus:border-green-500"
                            /> :
                            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                {/* <svg className="w-4 h-4 text-gray-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                            </svg> */}
                            </div>}
                    </div>


                    <div className="flex md:order-2">
                        <button type="button" className="md:hidden text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-4 focus:ring-gray-200 rounded-lg text-sm p-2.5 mr-1" onClick={toggleMenu}>
                            <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                            </svg>
                            <span className="sr-only">Search</span>
                        </button>

                        <button type="button" className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200" onClick={toggleMenu}>
                            <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h15M1 7h15M1 13h15" />
                            </svg>
                            <span className="sr-only">Open main menu</span>
                        </button>
                    </div>

                    {/* Menu Items */}
                    <ul className={`items-center justify-between w-full md:flex md:w-auto md:order-1 ${menuOpen ? 'block' : 'hidden'} md:block`}>
                        {accessToken && (
                            <>


                                <li className="my-2 md:my-0">
                                    <NavLink className="p-4" to={""}>Home</NavLink>
                                </li>
                                <li className="my-2 md:my-0">
                                    <NavLink className="p-4" to={"/products"}>Products</NavLink>
                                </li>
                                <li className="my-2 md:my-0">
                                    <NavLink className="p-4" to={"/categories"}>Categories</NavLink>
                                </li>
                                <li className="my-2 md:my-0">
                                    <NavLink className="p-4" to={"/brands"}>Brands</NavLink>
                                </li>
                                <li className="my-2 md:my-0">
                                    <NavLink className="p-4" to={"/cart"}>
                                        <button type="button" className="relative inline-flex items-center text-sm font-medium text-black focus:ring-4 focus:outline-none">
                                            <i className="fas fa-cart-shopping fa-xl"></i>
                                            <div className="absolute inline-flex items-center justify-center w-6 h-6 text-xs font-bold text-white bg-green-500 border-2 border-white rounded-full -top-2 -end-2 dark:border-gray-900">
                                                {numOfCartItems}
                                            </div>
                                        </button>
                                    </NavLink>
                                </li>
                            </>
                        )}
                        {
                            accessToken ?
                                <>


                                    <li className="my-2 lg:my-0">
                                        <NavLink className={"p-4"} to={"/wishlist"}>

                                            <button type="button" className="relative inline-flex items-center text-sm font-medium text-center text-green-500 focus:ring-4 focus:outline-none">
                                                <i className="fas fa-heart fa-xl"></i>
                                                <span className="sr-only">Notifications</span>

                                            </button>

                                        </NavLink>
                                    </li>

                                    <li className="my-2 lg:my-0">
                                        <Link className={"p-4"} onClick={handleLogout}>Logout</Link>
                                    </li></> :

                                <>
                                    <li className="my-2 lg:my-0">
                                        <NavLink className={"p-4"} to={"/login"}>Login</NavLink>
                                    </li>
                                    <li className="my-2 lg:my-0">
                                        <NavLink className={"p-4"} to={"/register"}>Register</NavLink>
                                    </li>
                                </>
                        }
                    </ul>

                    {/* Search Bar for Mobile */}
                    <div className={`relative mt-3 md:hidden ${menuOpen ? 'block' : 'hidden'}`}>
                        {accessToken && searchBarVisible ?
                            <input
                                type="text"
                                placeholder="Search..."
                                // value={searchTerm}
                                onChange={handleSearchChange}
                                className="block w-full p-2 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-green-500 focus:border-green-500"
                            /> :
                            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                {/* <svg className="w-4 h-4 text-gray-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                            </svg> */}
                            </div>}
                    </div>
                </div>
            </nav>
        </>
    )
}