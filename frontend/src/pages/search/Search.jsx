import React, { useState } from 'react'


import ProductCards from '../shop/ProductCards';
import { useFetchAllProductsQuery } from '../../redux/features/products/productsApi';

const Search = () => {
    const [searchQuery, setSearchQuery] = useState('');
    
    const { data: { products = [], totalPages, totalProducts } = {}, error, isLoading } = useFetchAllProductsQuery({
        
    })
    const [filteredProducts, setFilteredProducts] = useState(products);

    const handleSearch = () => {
        const query = searchQuery.toLowerCase();

        const filtered = productsData.filter(product => product.name.toLowerCase().includes(query) || product.description.toLowerCase().includes(query));

        setFilteredProducts(filtered);
    }
    return (
        <>
            

            <section className='section__container'>
                <div className='w-full mb-12 flex flex-col md:flex-row items-center justify-center gap-4'>
                    <input type="text" 
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className='search-bar w-full max-w-4xl p-2 border rounded'
                    placeholder='Search for products...' />

                    <button 
                    onClick={handleSearch}
                    className='search-button w-full md:w-auto py-2 px-8 bg-primary text-white rounded'>Search</button>
                </div>

                <ProductCards products={filteredProducts}/>
            </section>
        </>
    )
}

export default Search