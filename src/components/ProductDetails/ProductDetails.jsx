import { useContext, useEffect, useState } from 'react'
import axios from 'axios';
import Loader from '../Loader/Loader';
import { useParams } from 'react-router-dom';
import RelatedProducts from '../RelatedProducts/RelatedProducts';
import Slider from "react-slick";
import { CartContext } from '../../context/CartContext';
import { toast } from 'react-toastify';
import { WishlistContext } from '../../context/WishlistContext';


export default function ProductDetails() {


    const [productDetails, setProductDetails] = useState({});
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

const {id} = useParams();
// console.log(id);

const {addToCart} = useContext(CartContext);
    const { addToWishlist } = useContext(WishlistContext);
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1
    };

    async function getProductDetails(id) {
        setIsLoading(true);
        try {
            const { data } = await axios.get(`https://ecommerce.routemisr.com/api/v1/products/${id}`);
            // console.log(data.data);
            setProductDetails(data.data);
            setError(null);
        } catch (error) {
            // console.log(error);
            setError(error.response.message);
            setProductDetails([]);
        } finally {
            setIsLoading(false);
        }
    }

    useEffect(() => {
        getProductDetails(id);
    }, [id]);


async function addProductToCart(productId){
const res = await addToCart(productId);
// console.log(res);
if (res.status === "success") {
    // alert("product is added successfully");
    toast.success(res.message, {
        position: "bottom-right",
        theme: "dark",
    });
    
} else{
    toast.error("Something went wrong", {
        position: "bottom-right",
        theme: "dark",
});
    }
}



    async function addProductToWishList(productId) {
        const res = await addToWishlist(productId);
        if (res.status === "success") {
            // alert("product is added successfully");
            toast.success(res.message, {
                position: "bottom-right",
                theme: "dark",
            });

        } else {
            toast.error("Something went wrong", {
                position: "bottom-right",
                theme: "dark",
            });
        }
}

    return (
        <>
            {/* <h1 className="bg-yellow-300">Details</h1> */}

            <section className="py-20">
                <div className="container mx-auto">

{isLoading? <Loader/>
:
error? 
                            <div className="alert alert-error">{error}</div>
                            :


                    <div className="row items-center">
                        <div className="w-1/3 px-4">
                                    <Slider {...settings}>
                                        {
                                            productDetails?.images?.map((src, index)=>(
                                                <img key={index}
                                                src={src} 
                                                alt={productDetails.title} 
                                                /> 
                                            ))}
                                    </Slider>
                                    
                        </div>
                        <div className="w-2/3 px-4">
                            <h1 className="text-2xl mb-2">{productDetails.title}</h1>
                                    <p className="mb-2 font-light text-gray-500">{productDetails.description}</p>
                            <div className="flex justify-between font-light text-gray-500 mb-2">
                                <div>
                                            <p>{productDetails?.category?.name} </p>
                                            <span>{productDetails.price} EGP</span>
                                    </div>
                                <div>
                                    <i className="fas fa-star text-yellow-300"></i>
                                            <span>{productDetails.ratingsAverage}</span>
                                </div>
                            </div>
                                    <button className="btn btn-green mb-2"><i onClick={() => addProductToWishList(productDetails.id)} className="fas fa-heart text-white"></i></button>
                                    <button onClick={() => addProductToCart
                                        
                                    } className="btn btn-green w-full"> Add To Cart
                            </button>
                        </div>
                    </div>
}
                </div>

            </section>

            <RelatedProducts/>
        </>
    )
}