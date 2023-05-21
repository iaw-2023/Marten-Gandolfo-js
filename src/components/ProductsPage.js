import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

export default function ProductsPage(){
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [isLoadingProducts, setIsLoadingProducts] = useState(true);
    const [isLoadingCategories, setIsLoadingCategories] = useState(true);

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

    const searchProducts = () => {
        const results = products.filter(
            (product) => product.name.toLowerCase().includes(searchTerm)
        );
        setSearchResults(results);
    }

    const handleSearch = (event) => {
        const term = event.target.value.toLowerCase();
        setSearchTerm(term);
    };

    const handleCategoryUpdate = (event) => {
        setIsLoadingProducts(true);
        const category = event.target.value;
        let url;
        if(category == -1)
            url = 'https://marten-gandolfo-laravel.vercel.app/_api/products';
        else
            url = 'https://marten-gandolfo-laravel.vercel.app/_api/products/category/' + category;

        fetch(url)
          .then(response => response.json())
          .then((data) => {
            setProducts(data);
            setIsLoadingProducts(false);
          })
          .catch(error => console.log(error));
    };

    useEffect(() => {
        searchProducts();
      }, [searchTerm, products]);

    if (isLoadingCategories) {
        return <div>Cargando...</div>;
    }

    return (
        <div>
            <h1>Productos</h1>
            <div>
                Categoria:
                <select id="category_id" name="category_id" type="number" onChange={handleCategoryUpdate}>
                    <option value="-1" selected>Todas</option>
                    {categories.map((category) => (<option value={category.id}>{category.name}</option>))}
                </select>
            </div>

            <input
                type="text"
                placeholder="Buscar producto..."
                value={searchTerm}
                onChange={handleSearch}
                style={{ marginBottom: '1rem' }}
            />
            
            {isLoadingProducts ? (
                <div>Cargando...</div>
             ) : (
                <>

                    <table className="table table-striped table-bordered shadow-lg">
                        <tbody>
                        {searchResults.map((product) => (
                            <tr key={product.id}>
                            <td>
                                <Link to={'/products/' + product.id}>
                                <img src={product.product_image} alt="" width="150" />
                                </Link>
                            </td>
                            <td>
                                <Link to={'/products/' + product.id}>{product.name}</Link>
                            </td>
                            <td>${product.price}</td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </>
            )}
            
        </div>
    );
}