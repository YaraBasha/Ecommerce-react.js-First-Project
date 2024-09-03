import { useContext, useEffect, useState } from 'react'
import classes from "./Home.module.css";
import MainSlider from '../MainSlider/MainSlider';
import CategorySlider from '../CategorySlider/CategorySlider';
import RecentProducts from '../RecentProducts/RecentProducts';
import { SearchContext, useSearch } from '../../context/SearchContext';
// import Loader from '../Loader/Loader';






export default function Home() {


    // const [isFiltered, setIsFiltered] = useState(false);
    // const { globalSearchTerm } = useSearch();
    const { isFiltered } = useContext(SearchContext);

    return (
        <>
            
            <div>
                {!isFiltered && <MainSlider />}
                {!isFiltered && <CategorySlider />}
                <RecentProducts
                    // products={RecentProducts}
                    // setIsFiltered={setIsFiltered}
                    // globalSearchTerm={globalSearchTerm}
                />
            </div>
        </>
    );
}