import React, { useEffect, useState } from 'react';
import { useRef } from 'react';
import { Link } from 'react-router-dom';

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

            <div>
                <input
                    type="text"
                    placeholder="Buscar producto..."
                    ref={inputRef}
                    style={{ marginBottom: '1rem' }}
                />
                <button onClick={handleSearch}>Buscar</button>
            </div>

            {isLoadingProducts ? (
                <div>Cargando...</div>
             ) : (
                products.data.length == 0 ? (
                    <div>No se encontraron productos</div>
                ) : (
                    <>
                        <table className="table table-striped table-bordered shadow-lg">
                            <tbody>
                            {products.data.map((product) => (
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
                        <div>
                            <label>Pagina:</label>
                            <button onClick={() => handlePageChange(-1)}>{'<'}</button>
                            <span>{products.current_page}</span>
                            <button onClick={() => handlePageChange(1)}>{'>'}</button>
                        </div>
                    </>
                )
            )}
            
        </div>
    );
}