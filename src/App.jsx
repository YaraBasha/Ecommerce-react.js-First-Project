import './App.css'
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from './components/Layout/Layout';
import Error from "./components/Error/Error";
import Home from './components/Home/Home';
import Products from './components/Products/Products';
import Cart from './components/Cart/Cart';
import Brands from './components/Brands/Brands';
import Categories from './components/Categories/Categories';
import Register from './components/Register/Register';
import Login from './components/Login/Login';
import NotFound from './components/NotFound/NotFound';
import AuthContextProvider from './context/AuthContext';
import Security from './components/Security/Security';
import ProductDetails from './components/ProductDetails/ProductDetails';
import CartContextProvider from './context/CartContext';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Checkout from './components/Checkout/Checkout';
import MyOrders from './components/MyOrders/MyOrders';
// import BrandDetails from './components/Branddetails/Branddetails';
import CategoriesDetails from './components/CategoriesDetails/CategoriesDetails';
import Wishlist from './components/WishList/WishList';
import WishlistProvider from './context/WishlistContext';
import ForgetPassword from './components/ForgetPassword/ForgetPassword';
import ResetPassword from './components/ResetPassword/ResetPassword';
// import Profile from './components/Profile/Profile';
import { SearchProvider } from './context/SearchContext';
import BrandDetails from './components/Branddetails/Branddetails';


function App() {

  const router = createBrowserRouter([
    {
      path: "",
      element: <Layout />,
      errorElement: <Error />,
      children: [
        {
          index: true,
          element: (<Security>
            <Home />
          </Security>
          ),
        },
        {
          path: "/products",
          element: (<Security>
            <Products />
          </Security>
          ),

        },
        {
          path: "/cart",
          element: (<Security>
            <Cart />
          </Security>
          ),
        },
        {
          path: "/checkout",
          element: (<Security>
            <Checkout />
          </Security>
          ),
        },
        {
          path: "/allorders",
          element: (<Security>
            <MyOrders />
          </Security>
          ),
        },
        {
          path: "/brands",
          element: (<Security>
            <Brands />
          </Security>),
        },
        {
          path: "/brands/:id",
          element: (<Security>
            <BrandDetails />
          </Security>),
        },
        {
          path: "/categories",
          element: (<Security>
            <Categories />
          </Security>),
        },
        {
          path: "/categories/:id",
          element: (<Security>
            <CategoriesDetails />
          </Security>),
        },
        {
          path: "/wishlist",
          element: (<Security>
            <Wishlist />
          </Security>),
        },
        // {
        //   path: "/profile",
        //   element: (<Security>
        //     <Profile />
        //   </Security>),
        // },
        {
          path: "/product-details/:id/:category",
          element: (<Security>
            <ProductDetails />
          </Security>),
        },
        {
          path: "/register",
          element: <Register />,
        },
        {
          path: "/Login",
          element: <Login />
        },
        {
          path: "/forgetPassword",
          element: <ForgetPassword />
        },
        {
          path: "/resetPassword",
          element: <ResetPassword />
        },
        {
          path: "*",
          element: <NotFound />
        }

      ]
    }
  ])

  return (
    <>
      <AuthContextProvider>
        <CartContextProvider>
          <WishlistProvider>
            <SearchProvider>
              <RouterProvider router={router} />
              <ToastContainer />
            </SearchProvider>
          </WishlistProvider>
        </CartContextProvider>
      </AuthContextProvider>

    </>
  )
}

export default App
