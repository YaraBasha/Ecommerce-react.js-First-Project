import { useEffect, useState } from 'react'
import axios from 'axios';
import Loader from '../Loader/Loader';
import Product from '../Product/Product';
import { useSearch } from '../../context/SearchContext';


export default function Products() {

    const [products, setProducts] = useState([]);
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const { globalSearchTerm } = useSearch();
    const [filteredProducts, setFilteredProducts] = useState([]);

    async function getAllProducts() {
        setIsLoading(true);
        try {
            const { data } = await axios.get(`https://ecommerce.routemisr.com/api/v1/products`);
            console.log(data.data);
            setProducts(data.data);
            setFilteredProducts(data.data);
            setError(null);
        } catch (error) {
            console.log(error);
            setError(error.response.message);
            setProducts([]);
        } finally {
            setIsLoading(false);
        }
    }

    useEffect(() => {
        getAllProducts();
    }, []);

//search
    useEffect(() => {
        if (globalSearchTerm) {
            const filtered = products.filter(product =>
                product.title.toLowerCase().includes(globalSearchTerm.toLowerCase())
            );
            setFilteredProducts(filtered);
        } else {
            setFilteredProducts(products);
        }
    }, [globalSearchTerm, products]);

    return (
        <>
            
        
        
        
            <section className="py-20">
                <div className="container mx-auto">
                    <h1 className="font-bold underline">All Products:</h1>
                    {isLoading ? (
                        <Loader />
                    ) : error ? (
                        <div className="alert alert-error">{error}</div>
                    ) : (
                        <div className="row">
                            {filteredProducts.length > 0 ? (
                                filteredProducts.map((product) => (
                                    <Product key={product.id} product={product} />
                                ))
                            ) : (
                                <p>No products found</p>
                            )}
                        </div>
                    )}
                </div>
            </section>
        
        
        </>
    )
}