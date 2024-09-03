import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Loader from '../Loader/Loader';







export default function BrandDetails() {
    const { id } = useParams(); // Get the brand ID from the URL parameters
    console.log("Brand ID from URL:", id);



    const [brandDetails, setBrandDetails] = useState({});
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    async function getBrandDetails() {
        setIsLoading(true);
        try {
            const { data } = await axios.get(`https://ecommerce.routemisr.com/api/v1/brands/${id}`);
            console.log("API call successful:", data);
            setBrandDetails(data.data);
            // console.log(data.data);
            
            setError(null);
        } catch (error) {
            setError(error.response?.message || 'Something went wrong');
        } finally {
            setIsLoading(false);
        }
    }

    useEffect(() => {
        if (id){getBrandDetails();}
        console.log("useEffect is triggered with id:", id);
        
    }, [id]);



    return (
        <>
            <h1 className="bg-sky-400">BrandDetails</h1>
        <div className="container mx-auto py-20">
            {isLoading ? (
                <Loader />
            ) : error ? (
                <div className="alert alert-error">{error}</div>
            ) : (
                <div className="brand-details">
                    <img src={brandDetails.image} alt={brandDetails.name} className="brand-image" />
                    <h1 className="font-bold text-3xl">{brandDetails.name}</h1>
                    <p>{brandDetails.description}</p>
                </div>
            )}
        </div>
        </>
    );
}
