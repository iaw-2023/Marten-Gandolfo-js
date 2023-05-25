import React, { useEffect, useState } from 'react';
import { useRef } from 'react';
import ProductsTable from './ProductsTable';
import ProductsFilters from './ProductsFilters';
import LoadingSpinner from '../../LoadingSpinner';
import ErrorMessage from '../../ErrorMessage';

export default function ProductsPage(){
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState(-1);
    const [isLoadingProducts, setIsLoadingProducts] = useState(true);
    const [isLoadingCategories, setIsLoadingCategories] = useState(true);
    const [errorMessage, setErrorMessage] = useState('');
    const inputRef = useRef(null);

    const fetchProducts = (url) => {
        fetch(url)
          .then(response => {
            if(!response.ok) throw new Error('Error al cargar los productos');
            return response.json();
          })
          .then((data) => {
            setProducts(data);
            setIsLoadingProducts(false);
          })
          .catch(error => {
            setIsLoadingProducts(false);
            setErrorMessage(error.message);
        });
    }

    useEffect(() => {
        fetch('https://marten-gandolfo-laravel.vercel.app/_api/categories')
          .then(response => {
            if(!response.ok) throw new Error('Error al cargar las categorías');
            return response.json();
          })
          .then((data) => {
            setIsLoadingCategories(false);
            return setCategories(data);
          })
          .catch(error => {
            setIsLoadingCategories(false);
            setErrorMessage(error.message);
        });
        fetchProducts('https://marten-gandolfo-laravel.vercel.app/_api/products');
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
            fetchProducts(url);
        }
    };

    useEffect(() => {
        let url = 'https://marten-gandolfo-laravel.vercel.app/_api/products';
        if(searchTerm != '')
            url += '/search/' + searchTerm;
        if(selectedCategory != -1)
            url += '/category/' + selectedCategory;

        fetchProducts(url);
      }, [searchTerm, selectedCategory]);

    if (isLoadingCategories) {
        return <LoadingSpinner />;
    }

    if(errorMessage){
        return <ErrorMessage message={errorMessage} />;
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