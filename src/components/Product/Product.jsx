import { useContext} from 'react'
import { Link } from 'react-router-dom';
import { CartContext } from '../../context/CartContext';
import { toast } from 'react-toastify';
import { WishlistContext } from '../../context/WishlistContext';


export default function Product({product}) {

    const { addToCart } = useContext(CartContext);
    const { addToWishlist } = useContext(WishlistContext);

    async function addProductToCart(productId) {
        const res = await addToCart(productId);
        console.log(res);
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
        

            <div className="w-1/6 px-4 mb-4 product">
                <button className="btn btn-green mt-2"><i onClick={() => addProductToWishList(product.id)} className="fas fa-heart text-green-500"></i></button>
                <Link to={`/product-details/${product.id}/${product.category.name}`}>
            <img className="mb-2" src={product.imageCover} alt={product.title} />
                <span className="mb-2 text-green-500">{product.category.name}</span>
                <h2 className="text-lg font-semibold truncate mb-2">{product.title}</h2>
                <div className="flex justify-between font-light text-gray-500">
                    <span>{product.price} EGP</span>
                    <div>
                        <i className="fas fa-star text-yellow-300"></i>
                        <span>{product.ratingsAverage}</span>
                    </div>
                </div>
            </Link>
                
                <button onClick={() => addProductToCart(product.id)} className="btn btn-green w-full">Add To Cart</button>
            </div>
        </>
    )
}

// /${product.category.name}