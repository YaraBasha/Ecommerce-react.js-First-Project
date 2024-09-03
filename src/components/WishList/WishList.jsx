import { useContext, useEffect, useState } from 'react'
import { WishlistContext } from '../../context/WishlistContext';
import { AuthContext } from '../../context/AuthContext';
import { toast } from 'react-toastify';




export default function Wishlist() {

    const { getWishlist, wishlist, setWishlist, removeFromWishlist } = useContext(WishlistContext);

    const { accessToken } = useContext(AuthContext);
    const [loading, setLoading] = useState(false);




    async function getWishlistDetails() {
        try {
            const res = await getWishlist();
            setWishlist(res.data);
            if (res.status == 'success') {
                console.log(res);
            } else {
                console.log(res);
            }
        } catch {
            console.error('Error fetching wishlist:', error);
        } finally {
            setLoading(false);
        }




        async function removeProductFromWishlist(productId) {
                try {
                    const res = await removeFromWishlist(productId);
                    console.log('remove:' , res);
                    getWishlistDetails();
                    toast.success("Product is removed successfully")
                } catch (error) {
                    console.error("Failed to remove from wishlist:", error);
                    toast.error("something went wrong")
                }
            }


    }
    useEffect(() => {
        accessToken && getWishlistDetails() ;
    }, [accessToken]);

    // useEffect(() => {
    //     accessToken && removeFromWishlist();
    // }, [accessToken]);

    // if (loading) return <Loader />;

    return (
        <>
{console.log(wishlist)}


            <section className="py-20">
                <div className="container mx-auto">
                    <h1 className="text-3xl font-bold pb-4">WishList:</h1>

{/* && wishlist.data && wishlist.data.products  */}
                    {wishlist && (
                        <div className="relative overflow-x-auto shadow-md sm:rounded-lg py-5">
                            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                    <tr>
                                        <th scope="col" className="px-6 py-3">
                                            Product
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
                                    {wishlist.map((product) =>
                                    // {console.log(product)}

                                    (<tr

                                        key={product._id}
                                        className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                                    >
                                        <td className="p-4">
                                            <img
                                                // src=""
                                                // alt=""
                                                src={product.imageCover} 
                                                className="w-16 md:w-32 max-w-full max-h-full"
                                                alt={product.title}
                                            />
                                            <div className="font-semibold text-gray-900 dark:text-white">
                                                {product.title}
                                                title
                                            </div>
                                        </td>

                                        <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                                            {product.price} EGP
                                            
                                        </td>
                                        <td className="px-6 py-4">
                                            <button
                                                onClick={() => removeFromWishlist(product.id)}
                                                
                                                className="font-medium text-red-600 dark:text-red-500 hover:underline"
                                            >
                                                Remove
                                            </button>
                                        </td>
                                    </tr>))}
                                </tbody>


                            </table>
                        </div>
                    )}
                </div>
            </section>
        </>
    );
}


