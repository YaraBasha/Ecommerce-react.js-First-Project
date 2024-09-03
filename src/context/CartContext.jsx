import { createContext, useContext, useEffect, useState } from "react";
import axios from 'axios';
import { AuthContext } from "./AuthContext";


export const CartContext = createContext();

export default function CartContextProvider({ children }) {
    const { accessToken } = useContext(AuthContext);
    const [numOfCartItems, setNumOfCartItems] = useState(0);
    const [cartDetails, setCartDetails] = useState(null);
    const [cartId, setcartId] = useState(null);
    const [userId, setUserId] = useState(null);

    // const endpoint = `https://ecommerce.routemisr.com/api/v1/cart`;

    const headers = {
        token: accessToken,
    };



    useEffect(() => {
        accessToken && getCartDetails();
    }, [accessToken]);

    async function getCartDetails() {
        const res = await getCart();
        if (res.status == "success") {
            console.log(res);

        } else {
            console.log(res);
        }
    }

    async function getCart() {
        return axios.get(`https://ecommerce.routemisr.com/api/v1/cart`, { headers });
        //     console.log('cart' ,data);
        //     setNumOfCartItems(data.numOfCartItems);
        //     setCartDetails(data.data);
        //     setcartId(data.data._id);
        //     setUserId(dara.data.cartOwner);
        //     return data;
        // } catch (error) {
        //     return error;
        // }
    }

    async function addToCart(productId) {
        try {
            const { data } = await axios.post(
                `https://ecommerce.routemisr.com/api/v1/cart`,
                { productId },
                { headers });
            console.log(data);
            setNumOfCartItems(data.numOfCartItems);
            setcartId(data.data._id);
            setUserId(data.data.cartOwner);
            return data;
        } catch (error) {
            console.log(error);
            return error.response.data.message;

        }

    }

    async function removeFromCart(productId) {
        // try {
        //     const { data } = await axios.delete(```https://ecommerce.routemisr.com/api/v1/cart``/${productId}`, { headers });
        //     setNumOfCartItems(data.numOfCartItems);
        //     setCartDetails(data.data);
        //     setcartId(data.data._id);
        //     setUserId(data.data.cartOwner);
        //     return (data);
        // } catch (error) {
        return axios.delete(`https://ecommerce.routemisr.com/api/v1/cart/${productId}`, { headers });
        }
    

    async function updateQuantity(productId, count) {
        // try {
        //     const { data } = await axios.put(`https://ecommerce.routemisr.com/api/v1/cart/${productId}`, { count }, { headers });
        //     setNumOfCartItems(data.numOfCartItems);
        //     setCartDetails(data.data);
        //     setcartId(data.data._id);
        //     setUserId(data.data.cartOwner);
        //     return (data);
        // } catch (error) {
        return axios.put(`https://ecommerce.routemisr.com/api/v1/cart/${productId}`, { count }, { headers });
        }
    
    //clear cart................
    // async function clearCart(productId , data) {
    //     try {
    //         const { data } = await axios.delete(`${endpoint}/${productId}`,{data}, { headers });
    //         setNumOfCartItems(data.numOfCartItems);
    //         setCartDetails(data.data);
    //         setcartId(data.data._id);
    //         setUserId(dara.data.cartOwner);
    //         return (data);
    //     } catch (error) {
    //         return error.response.data.message;
    //     }
    // }

    async function getPayment(endpoint, shippingAddress) {
        try {
            const { data } = await axios.post(endpoint, { shippingAddress }, { headers });
            console.log(data);
            return data;

        } catch (error) {
            console.log(error);
            return error.response.data.message;

        }
    }


    return <CartContext.Provider value={{ setCartDetails, numOfCartItems, cartDetails, addToCart, getCart, removeFromCart, updateQuantity, getPayment, cartId, userId, setcartId }}>
        {children}
    </CartContext.Provider>;

}