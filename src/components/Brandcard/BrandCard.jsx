import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Brands from '../Brands/Brands';
import BrandDetails from '../Branddetails/Branddetails';








export default function BrandCard({ brand }) {
    const navigate = useNavigate();
    const getBrandDetails = () => {
        navigate(`/brands/${brand._id}`);
    };





    return (
        <div onClick={getBrandDetails} className="category-card cursor-pointer p-4 bg-white rounded-lg shadow-lg carddd">
            <img src={brand.image} alt={brand.name} className="w-full h-48 object-contain rounded-t-lg" />
            <h2>{brand.name}</h2>
        </div>
    );
}





