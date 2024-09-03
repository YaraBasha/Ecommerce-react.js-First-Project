import { useEffect, useState } from 'react'
import Loader from '../Loader/Loader';
import axios from 'axios';
import BrandCard from "../Brandcard/BrandCard";


export default function Brands() {
    const [brands, setBrands] = useState([]);
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    async function getBrands() {
        setIsLoading(true);
        try {
            const { data } = await axios.get('https://ecommerce.routemisr.com/api/v1/brands');
            setBrands(data.data);
            console.log(data)
            setError(null);
        } catch (error) {
            console.log(error);
            setError(error.response?.message || 'Something went wrong');
            setBrands([]);
        } finally {
            setIsLoading(false);
        }
    }

    useEffect(() => {
        getBrands();
    }, []);

    return (
        <section className="py-20">
            <div className="container mx-auto">
                <h1 className="font-bold underline">Brands:</h1>
                {isLoading ? (
                    <Loader />
                ) : error ? (
                    <div className="alert alert-error">{error}</div>
                ) : (
                    <div className="row">
                        {brands.map((brand) => (
                            <BrandCard key={brand._id} brand={brand} />
                        ))}
                    </div>
                )}
            </div>
        </section>
    );
}
