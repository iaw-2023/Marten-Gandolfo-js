import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

export default function ProductsPage(){
    const [products, setProducts] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [searchResults, setSearchResults] = useState([]);

    useEffect(() => {
        fetch('https://marten-gandolfo-laravel.vercel.app/_api/products')
          .then(response => response.json())
          .then((data) => {
            setProducts(data);
            setSearchResults(data);
          })
          .catch(error => console.log(error));
      }, []);

    const handleSearch = (event) => {
        const term = event.target.value.toLowerCase();
        setSearchTerm(term);

        const results = products.filter((product) =>
            product.name.toLowerCase().includes(term)
        );
        setSearchResults(results);
    };

    if (products.length === 0) {
        return <div>Cargando...</div>;
    }

    return (
        <div>
            <h1>Productos</h1>

            <input
                type="text"
                placeholder="Buscar producto..."
                value={searchTerm}
                onChange={handleSearch}
                style={{ marginBottom: '1rem' }}
            />

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
        </div>
    );
}