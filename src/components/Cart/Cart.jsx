import { useContext, useEffect, useState } from 'react'
import classes from "./Cart.module.css";
import { CartContext } from '../../context/CartContext';
import { AuthContext } from '../../context/AuthContext';
// import axios from 'axios';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';

export default function Cart() {

    const { getCart, cartDetails, setCartDetails, numOfCartItems, removeFromCart, updateQuantity, setcartId } = useContext(CartContext);
    const { accessToken } = useContext(AuthContext);

    async function getCartDetails() {
        try {
            const res = await getCart();
            // console.log(res.data.data.products);
            setCartDetails(res.data);
            setcartId(res.data.data._id)
        } catch (error) {
            console.log(error);
        }
        // if (res.status == "success"){
        //     setCartDetails(res.data)
        // }else { 
        //     console.log(res);
        // }

    }


    async function removeProductFromCart(productId) {

try {
    const res = await removeFromCart(productId);
    console.log('Remove response:', res);
    getCartDetails();
    toast.success("Product is removed successfully")
} catch (error) {
    console.log(error);
    toast.error("something went wrong")
    
}
    }




    async function updateProductQuantity(productId, count) {

try {
    const res = await updateQuantity(productId, count);
    getCartDetails();
    toast.success("Quantity updated")
} catch (error) {
    console.log(error);
    toast.error("something went wrong")
}
    }



    useEffect(() => {
        accessToken && getCartDetails();
    }, [accessToken]);







    return (
        <>
            {console.log(cartDetails)}

            <section className="py-20 h-screen">
                <div className="container mx-auto">
                    <h1 className="text-3xl font-bold pb-4">Cart:</h1>

                    {cartDetails && (
                        <>
                            <div className="flex justify-between py-3">
                                <div>
                                    <h4 className="text-lg font-semibold">Total Items:</h4>
                                    <span className="text-green-500 font-semibold">{cartDetails.numOfCartItems}</span>
                                </div>
                                <div>
                                    <h4 className="text-lg font-semibold">Total Price:</h4>
                                    <span className="text-green-500 font-semibold">{cartDetails.data.totalCartPrice} EGP</span>
                                </div>
                            </div>

                            <div className="relative overflow-x-auto shadow-md sm:rounded-lg py-5">
                                <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                        <tr>
                                            <th scope="col" className="px-6 py-3">
                                                Product
                                            </th>
                                            <th scope="col" className="px-6 py-3">
                                                Quantity
                                            </th>
                                            <th scope="col" className="px-6 py-3">
                                                Price
                                            </th>
                                            <th scope="col" className="px-6 py-3">
                                                Action
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {cartDetails.data.products.map((product) => (
                                            <tr
                                                key={product.product._id}
                                                className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                                            >
                                                <td className="p-4">
                                                    <img
                                                        src={product.product.imageCover}
                                                        className="w-16 md:w-32 max-w-full max-h-full"
                                                        alt={product.product.title}
                                                    />
                                                    <div className="font-semibold text-gray-900 dark:text-white">
                                                        {product.product.title}
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <div className="flex items-center">
                                                        <button
                                                            onClick={() =>
                                                                updateProductQuantity(product.product.id, product.count - 1)
                                                            }
                                                            className="inline-flex items-center justify-center p-1 me-3 text-sm font-medium h-6 w-6 text-gray-500 bg-white border border-gray-300 rounded-full focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
                                                            type="button"
                                                        >
                                                            <span className="sr-only">Decrease Quantity</span>
                                                            <svg
                                                                className="w-3 h-3"
                                                                aria-hidden="true"
                                                                xmlns="http://www.w3.org/2000/svg"
                                                                fill="none"
                                                                viewBox="0 0 18 2"
                                                            >
                                                                <path
                                                                    stroke="currentColor"
                                                                    strokeLinecap="round"
                                                                    strokeLinejoin="round"
                                                                    strokeWidth="2"
                                                                    d="M1 1h16"
                                                                />
                                                            </svg>
                                                        </button>
                                                        <div>{product.count}</div>
                                                        <button
                                                            onClick={() =>
                                                                updateProductQuantity(product.product.id, product.count + 1)
                                                            }
                                                            className="inline-flex items-center justify-center h-6 w-6 p-1 ms-3 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-full focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
                                                            type="button"
                                                        >
                                                            <span className="sr-only">Increase Quantity</span>
                                                            <svg
                                                                className="w-3 h-3"
                                                                aria-hidden="true"
                                                                xmlns="http://www.w3.org/2000/svg"
                                                                fill="none"
                                                                viewBox="0 0 18 18"
                                                            >
                                                                <path
                                                                    stroke="currentColor"
                                                                    strokeLinecap="round"
                                                                    strokeLinejoin="round"
                                                                    strokeWidth="2"
                                                                    d="M9 1v16M1 9h16"
                                                                />
                                                            </svg>
                                                        </button>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                                                    {product.price} EGP
                                                </td>
                                                <td className="px-6 py-4">
                                                    <button
                                                        onClick={() => removeProductFromCart(product.product.id)}
                                                        className="font-medium text-red-600 dark:text-red-500 hover:underline"
                                                    >
                                                        Remove
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                            <Link to="/checkout" className="btn btn-green w-full block my-10 text-center">
                                Checkout
                            </Link>
                        </>
                    )}
                </div>
            </section>

        </>
    )
}