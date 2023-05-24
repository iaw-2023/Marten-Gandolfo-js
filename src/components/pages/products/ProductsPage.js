import React, { useEffect, useState } from 'react';
import { useRef } from 'react';
import ProductsTable from './ProductsTable';
import ProductsFilters from './ProductsFilters';
import LoadingSpinner from '../../LoadingSpinner';

export default function ProductsPage(){
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState(-1);
    const [isLoadingProducts, setIsLoadingProducts] = useState(true);
    const [isLoadingCategories, setIsLoadingCategories] = useState(true);
    const inputRef = useRef(null);

    useEffect(() => {
        fetch('https://marten-gandolfo-laravel.vercel.app/_api/categories')
          .then(response => response.json())
          .then((data) => {
            setCategories(data);
            setIsLoadingCategories(false);
          })
          .catch(error => console.log(error));
        fetch('https://marten-gandolfo-laravel.vercel.app/_api/products')
          .then(response => response.json())
          .then((data) => {
            setProducts(data);
            setIsLoadingProducts(false);
          })
          .catch(error => console.log(error));
      }, []);

    const handleSearch = () => {
        setIsLoadingProducts(true);
        setSearchTerm(inputRef.current.value.toLowerCase());
    };

    const handleCategoryUpdate = (event) => {
        setIsLoadingProducts(true);
        setSelectedCategory(event.target.value);
    };

    const handlePageChange = (pageChange) => {
        let url;
        if(pageChange == 1)
            url = products.next_page_url;
        else
            url = products.prev_page_url;
        console.log(url);
        if(url != null){
            setIsLoadingProducts(true);
            fetch(url)
                .then(response => response.json())
                .then((data) => {
                    setProducts(data);
                    setIsLoadingProducts(false);
                })
                .catch(error => console.log(error));
        }
    };

    useEffect(() => {
        let url = 'https://marten-gandolfo-laravel.vercel.app/_api/products';
        if(searchTerm != '')
            url += '/search/' + searchTerm;
        if(selectedCategory != -1)
            url += '/category/' + selectedCategory;

        fetch(url)
          .then(response => response.json())
          .then((data) => {
            setProducts(data);
            setIsLoadingProducts(false);
          })
          .catch(error => console.log(error));
      }, [searchTerm, selectedCategory]);

    if (isLoadingCategories) {
        return <LoadingSpinner />;
    }

    return (
        <>
            <h1>Productos</h1>
            <ProductsFilters categories={categories} handleCategoryUpdate={handleCategoryUpdate} handleSearch={handleSearch} inputRef={inputRef}/>

            {isLoadingProducts ? (
                <LoadingSpinner />
             ) : (
                products.data.length == 0 ? (
                    <div>No se encontraron productos</div>
                ) : (
                    <ProductsTable products={products} handlePageChange={handlePageChange} />
                )
            )}
            
        </>
    );
}