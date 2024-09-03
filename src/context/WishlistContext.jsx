import React, { createContext, useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { AuthContext } from './AuthContext';

export const WishlistContext = createContext();


export default function WishlistProvider({ children }) {
    

const {accessToken} = useContext(AuthContext);


    const headers = {
        token: accessToken,
    };

    useEffect(() => {
        accessToken && getWishlist();
    }, [accessToken]);


    const [wishlist, setWishlist] = useState([]);
    const [loading, setLoading] = useState(false);


    async function getWishlist() {
        try {
            setLoading(true);
            const { data } = await axios.get(`https://ecommerce.routemisr.com/api/v1/wishlist`, { headers });
            setWishlist(data.data);
            setLoading(false);
            return data;
        } catch (error) {
            console.error("Failed to fetch wishlist:", error);
            return error;
            // setLoading(false);
        }
    }

    async function addToWishlist(productId) {
        try {
            const { data } = await axios.post(
                `https://ecommerce.routemisr.com/api/v1/wishlist`,
                { productId },
                { headers }
            ); console.log(data);
            setWishlist(data.data);
            return data;
        } catch (error) {
            console.error("Failed to add to wishlist:", error);
            return error.response.data.message;
        }
    }


    async function removeFromWishlist(productId) {
        return axios.delete(
                    `https://ecommerce.routemisr.com/api/v1/wishlist/${productId}`,
                    { headers }
                );
    
    }


    // async function removeFromWishlist(productId) {
    //     try {
    //         const { data } = await axios.delete(
    //             `https://ecommerce.routemisr.com/api/v1/wishlist/${productId}`,
    //             { headers }
    //         );
    //         setWishlist(data.data);
    //         return data;
    //     } catch (error) {
    //         console.error("Failed to remove from wishlist:", error);
    //     }
    // }














    return (
        <WishlistContext.Provider value={{ addToWishlist, getWishlist, wishlist, loading, setWishlist, removeFromWishlist}}>
            {children}
        </WishlistContext.Provider>
    );
}
//,  , removeFromWishlist, 