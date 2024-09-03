import { useEffect, useState } from 'react'

import Loader from '../Loader/Loader';
import axios from 'axios';


import CategoryCard from '../CategoryCard/CategoryCard'

export default function Cetgories() {

    const [categories, setCategories] = useState([]);
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    async function getCategories() {
        setIsLoading(true);
        try {
            const { data } = await axios.get('https://ecommerce.routemisr.com/api/v1/categories');
            setCategories(data.data);
            console.log(data)
            setError(null);
        } catch (error) {
            console.log(error);
            setError(error.response?.message || 'Something went wrong');
            setCategories([]);
        } finally {
            setIsLoading(false);
        }
    }

    useEffect(() => {
        getCategories();
    }, []);

    return (
        <>
            <section className="py-20">
                <div className="container mx-auto">
                    <h1 className="font-bold underline">Categories:</h1>
                    {isLoading ? (
                        <Loader />
                    ) : error ? (
                        <div className="alert alert-error">{error}</div>
                    ) : (
                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                                    {categories.map((categories) => (
                                <CategoryCard key={categories._id} categories={categories} />
                            ))}
                        </div>
                    )}
                </div>
            </section>
        </>
    )
}