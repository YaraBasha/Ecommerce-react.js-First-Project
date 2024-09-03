import { useContext, useEffect, useState } from 'react'
import axios from 'axios';
import { CartContext } from '../../context/CartContext';
import { AuthContext } from '../../context/AuthContext';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';






export default function MyOrders() {


const { userId } = useContext(CartContext);
    const { accessToken } = useContext(AuthContext);


    const headers = {
        token: accessToken,
    };





    const [orders, setOrders] = useState([]);






async function getMyOrders() {
    
    console.log(userId);
    
    try {
        const { data } = await axios.get(`https://ecommerce.routemisr.com/api/v1/orders/user/${userId}` , {headers});
    console.log(data);
        setOrders(data);;
    
    } catch (error) {
        console.log(error);
        toast.error('Failed to fetch orders');
    }
}

useEffect(()=> {
    userId && getMyOrders();
}, [userId]);




    return (
        <>
        
            

            <section className="py-20">
                <div className="container mx-auto">
                    <h1 className="text-3xl font-bold pb-4">My Orders:</h1>
                    
{orders && (

                        <div className="relative overflow-x-auto shadow-md sm:rounded-lg py-5">
            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                                        
            <th scope="col" className="px-6 py-3">Order ID</th>
                <th scope="col" className="px-6 py-3">Products</th>
{/* <th scope="col" className="px-6 py-3">Total Price</th> */}
            <th scope="col" className="px-6 py-3">Order Date</th>
        {/* <th scope="col" className="px-6 py-3">Image</th> */}
                                    </tr>
                                </thead>
                                <tbody>
                                



{/* leh kol el category zahra?? */}

{orders.map((product) => 
            (<tr 
                                key={product.id}
            className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
    <td className="px-6 py-4">{product.id}</td>
                <td className="px-6 py-4">
                                <div  className="mb-2">
                                    
                        <span className="font-semibold text-gray-900 dark:text-white">
                                                    Product: {product.title}
                                                    </span>
            <span className="block">Quantity: {product.count}</span>
            <span className="block">Price: {product.totalOrderPrice} EGP</span>
                                                </div>
                                            
                                        </td>
                                        {/* <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">totalOrderPrice EGP</td> */}
    <td className="px-6 py-4">{product.createdAt}</td>
    {/* <td className="px-6 py-4">
        <img className="block" src={product.image} alt=""/>
    </td> */}
                                        {/* <td className="px-6 py-4">{order.isPaid ? 'Paid' : 'Unpaid'}</td> */}
                                    </tr>))}
                                    
                                </tbody>
                            </table>
                        </div>
                    )}

                    <Link to="/" className="btn btn-green w-full block my-10 text-center">
                        Back to Home Page
                    </Link>
    
                </div>
            </section>
        

        </>
    );
}