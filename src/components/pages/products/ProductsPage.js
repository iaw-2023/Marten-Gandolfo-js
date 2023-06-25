import React, { useEffect, useState, useRef } from 'react';
import ProductsFilters from './ProductsFilters';
import LoadingProducts from '../../LoadingProducts';
import ErrorMessage from '../../ErrorMessage';
import 'bootstrap/dist/css/bootstrap.css';
import '../../../App.css';
import ProductCard from '../home/ProductCard';

export default function ProductsPage(){
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState(-1);
    const [selectedOrder, setSelectedOrder] = useState(-1);
    const [isLoadingProducts, setIsLoadingProducts] = useState(true);
    const [isLoadingCategories, setIsLoadingCategories] = useState(true);
    const [errorMessage, setErrorMessage] = useState('');
    const searchRef = useRef(null);

    const fetchProducts = (url) => {
        fetch(url)
          .then(response => {
            if(!response.ok){setErrorMessage('Error al cargar los productos'); return ;}
            return response.json();
          })
          .then((data) => {
            setProducts(data);
            setIsLoadingProducts(false);
          })
          .catch(error => {
            setIsLoadingProducts(false);
            setErrorMessage('Error al cargar los productos');
        });
    }

    useEffect(() => {
        fetch(process.env.REACT_APP_API_URL + '_api/categories')
          .then(response => {
            if(!response.ok){setErrorMessage('Error al cargar las categorías'); return ;}
            return response.json();
          })
          .then((data) => {
            setIsLoadingCategories(false);
            return setCategories(data);
          })
          .catch(error => {
            setIsLoadingCategories(false);
            setErrorMessage('Error al cargar las categorías');
        });
        fetchProducts(process.env.REACT_APP_API_URL + '_api/products');
      }, []);

    const handleSearch = () => {
        setIsLoadingProducts(true);
        setSearchTerm(searchRef.current.value.toLowerCase());
    };

    const handleCategoryUpdate = (event) => {
        setIsLoadingProducts(true);
        setSelectedCategory(event.target.value);
    };

    const handleOrderUpdate = (event) => {
        setIsLoadingProducts(true);
        setSelectedOrder(event.target.value);
    };

    const handlePageChange = (pageChange) => {
        let url;
        const prefix = process.env.REACT_APP_API_URL.substring(0, process.env.REACT_APP_API_URL.indexOf(':')) + ':';
        if(pageChange == 1)
            url = prefix + products.next_page_url.substring(products.next_page_url.indexOf(':') + 1);
        else
            url = prefix + products.prev_page_url.substring(products.prev_page_url.indexOf(':') + 1);
        if(url != null){
            setIsLoadingProducts(true);
            fetchProducts(url);
        }
    };

    useEffect(() => {
        let url = process.env.REACT_APP_API_URL + '_api/products';
        if(searchTerm != '')
            url += '/search/' + searchTerm;
        if(selectedCategory != -1)
            url += '/category/' + selectedCategory;
        if(selectedOrder != -1)
            url += '/order/' + selectedOrder;

        fetchProducts(url);
      }, [searchTerm, selectedCategory, selectedOrder]);

    if(errorMessage){
        return <ErrorMessage message={errorMessage} />;
    }

    return (
        <>
            <div class="mt-3">
                <ProductsFilters categories={categories} handleCategoryUpdate={handleCategoryUpdate} handleOrderUpdate={handleOrderUpdate} handleSearch={handleSearch} searchRef={searchRef}/>
            </div>

            {isLoadingProducts ? (
                <LoadingProducts />
             ) : (                
                products.data.length == 0 ? (
                    <>
                        <h3 class="text-center">Acá no vendemos de esos</h3>
                        <p class="text-center">Pero podes buscar otras cosas que tenemos un montón!</p>
                    </>
                ) : (
                    <>
                        <div class="card-container mt-3 text-center">
                            {products.data.map((product) => (
                                <ProductCard product={product}></ProductCard>
                            ))}
                        </div>

                        <nav aria-label="Page navigation example">
                            <ul class="pagination justify-content-center">
                                <li class="page-item">
                                    <button class="page-link" onClick={() => handlePageChange(-1)} aria-label="Previous">
                                        <span aria-hidden="true">&laquo;</span>
                                    </button>
                                </li>
                                <li class="page-item">
                                    <div class="page-link disabled">Página actual <span>{products.current_page}</span></div>
                                </li>
                                <li class="page-item">
                                    <button class="page-link" onClick={() => handlePageChange(1)} aria-label="Next">
                                        <span aria-hidden="true">&raquo;</span>
                                    </button>
                                </li>
                            </ul>
                        </nav>
                    </>
                )
            )}

        </>
    );
}