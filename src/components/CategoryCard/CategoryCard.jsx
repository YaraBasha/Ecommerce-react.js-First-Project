import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
// import CategoriesDetails from '../CategoriesDetails/CategoriesDetails';









export default function CategoryCard({ categories }) {
    const navigate = useNavigate();
    const getCategoriesDetails = () => {
        navigate(`/categories/${categories._id}`);
    };





    return (
        <div onClick={getCategoriesDetails} className="category-card cursor-pointer p-5 carddd bg-white rounded-lg shadow-lg">
            <img src={categories.image} alt={categories.name} className="w-full h-full object-scale-down" />
            <div className="p-4">
                <h2 className="text-xl font-semibold">{categories.name}</h2>
            </div>
        </div>
    );
}