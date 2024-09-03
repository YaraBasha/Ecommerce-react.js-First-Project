import React, { createContext, useState, useContext } from 'react';

export const SearchContext = createContext();

export function SearchProvider({ children }) {
    const [globalSearchTerm, setGlobalSearchTerm] = useState('');
    const [isFiltered, setIsFiltered] = useState(false);

    return (
        <SearchContext.Provider value={{ globalSearchTerm, setGlobalSearchTerm, isFiltered, setIsFiltered }}>
            {children}
        </SearchContext.Provider>
    );
}

export function useSearch() {
    return useContext(SearchContext);
}
