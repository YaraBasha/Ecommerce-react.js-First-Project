import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Loader from '../Loader/Loader';
// import RelatedProducts from '../RelatedProducts/RelatedProducts';

export default function CategoriesDetails() {
    const { id } = useParams(); // Capture the category ID from the URL
    const [categoryDetails, setCategoryDetails] = useState(null);
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        async function getCategoryDetails() {
            setIsLoading(true);
            try {
                const { data } = await axios.get(`https://ecommerce.routemisr.com/api/v1/categories/${id}`);
                setCategoryDetails(data.data);
                setError(null);
            } catch (error) {
                setError(error.response?.message || 'Something went wrong');
                setCategoryDetails(null);
            } finally {
                setIsLoading(false);
            }
        }

        if (id) {
            getCategoryDetails();
        }
    }, [id]);

    if (isLoading) return <Loader />;
    if (error) return <div className="alert alert-error">{error}</div>;
    if (!categoryDetails) return <div>No category details available.</div>;

    return (
        <>

            <section className="container h-screen mt-14 pt-16">
                <div className="max-w-xl mx-auto">
            <h1 className="text-3xl font-bold underline mb-8">Cetgory Details:</h1>
        
            <div className="container mx-auto py-20 h-screen">
            <h1 className="font-bold text-xl">{categoryDetails.name}</h1>
                <img src={categoryDetails.image} alt={categoryDetails.name} className="h-[200px]" />
            {/* Add more details here if available in the API response */}
        </div>
                </div></section>
        {/* <RelatedProducts/> */}
        </>
    );
}

