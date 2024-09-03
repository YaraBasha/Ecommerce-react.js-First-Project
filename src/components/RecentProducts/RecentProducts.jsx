import { useEffect, useState } from 'react'
import axios from 'axios';
import Loader from '../Loader/Loader';
import Product from '../Product/Product';
import { useSearch } from '../../context/SearchContext';





export default function RecentProducts() {

    const [products, setProducts] = useState([]);
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);



    const { globalSearchTerm } = useSearch();
    const [filteredProducts, setFilteredProducts] = useState([]);

    const [isFiltered, setIsFiltered] = useState(false);


    async function getRecentProducts() {
        setIsLoading(true);
        try {
            const {data} = await axios.get(`https://ecommerce.routemisr.com/api/v1/products`);
        console.log(data.data);
        setProducts(data.data);
            setFilteredProducts(data.data);
        setError(null);
        } catch (error) {
            console.log(error);
            setError(error.response.message);
            setProducts([]);
        }finally{
            setIsLoading(false);
        }
    }

useEffect(() => {
    getRecentProducts();
}, []);



    //search


    useEffect(() => {
        if (globalSearchTerm && globalSearchTerm.trim() !== '') {
            const filtered = products.filter(product =>
                product.title.toLowerCase().includes(globalSearchTerm.toLowerCase())
            );
            setFilteredProducts(filtered);
            setIsFiltered(filtered.length > 0);  // Set isFiltered to true only if there are filtered products
        } else {
            setFilteredProducts(products);
            setIsFiltered(false);  // Reset to false when the search term is empty
        }
    }, [globalSearchTerm, products, setIsFiltered]);

    return (
        <>
            
            <section className="py-20">
                <div className="container mx-auto">
                    <h1 className="font-bold underline">Recent Products::</h1>
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


//RecentProducts: